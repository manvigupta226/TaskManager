const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT,
  JWT_SECRET, JWT_EXP
} = process.env;

let pool;

const getPool = async () => {
  if (pool) return pool;
  pool = await mysql.createPool({
    host: DB_HOST, user: DB_USER, password: DB_PASS, database: DB_NAME, port: DB_PORT || 3306,
    waitForConnections: true, connectionLimit: 5
  });
  return pool;
};

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { email, password } = body;
    const pool = await getPool();
    const [rows] = await pool.query('SELECT id, name, email, password FROM users WHERE email = ?', [email]);
    if (!rows.length) return { statusCode: 401, body: JSON.stringify({ msg: 'Invalid credentials' }) };

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return { statusCode: 401, body: JSON.stringify({ msg: 'Invalid credentials' }) };

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXP || '7d' });
    return {
      statusCode: 200,
      body: JSON.stringify({ token, user: { id: user.id, name: user.name, email: user.email } }),
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ msg: 'Server error' }) };
  }
};
