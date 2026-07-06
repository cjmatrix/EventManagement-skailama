import 'dotenv/config';
import express from "express";
import connectDatabase from "./config/db.js";

import profileRoutes from "./routes/profileRoutes.js"
import cors from "cors"

const app = express();

app.use(cors())

app.use(express.json())

app.use("/api/v1/profiles",profileRoutes)



async function startServer() {
  try {
    await connectDatabase();
    console.log("DB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is Listening");
    });
  } catch (err) {
    console.log(err.message);
  }
}


startServer();



