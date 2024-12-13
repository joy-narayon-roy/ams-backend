require("dotenv").config();
const app = require("./app/app");
const connectDB = require("./db/db");

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 8080;
const DB_NAME = process.env.DB_NAME || "test";

connectDB(DB_URL, { dbName: DB_NAME })
  .then(() => {
    console.log("DB Connected!");
    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
        console.log("Server Failed");
      } else {
        console.log(`Server start. http://localhost:${PORT} `);
      }
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("DB Connection failed!");
  });
