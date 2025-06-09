import React from 'react';

export default function About() {
  return (
    <div className="about-wrap" style={{ padding: '20px' }}>
      <h1>О магазине Lemonix</h1>
      <div className="about-section">
        <p>
          <b>Lemonix</b> — сеть современных магазинов электроники, где вы найдёте лучшие новинки по выгодным ценам.
          Мы работаем для вас с 2020 года и уже заслужили доверие тысяч покупателей.
        </p>
        <div className="about-gallery" style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          <div className="about-photo" style={{ flex: 1 }}>
            <img src="/outside_lemonix.png" alt="Фасад магазина Lemonix" style={{ width: '100%' }} />
            <div className="about-photo-caption" style={{ textAlign: 'center', marginTop: '8px' }}>Фасад нашего магазина</div>
          </div>
          <div className="about-photo" style={{ flex: 1 }}>
            <img src="/inside_lemonix.png" alt="Внутри магазина Lemonix" style={{ width: '100%' }} />
            <div className="about-photo-caption" style={{ textAlign: 'center', marginTop: '8px' }}>Внутри Lemonix: всегда рады видеть вас!</div>
          </div>
        </div>
      </div>

      <hr style={{ margin: '40px 0' }} />

      <div className="about-contacts">
        <h2>Контакты и поддержка</h2>
        <p>
          <b>Адрес:</b> Россия, г. Иркутск, ул. Александра Невского, д. 6, ТЦ "Lemonix", 1 этаж<br />
          <b>Телефон магазина:</b> <a href="tel:+79501298861">+7 (950) 129-88-61</a><br />
          <b>Техподдержка:</b>
        </p>
        <ul>
          <li>+7 (950) 129-88-61 — по вопросам заказов</li>
          <li>+7 (950) 129-88-61 — по гарантии и возврату</li>
          <li>Email: <a href="mailto:support@lemonix.ru">support@lemonix.ru</a></li>
        </ul>
        <p><b>Режим работы:</b> ежедневно, 10:00—21:00</p>
      </div>

      <div className="about-map-block" style={{ marginTop: '40px' }}>
        <h3>Как нас найти</h3>
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A01dfc5203b0acb5ef9823c71d6b0e3d8d20c82ab7dce55a9b41b1a076659992f&source=constructor"
          width="883"
          height="668"
          frameBorder="0"
          style={{ width: '100%', maxWidth: '883px', height: '668px' }}
          title="Карта Lemonix"
          allowFullScreen
        ></iframe>
      </div>

      <hr style={{ margin: '40px 0' }} />

      <div className="about-awards">
        <h2>Наши достижения</h2>
        <ul>
          <li>Премия "Лучший магазин электроники 2025" по версии Retail Awards</li>
          <li>4,9 из 5 по отзывам покупателей</li>
          <li>Собственная сеть пунктов выдачи по всей России</li>
        </ul>
      </div>

      <div className="about-extra" style={{ marginTop: '40px' }}>
        <h2>Почему выбирают Lemonix?</h2>
        <ul>
          <li>Только оригинальные товары от надёжных поставщиков</li>
          <li>Гарантия и сервисное обслуживание</li>
          <li>Быстрая доставка, удобный самовывоз</li>
          <li>Еженедельные акции и выгодные предложения</li>
        </ul>
      </div>
    </div>
  );
}
