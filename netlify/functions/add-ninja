import { neon } from '@netlify/neon'
const sql = neon()

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    }
  }

  const { name, nickname, gender } = JSON.parse(event.body)

  try {
    const [inserted] = await sql`
      INSERT INTO ninjas (name, nickname, gender)
      VALUES (${name}, ${nickname}, ${gender})
      RETURNING *;
    `

    return {
      statusCode: 200,
      body: JSON.stringify(inserted)
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }
  }
}
