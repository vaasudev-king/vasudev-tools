const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "ninjas.json");

exports.handler = async function () {
  try {
    const data = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
      : [];

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to read ninja list." }),
    };
  }
};
