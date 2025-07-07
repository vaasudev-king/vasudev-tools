const { Pool } = require('pg');

const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
});

exports.handler = async () => {
  try {
    const result = await db.query('SELECT * FROM ninjas ORDER BY id DESC');
    return {
      statusCode: 200,
      body: JSON.stringify(result.rows)
    };
  } catch (error) {
    console.error('DB Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch ninjas' })
    };
  }
};
