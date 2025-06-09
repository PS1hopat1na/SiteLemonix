import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

export default function Shop({ products }) {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        padding: "0 20px",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>Каталог товаров</h2>
      <div
        className="product-list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="product"
            style={{
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              padding: 15,
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              height: 340,
              justifyContent: "space-between",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <Link href={`/product/${product.id}`} legacyBehavior>
              <a
                className="product-link"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <img
                  src={product.image_url || "/default.png"}
                  alt={product.name}
                  style={{
                    width: "100%",
                    maxHeight: 180,
                    objectFit: "contain",
                    borderRadius: 8,
                    marginBottom: 12,
                    boxSizing: "border-box",
                  }}
                />
                {/* Ограничиваем высоту заголовка, переносим текст с ... */}
                <h3
                  style={{
                    fontSize: 16,
                    minHeight: 48,
                    margin: "0 0 8px 0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={product.name} // чтобы при наведении показывался полный текст
                >
                  {product.name}
                </h3>
                <p
                  className="product-price"
                  style={{
                    color: "#2a9d8f",
                    fontWeight: "bold",
                    margin: "0 0 12px 0",
                  }}
                >
                  {product.price} ₽
                </p>
                <button
                  className="btn-dns-buy"
                  style={{
                    marginTop: "auto",
                    backgroundColor: "#34b233",
                    color: "white",
                    border: "none",
                    padding: "10px 0",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: 14,
                    transition: "background-color 0.3s",
                    width: "100%",
                    boxSizing: "border-box",
                    userSelect: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#2a9128")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#34b233")
                  }
                  type="button" // чтобы не было submit внутри ссылки
                >
                  Подробнее
                </button>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });
  return { props: { products: products || [] } };
}
