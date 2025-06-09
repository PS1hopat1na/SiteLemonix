// components/Header.js

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Header() {
  const [username, setUsername] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setUsername(localStorage.getItem("user_name"));

    // Проверяем вход
    const userPhone = localStorage.getItem("user_phone");
    if (userPhone) {
      // Получаем cart count (как раньше)
      const updateCartCount = async () => {
        const { count } = await supabase
          .from("carts")
          .select("id", { count: "exact", head: true })
          .eq("user_phone", userPhone);
        setCartCount(count || 0);
      };

      updateCartCount();

      // Подписка на realtime cart
      const channel = supabase
        .channel("cart_changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "carts",
            filter: `user_phone=eq.${userPhone}`,
          },
          updateCartCount
        )
        .subscribe();

      // Проверяем is_admin для этого пользователя
      supabase
        .from("users")
        .select("is_admin")
        .eq("phone", userPhone)
        .single()
        .then(({ data }) => {
          setIsAdmin(data?.is_admin === true);
        });

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_phone");
    localStorage.removeItem("user_name");
    setUsername(null);
    setIsAdmin(false);
    window.location.reload();
  };

  return (
    <header className="lemonix-header-new">
      <div className="header-container">
        <div className="logo-title">
          <Link href="/">
            <img src="/logo.png" className="logo-img" alt="Lemonix" />
          </Link>
          <img src="/title.png" className="title-img" alt="Lemonix" />
        </div>
        <nav className="main-nav">
          <Link href="/shop">Магазин</Link>
          <Link href="/about">О нас</Link>
          <Link href="/policy">Политика</Link>
          {isAdmin && (
            <Link href="/admin">
              <span style={{
                fontWeight: "bold",
                color: "#e63946",
                marginLeft: 10
              }}>Админ-панель</span>
            </Link>
          )}
        </nav>
        <div className="nav-user">
          <Link href="/cart">
            <span style={{ position: "relative", display: "inline-block" }}>
              <svg height="28" width="28" viewBox="0 0 20 20" fill="none">
                <circle cx="8" cy="17" r="1.5" fill="#c5222a" />
                <circle cx="16" cy="17" r="1.5" fill="#c5222a" />
                <path d="M3 5h1l2 10h9l2-8H5" stroke="#34b233" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -10,
                    left: 16,
                    background: "#d32f2f",
                    color: "#fff",
                    borderRadius: "50%",
                    minWidth: 15,
                    height: 15,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: 12,
                    border: "2px solid #fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                    zIndex: 2,
                  }}
                >
                  {cartCount}
                </span>
              )}
            </span>
          </Link>
          {username ? (
            <>
              <img src="/logo.png" className="user-avatar-mini" alt="U" />
              <span className="user-name">{username}</span>
              <button className="logout-btn" onClick={handleLogout}>Выйти</button>
            </>
          ) : (
            <Link href="/login" className="login-btn">Вход</Link>
          )}
        </div>
      </div>
      <div className="lemonix-marquee-wrap">
        <span className="lemonix-marquee">
          🍋 Лёгкий шопинг Lemonix — Новинки каждую неделю! Бесплатная доставка! Промокод WELCOME10 — скидка 10%!
        </span>
      </div>
    </header>
  );
}
