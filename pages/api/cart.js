import { Pool } from 'pg';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  const { phone } = req.query;

  if (req.method === 'GET') {
    // Корзина пользователя
    const { rows } = await pool.query(
      'SELECT c.id as cart_id, p.* FROM carts c JOIN products p ON c.product_id=p.id WHERE c.user_phone=$1', [phone]
    );
    return res.status(200).json(rows);
  }

  if (req.method === 'POST') {
    // Добавить в корзину
    const { product_id } = req.body;
    await pool.query('INSERT INTO carts (user_phone, product_id) VALUES ($1, $2)', [phone, product_id]);
    return res.status(200).json({ success: true });
  }

  if (req.method === 'DELETE') {
    // Удалить из корзины
    const { cart_id } = req.body;
    await pool.query('DELETE FROM carts WHERE id = $1 AND user_phone = $2', [cart_id, phone]);
    return res.status(200).json({ success: true });
  }

  res.status(405).end(`Метод ${req.method} не разрешён`);
}
