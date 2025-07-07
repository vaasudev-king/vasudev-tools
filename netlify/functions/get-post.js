// netlify/functions/get-post.js
import { neon } from '@netlify/neon'

const sql = neon()

export async function handler(event) {
  const postId = event.queryStringParameters.postId
  const [post] = await sql`SELECT * FROM posts WHERE id = ${postId}`

  return {
    statusCode: 200,
    body: JSON.stringify(post || {})
  }
}
