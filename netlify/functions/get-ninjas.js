const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  const filePath = path.join(__dirname, "../../ninjas.json");
  const data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
