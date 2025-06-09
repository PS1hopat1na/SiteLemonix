// pages/cart.js

import { supabase } from "../lib/supabaseClient";
import { useState, useEffect } from "react";

export default function Cart({ cartItems = [], cartTotal = 0 }) {
  const [items, setItems] = useState(cartItems);
  const [total, setTotal] = useState(cartTotal);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalTotal, setModalTotal] = useState(0);

  // --- Автоматически синкаем user_phone из localStorage в cookie ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      const phone = localStorage.getItem("user_phone");
      if (phone && !document.cookie.includes(`user_phone=${phone}`)) {
        document.cookie = `user_phone=${phone}; path=/;`;
      }
    }
  }, []);

  // Обновляем total при изменении items
  useEffect(() => {
    setTotal(items.reduce((sum, i) => sum + (i.products?.price || 0), 0));
  }, [items]);

  // Удаление товара из корзины
  const handleRemove = async (cartId) => {
    const userPhone = localStorage.getItem("user_phone");
    if (!userPhone) {
      alert("Сначала войдите в аккаунт!");
      return;
    }
    const { error } = await supabase
      .from("carts")
      .delete()
      .eq("id", cartId)
      .eq("user_phone", userPhone);

    if (error) {
      alert("Ошибка при удалении товара");
      return;
    }
    const newItems = items.filter((item) => item.id !== cartId);
    setItems(newItems);
  };

  // Оформление заказа
  const handleCheckout = async () => {
    if (items.length === 0) {
      alert("Ваша корзина пуста!");
      return;
    }
    const userPhone = localStorage.getItem("user_phone");
    if (!userPhone) {
      alert("Сначала войдите в аккаунт!");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("carts").delete().eq("user_phone", userPhone);
    setLoading(false);

    if (error) {
      alert("Ошибка при оформлении заказа");
      return;
    }
    setModalTotal(total); // Сохраняем итоговую сумму для модалки
    setItems([]);
    setTotal(0);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="cart-page-wrap" style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px" }}>
      <h2 style={{ marginBottom: 20, color: "#1a73e8" }}>Ваша корзина</h2>
      {items.length > 0 ? (
        <>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 12px" }}>
            <thead>
              <tr style={{ backgroundColor: "#eaf4ff", textAlign: "left" }}>
                <th style={{ padding: "10px 15px", borderRadius: "10px 0 0 10px", color: "#0b66c2" }}>Товар</th>
                <th style={{ padding: "10px 15px", color: "#0b66c2" }}>Цена</th>
                <th style={{ padding: "10px 15px", color: "#0b66c2" }}>Количество</th>
                <th style={{ padding: "10px 15px", color: "#0b66c2" }}>Сумма</th>
                <th style={{ padding: "10px 15px", borderRadius: "0 10px 10px 0" }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ backgroundColor: "#f7fbff", borderRadius: 12 }}>
                  <td style={{ padding: "15px", display: "flex", alignItems: "center", gap: 15 }}>
                    <img
                      src={item.products?.image_url || "/default.png"}
                      alt={item.products?.name}
                      style={{ width: 70, height: 70, borderRadius: 12, objectFit: "cover" }}
                    />
                    <span style={{ fontWeight: "600", fontSize: 16 }}>{item.products?.name}</span>
                  </td>
                  <td style={{ padding: "15px", color: "#2a9d8f", fontWeight: "bold" }}>
                    {item.products?.price} ₽
                  </td>
                  <td style={{ padding: "15px", textAlign: "center" }}>1</td>
                  <td style={{ padding: "15px", color: "#2a9d8f", fontWeight: "bold" }}>
                    {item.products?.price} ₽
                  </td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    <button
                      onClick={() => handleRemove(item.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#e63946",
                        fontSize: 22,
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                      title="Удалить товар"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              marginTop: 30,
              fontSize: 18,
              fontWeight: "bold",
              color: "#264653",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Общая сумма:</span>
            <span>{total} ₽</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={loading}
            style={{
              marginTop: 20,
              width: "100%",
              backgroundColor: "#2a9d8f",
              color: "#fff",
              padding: "15px 0",
              border: "none",
              borderRadius: 12,
              fontSize: 18,
              cursor: "pointer",
              fontWeight: "600",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1b7a73")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2a9d8f")}
          >
            {loading ? "Оформление..." : "Оформить заказ"}
          </button>
        </>
      ) : (
        <div style={{ fontSize: 18, color: "#999", marginTop: 40, textAlign: "center" }}>
          Корзина пуста
        </div>
      )}

      {showModal && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              padding: 30,
              borderRadius: 12,
              maxWidth: 400,
              width: "90%",
              textAlign: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
            }}
          >
            <h3 style={{ marginBottom: 20 }}>Спасибо за заказ!</h3>
            <p style={{ fontSize: 16 }}>
              Общая сумма: <strong>{modalTotal} ₽</strong>
            </p>
            <button
              onClick={closeModal}
              style={{
                marginTop: 20,
                padding: "12px 25px",
                backgroundColor: "#2a9d8f",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Серверная часть, получение данных корзины и подсчет суммы ---
export async function getServerSideProps(context) {
  const userPhone = context.req.cookies.user_phone || null;

  if (!userPhone) {
    return {
      props: {
        cartItems: [],
        cartTotal: 0,
      },
    };
  }

  const { data: cartItemsData, error } = await supabase
    .from("carts")
    .select(`
      id,
      product_id,
      created_at,
      products (
        id,
        name,
        price,
        image_url,
        description
      )
    `)
    .eq("user_phone", userPhone);

  if (error) {
    console.error("Ошибка загрузки корзины:", error);
    return {
      props: {
        cartItems: [],
        cartTotal: 0,
      },
    };
  }

  const cartItems = cartItemsData || [];
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.products?.price || 0), 0);

  return {
    props: {
      cartItems,
      cartTotal,
    },
  };
}
