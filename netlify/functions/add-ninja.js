const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  const { name, nickname, gender } = JSON.parse(event.body);
  const filePath = path.join(__dirname, "../../ninjas.json");
  const data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];

  data.push({ name, nickname, gender });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Ninja added!" }),
  };
};
