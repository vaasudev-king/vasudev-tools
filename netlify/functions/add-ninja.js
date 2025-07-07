const mysql = require("mysql2/promise");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { name, nickname, gender } = JSON.parse(event.body);
    const conn = await mysql.createConnection(dbConfig);

    await conn.execute(
      "INSERT INTO ninjas (name, nickname, gender) VALUES (?, ?, ?)",
      [name, nickname, gender]
    );
    await conn.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Ninja added successfully!" }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
