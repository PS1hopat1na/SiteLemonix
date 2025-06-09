// components/Layout.js
import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default function Layout({ children, title, cartCount = 0, username, isAdmin }) {
  return (
    <>
      <Head>
        <title>{title || 'Lemonix'}</title>
        <link rel="stylesheet" href="/style.css" />
        <link rel="icon" type="image/png" href="/logo.png" />
        <script src="/script.js" defer></script>
      </Head>

      <header className="lemonix-header-new">
        <div className="header-container">
          <div className="logo-title">
            <Link href="/">
              <a>
                <img src="/logo.png" className="logo-img" alt="Lemonix" />
              </a>
            </Link>
            <img src="/title.png" className="title-img" alt="Lemonix" />
          </div>
          <nav className="main-nav">
            <Link href="/shop"><a>Магазин</a></Link>
            <Link href="/about"><a>О нас</a></Link>
            <Link href="/policy"><a>Политика</a></Link>
            {isAdmin && <Link href="/admin"><a>Админ</a></Link>}
          </nav>
          <div className="nav-user">
            <Link href="/cart">
              <a className="cart-link" title="Корзина" id="cart-link">
                <span className="cart-icon">
                  <svg height="23" width="23" viewBox="0 0 20 20" fill="none">
                    <circle cx="8" cy="17" r="1.5" fill="#c5222a" />
                    <circle cx="16" cy="17" r="1.5" fill="#c5222a" />
                    <path d="M3 5h1l2 10h9l2-8H5" stroke="#34b233" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                  <span className="cart-count" style={{ display: cartCount ? 'inline' : 'none' }}>{cartCount || 0}</span>
                </span>
              </a>
            </Link>

            {username ? (
              <>
                <img src="/logo.png" className="user-avatar-mini" alt="U" />
                <span className="user-name">{username}</span>
                <Link href="/logout"><a className="logout-btn">Выйти</a></Link>
              </>
            ) : (
              <Link href="/login"><a className="login-btn">Вход</a></Link>
            )}
          </div>
        </div>
        <div className="lemonix-marquee-wrap">
          <span className="lemonix-marquee">
            🍋 Лёгкий шопинг Lemonix — Новинки каждую неделю! Бесплатная доставка! Промокод WELCOME10 — скидка 10%!
          </span>
        </div>
      </header>

      <main>{children}</main>

      <div id="notification-popup" className="notification"></div>
      <div id="notification-modal" className="notification-modal">
        <div className="notification-modal-content">
          <span id="notification-modal-text"></span>
          <button className="notification-modal-close" onClick={() => {
            const modal = document.getElementById('notification-modal');
            if (modal) modal.style.display = 'none';
          }}>&times;</button>
        </div>
      </div>
      <div id="cart-checkout-popup" className="cart-checkout-popup">
        <div className="cart-checkout-popup-content">
          <button className="cart-checkout-popup-close" onClick={() => {
            const popup = document.getElementById('cart-checkout-popup');
            if (popup) popup.style.display = 'none';
          }}>&times;</button>
          <h2 style={{ marginBottom: '16px' }}>Ваш чек</h2>
          <ul className="cart-checkout-popup-list" id="cart-popup-list"></ul>
          <div className="cart-checkout-popup-total" id="cart-popup-total"></div>
          <div className="cart-checkout-popup-info" id="cart-popup-info"></div>
        </div>
      </div>
    </>
  )
}
