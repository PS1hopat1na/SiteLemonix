import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";

export default function Admin({ products: initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [editLoadingId, setEditLoadingId] = useState(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  // Добавление товара
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .insert([{
        name: form.name,
        description: form.description,
        price: Number(form.price),
        image_url: form.image_url,
      }])
      .select()
      .single();
    setLoading(false);

    if (error) {
      alert("Ошибка при добавлении товара: " + error.message);
    } else {
      alert("Товар добавлен");
      setProducts([...products, data]);
      setForm({ name: "", description: "", price: "", image_url: "" });
    }
  };

  // Редактирование товара
  const handleEditProduct = async (e, id) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedProduct = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      image_url: formData.get("image_url"),
    };
    setEditLoadingId(id);
    const { error } = await supabase
      .from("products")
      .update(updatedProduct)
      .eq("id", id);
    setEditLoadingId(null);
    if (error) {
      alert("Ошибка при сохранении товара: " + error.message);
    } else {
      alert("Товар обновлен");
      setProducts(products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)));
    }
  };

  // Удаление товара
  const handleDeleteProduct = async (e, id) => {
    e.preventDefault();
    if (!confirm("Удалить этот товар?")) return;
    setDeleteLoadingId(id);
    const { error } = await supabase.from("products").delete().eq("id", id);
    setDeleteLoadingId(null);
    if (error) {
      alert("Ошибка при удалении товара: " + error.message);
    } else {
      alert("Товар удален");
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <>
      <link rel="stylesheet" href="/style.css" />
      <div className="admin-panel-wrap" style={{ maxWidth: 800, margin: "40px auto" }}>
        <h1>Админ-панель</h1>
        <Link href="/shop" legacyBehavior>
          <a className="admin-shop-btn">В магазин</a>
        </Link>

        <h2>Добавить товар</h2>
        <form className="admin-add-form" onSubmit={handleAddProduct}>
          <input
            type="text"
            placeholder="Название"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Описание"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Цена"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Ссылка на картинку (img)"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Добавление..." : "Добавить"}
          </button>
        </form>

        <h2>Список товаров</h2>
        <ul className="admin-products-list" style={{ listStyle: "none", padding: 0 }}>
          {products.map((product) => (
            <li key={product.id} className="admin-product-item" style={{ marginBottom: 20 }}>
              <form
                className="admin-edit-form"
                onSubmit={(e) => handleEditProduct(e, product.id)}
                style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
              >
                <input
                  type="text"
                  name="name"
                  defaultValue={product.name}
                  className="admin-edit-input"
                  required
                  style={{ flex: "2 1 150px" }}
                />
                <input
                  type="text"
                  name="description"
                  defaultValue={product.description}
                  className="admin-edit-input"
                  style={{ flex: "3 1 250px" }}
                />
                <input
                  type="number"
                  name="price"
                  defaultValue={product.price}
                  className="admin-edit-input"
                  required
                  style={{ flex: "1 1 80px" }}
                />
                <input
                  type="text"
                  name="image_url"
                  defaultValue={product.image_url}
                  className="admin-edit-input"
                  style={{ flex: "3 1 200px" }}
                />
                <button type="submit" className="admin-product-edit" disabled={editLoadingId === product.id}>
                  {editLoadingId === product.id ? "Сохранение..." : "Сохранить"}
                </button>
                <button
                  type="button"
                  className="admin-product-delete"
                  onClick={(e) => handleDeleteProduct(e, product.id)}
                  disabled={deleteLoadingId === product.id}
                  style={{ backgroundColor: "#e63946", color: "white" }}
                >
                  {deleteLoadingId === product.id ? "Удаление..." : "Удалить"}
                </button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// --- Защита админки и загрузка товаров ---
export async function getServerSideProps(context) {
  const userPhone = context.req.cookies.user_phone || null;

  // Нет входа — на логин
  if (!userPhone) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  // Проверяем в БД: пользователь и is_admin
  const { data: users, error } = await supabase
    .from('users')
    .select('is_admin')
    .eq('phone', userPhone)
    .limit(1);

  if (error || !users || users.length === 0 || !users[0].is_admin) {
    // Не админ — на главную/магазин
    return {
      redirect: {
        destination: '/shop',
        permanent: false,
      }
    }
  }

  // Если всё ок — возвращаем товары
  const { data: products } = await supabase.from('products').select('*').order('id');
  return {
    props: {
      products: products || [],
    },
  };
}
