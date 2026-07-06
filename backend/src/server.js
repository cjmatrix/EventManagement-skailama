import express from "express";
import connectDatabase from "./config/db.js";

const app = express();



async function startServer() {
  try {
    await connectDatabase;
    console.log("DB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is Listening");
    });
  } catch (err) {
    console.log(err.message);
  }
}



startServer();
