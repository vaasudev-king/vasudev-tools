const { Pool } = require('pg');

const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    const { name, nickname, gender } = JSON.parse(event.body);

    if (!name || !nickname || !gender) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing fields' })
      };
    }

    const query = 'INSERT INTO ninjas (name, nickname, gender) VALUES ($1, $2, $3)';
    await db.query(query, [name, nickname, gender]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Ninja added successfully!' })
    };
  } catch (error) {
    console.error('DB Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Database error' })
    };
  }
};
