import { Pool } from 'pg';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    if (id) {
      // Получить товар по id
      const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
      return res.status(200).json(rows[0]);
    }
    // Получить все товары
    const { rows } = await pool.query('SELECT * FROM products ORDER BY id DESC');
    return res.status(200).json(rows);
  }

  if (req.method === 'POST') {
    // Добавить товар (пример: { name, description, price, image_url })
    const { name, description, price, image_url } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO products (name, description, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, image_url]
    );
    return res.status(201).json(rows[0]);
  }

  // Аналогично добавить PATCH и DELETE для админки

  res.status(405).end(`Метод ${req.method} не разрешён`);
}
