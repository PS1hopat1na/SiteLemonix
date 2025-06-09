import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || !username) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    // Проверяем, есть ли пользователь с таким номером
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("phone", phone)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      alert("Ошибка при проверке пользователя");
      return;
    }

    if (!existingUser) {
      // Если нет — создаём нового пользователя
      const { error: insertError } = await supabase
        .from("users")
        .insert([{ phone, username }]);

      if (insertError) {
        alert("Ошибка при регистрации пользователя");
        return;
      }
    }

    // Сохраняем в localStorage для сессии
    localStorage.setItem("user_phone", phone);
    localStorage.setItem("user_name", username);

    alert(`Вы вошли как ${username}`);
    window.location.href = "/"; // Перенаправление на главную
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Вход / Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Телефон:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="+7xxxxxxxxxx"
            style={{ width: "100%", marginBottom: 12, padding: 8 }}
          />
        </label>
        <label>
          Имя пользователя:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Ваше имя"
            style={{ width: "100%", marginBottom: 12, padding: 8 }}
          />
        </label>
        <button type="submit" style={{ padding: "10px 20px", fontWeight: "bold" }}>
          Войти
        </button>
      </form>
    </div>
  );
}
