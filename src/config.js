require("dotenv").config()
module.exports.port = parseInt(process.env.PORT ?? "3000");
module.exports.baseUrl = process.env.BASE_URL ?? `http://localhost:${module.exports.port}`
