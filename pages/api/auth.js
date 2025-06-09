import { Pool } from 'pg';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Логин или регистрация
    const { phone, username } = req.body;
    const userCheck = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
    let user = userCheck.rows[0];
    if (!user) {
      // Регистрация
      const { rows } = await pool.query(
        'INSERT INTO users (phone, username) VALUES ($1, $2) RETURNING *',
        [phone, username]
      );
      user = rows[0];
    }
    // Можно добавить обновление username если надо
    return res.status(200).json(user);
  }

  res.status(405).end(`Метод ${req.method} не разрешён`);
}
