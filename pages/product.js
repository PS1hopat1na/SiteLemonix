import { supabase } from "../../lib/supabaseClient";
import { useState } from "react";

export default function ProductPage({ product, recommendations, reviews, avg_rating }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  // Добавить товар в корзину
  const handleAddToCart = async () => {
    const userPhone = localStorage.getItem("user_phone");
    if (!userPhone) {
      alert("Сначала войдите в аккаунт!");
      return;
    }

    const { error } = await supabase.from("carts").insert([
      {
        user_phone: userPhone,
        product_id: product.id,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      alert("Ошибка при добавлении в корзину");
    } else {
      alert("Товар добавлен в корзину!");
    }
  };

  // Отправка отзыва
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;

    const userPhone = localStorage.getItem("user_phone") || "79950000000";
    await supabase.from("reviews").insert([
      {
        product_id: product.id,
        text,
        rating,
        user_phone: userPhone,
      },
    ]);
    alert("Ваш отзыв отправлен!");
    setText("");
    setRating(5);
    location.reload();
  };

  return (
    <div className="product-page-wrap">
      <div className="product-main">
        <div className="product-photo-gallery">
          <img className="main-photo" src={product.image_url} alt={product.name} />
        </div>
        <div className="product-info-dns">
          <h1>{product.name}</h1>
          <div className="product-price-block">
            <span className="product-price">{product.price} ₽</span>
            <button className="btn-dns-buy add-to-cart-btn" type="button" onClick={handleAddToCart}>
              В корзину
            </button>
          </div>
          <div className="product-props">{product.description}</div>
          <div className="product-rating-block">
            <b>Средний рейтинг:</b>{" "}
            {avg_rating > 0 ? <span className="product-rating">{avg_rating} ★</span> : <span>Нет оценок</span>}
          </div>
        </div>
      </div>

      <div className="recommend-block">
        <h3>Рекомендуем посмотреть</h3>
        <div className="recommend-list">
          {recommendations.map((rec) => (
            <a href={`/product/${rec.id}`} className="recommend-item" key={rec.id}>
              <img src={rec.image_url} alt={rec.name} />
              <div className="rec-name">{rec.name}</div>
              <div className="rec-price">{rec.price} ₽</div>
            </a>
          ))}
        </div>
      </div>

      <hr />

      <div className="reviews-section">
        <h3>Отзывы покупателей</h3>
        <form className="review-form-inline" onSubmit={handleReviewSubmit}>
          <label htmlFor="rating">Ваша оценка:</label>
          <select
            name="rating"
            id="rating"
            required
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value="5">★★★★★</option>
            <option value="4">★★★★☆</option>
            <option value="3">★★★☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="1">★☆☆☆☆</option>
          </select>
          <textarea
            name="text"
            className="review-textarea"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="review-btn-compact" type="submit">
            Отзыв
          </button>
        </form>

        <ul className="reviews-list">
          {reviews.map((review, i) => (
            <li className="review-card" key={i}>
              <div className="review-user-avatar">
                <img
                  src="/logo.png"
                  alt="user"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="review-user-content">
                <div className="review-user-header">
                  <span className="review-username">{review.user_phone || "Пользователь"}</span>
                  <span className="review-rating-stars">{"★".repeat(review.rating)}</span>
                </div>
                <div className="review-text">{review.text}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Загрузка данных с сервера Supabase
export async function getServerSideProps(context) {
  const id = Number(context.params.id);

  if (isNaN(id)) {
    return { notFound: true };
  }

  const { data: product, error } = await supabase.from("products").select("*").eq("id", id).single();

  if (!product) {
    return { notFound: true };
  }

  const { data: recommendations } = await supabase.from("products").select("*").neq("id", id).limit(3);

  const { data: reviews } = await supabase.from("reviews").select("*").eq("product_id", id).order("created_at", { ascending: false });

  const avg_rating =
    reviews && reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0;

  return {
    props: {
      product,
      recommendations: recommendations || [],
      reviews: reviews || [],
      avg_rating,
    },
  };
}
