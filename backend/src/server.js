import 'dotenv/config';
import express from "express";
import connectDatabase from "./config/db.js";

import profileRoutes from "./routes/profileRoutes.js"
import eventRoutes from "./routes/eventRoutes.js"
import cors from "cors"
import globalErrorHanlder from './middleware/globalErrorHanlder.js';

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
}));
app.use(express.json())

app.use("/api/v1/profiles",profileRoutes)
app.use("/api/v1/events",eventRoutes)

app.use(globalErrorHanlder);


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



