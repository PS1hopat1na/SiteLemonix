import { Pool } from 'pg';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Получить все отзывы по товару
    const { product_id } = req.query;
    const { rows } = await pool.query(
      'SELECT * FROM reviews WHERE product_id = $1 ORDER BY created_at DESC', [product_id]
    );
    return res.status(200).json(rows);
  }

  if (req.method === 'POST') {
    // Добавить отзыв
    const { product_id, phone, rating, text } = req.body;
    await pool.query(
      'INSERT INTO reviews (product_id, user_phone, rating, text) VALUES ($1, $2, $3, $4)',
      [product_id, phone, rating, text]
    );
    return res.status(200).json({ success: true });
  }

  res.status(405).end(`Метод ${req.method} не разрешён`);
}
