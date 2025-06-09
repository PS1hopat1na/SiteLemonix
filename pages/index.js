import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Видеобаннер с анимацией */}

      {/* Цифры и факты */}
      <section
        className="stats"
        style={{ background: "#f8f9fa", padding: "80px 0", marginBottom: 60 }}
      >
	
        <div
          className="container"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 30,
            textAlign: "center",
          }}
        >
          {[
            { number: "15+", label: "лет на рынке" },
            { number: "250K+", label: "довольных клиентов" },
            { number: "50+", label: "брендов-партнеров" },
            { number: "24/7", label: "поддержка клиентов" },
          ].map(({ number, label }, i) => (
            <div className="stat-item" key={i}>
              <div
                className="stat-number"
                style={{
                  fontSize: "3rem",
                  color: "#ff9500",
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                {number}
              </div>
              <div className="stat-label" style={{ fontSize: "1.1rem", color: "#555" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* О магазине с галереей */}
      <section
        id="about"
        className="about-section"
        style={{ padding: "80px 0", marginBottom: 60 }}
      >
        <div
          className="container"
          style={{ maxWidth: 1200, margin: "0 auto" }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              marginBottom: 50,
              color: "#333",
            }}
          >
            Технологичный рай для гиков
          </h2>

          <div style={{ display: "flex", gap: 40, marginBottom: 60 }}>
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontSize: "1.8rem",
                  color: "#444",
                  marginBottom: 20,
                }}
              >
                Наш флагманский магазин
              </h3>
              <p style={{ lineHeight: 1.6, marginBottom: 20, color: "#666" }}>
                Lemonix Tech City — это не просто магазин, а настоящий технологический парк
                площадью 2 000 квадратных метров в самом центре Москвы.
              </p>
              <p style={{ lineHeight: 1.6, marginBottom: 20, color: "#666" }}>
                Здесь вы можете не только купить технику, но и протестировать ее в специальных
                зонах, посетить мастер-классы от экспертов и даже поучаствовать в киберспортивных
                турнирах.
              </p>
            </div>

            <div
              style={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 15,
              }}
            >
              <img
                src="/store1.jpg"
                alt="Интерьер магазина"
                style={{ width: "100%", borderRadius: 10, objectFit: "cover", height: 200 }}
              />
              <img
                src="/store2.jpg"
                alt="Зона тестирования"
                style={{ width: "100%", borderRadius: 10, objectFit: "cover", height: 200 }}
              />
              <img
                src="/store3.jpg"
                alt="Мероприятие"
                style={{
                  width: "100%",
                  borderRadius: 10,
                  objectFit: "cover",
                  height: 300,
                  gridColumn: "span 2",
                }}
              />
            </div>
          </div>

          <div
            style={{
              background: "#fffaed",
              padding: 40,
              borderRadius: 15,
              borderLeft: "5px solid #ff9500",
            }}
          >
            <h3 style={{ marginTop: 0, color: "#333" }}>Уникальные возможности Lemonix:</h3>
            <ul
              style={{
                columns: 2,
                columnGap: 40,
                listStyleType: "none",
                padding: 0,
              }}
            >
              {[
                "✅ Тест-драйв техники перед покупкой",
                "✅ Бесплатные курсы по технологиям",
                "✅ Кофейня с роботом-бариста",
                "✅ Зона VR-развлечений",
                "✅ Гарантийный центр на территории",
              ].map((item, i) => (
                <li
                  key={i}
                  style={{ marginBottom: 15, position: "relative", paddingLeft: 25 }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Награды и пресса */}
      <section
        className="awards"
        style={{ background: "#333", color: "white", padding: "80px 0" }}
      >
        <div
          className="container"
          style={{ maxWidth: 1200, margin: "0 auto" }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              marginBottom: 50,
            }}
          >
            Признание и награды
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 30,
            }}
          >
            {[
              {
                img: "/award1.png",
                title: "Лучший ритейлер 2025",
                desc: "По версии Tech Retail Awards",
              },
              {
                img: "/award2.png",
                title: "Инновация года",
                desc: "За концепт магазина будущего",
              },
              {
                img: "/award4.png",
                title: "Экологичный бизнес",
                desc: "За программу утилизации",
              },
            ].map(({ img, title, desc }, i) => (
              <div
                key={i}
                className="award-card"
                style={{ textAlign: "center", flex: 1, minWidth: 200 }}
              >
                <img
                  src={img}
                  alt="Награда"
                  style={{ height: 280, marginBottom: 20 }}
                />
                <h3 style={{ color: "#ff9500" }}>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Мероприятия */}
      <section
        className="events"
        style={{ padding: "80px 0", background: "white" }}
      >
        <div
          className="container"
          style={{ maxWidth: 1200, margin: "0 auto" }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              marginBottom: 50,
              color: "#333",
            }}
          >
            Ближайшие события
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 30,
            }}
          >
            {[
              {
                img: " /event2.jpg",
                date: "22 июня 2025",
                title: "AI Tech Day",
                desc: "Встреча с разработчиками искусственного интеллекта и демонстрация новых возможностей",
                height: 390,
              },
              {
                img: "/event1.jpg",
                date: "15 июля 2025",
                title: "День игровых технологий",
                desc: "Турниры по киберспорту, презентация новых игровых девайсов и специальные предложения",
                height: 450,
              },
              {
                img: "/event3.jpg",
                date: "5 августа 2025",
                title: "Гаджет-фестиваль",
                desc: "Более 100 новинок техники, которые вы сможете протестировать первыми",
                height: 550,
              },
            ].map(({ img, date, title, desc, height }, i) => (
              <div
                key={i}
                className="event-card"
                style={{
                  background: "#f8f9fa",
                  borderRadius: 15,
                  overflow: "hidden",
                }}
              >
                <img
                  src={img}
                  alt="Мероприятие"
                  style={{ width: "100%", height, objectFit: "cover" }}
                />
                <div style={{ padding: 20 }}>
                  <div
                    style={{
                      color: "#ff9500",
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                  >
                    {date}
                  </div>
                  <h3 style={{ marginTop: 0, marginBottom: 15 }}>{title}</h3>
                  <p style={{ color: "#666", marginBottom: 20 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA блок */}
      <section
        className="cta"
        style={{
          background: "linear-gradient(135deg, #ff9500 0%, #ff6b00 100%)",
          color: "white",
          padding: "80px 0",
          textAlign: "center",
        }}
      >
        <div
          className="container"
          style={{ maxWidth: 800, margin: "0 auto" }}
        >
          <h2 style={{ fontSize: "2.5rem", marginBottom: 20 }}>
            Готовы к технологичному шопингу?
          </h2>
          <p style={{ fontSize: "1.2rem", marginBottom: 30 }}>
            Посетите наш флагманский магазин или совершите покупки онлайн с быстрой
            доставкой
          </p>
          <div
            style={{
              display: "flex",
              gap: 20,
              justifyContent: "center",
            }}
          >
            <Link href="/shop" legacyBehavior>
              <a
                style={{
                  background: "white",
                  color: "#ff9500",
                  borderRadius: 10,
                  padding: "18px 38px",
                  fontWeight: "bold",
                  textDecoration: "none",
                  fontSize: "1.15rem",
                  marginRight: 16,
                  transition: "0.2s",
                  border: "none",
                  display: "inline-block",
                }}
              >
                В каталог
              </a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "white",
                  border: "2px solid white",
                  borderRadius: 10,
                  padding: "18px 38px",
                  fontWeight: "bold",
                  textDecoration: "none",
                  fontSize: "1.15rem",
                  display: "inline-block",
                  transition: "0.2s",
                }}
              >
                Контакты
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
