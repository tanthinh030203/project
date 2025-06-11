const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },  // Bắt buộc dùng ssl với Heroku PostgreSQL
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Thời gian hiện tại trên DB là: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi kết nối database');
  }
});

app.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});
