import 'dotenv/config';
import express from "express";
import connectDatabase from "./config/db.js";

import profileRoutes from "./routes/profileRoutes.js"
import eventRoutes from "./routes/eventRoutes.js"
import cors from "cors"
import globalErrorHanlder from './middleware/globalErrorHanlder.js';

import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
}));
app.use(express.json())



app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);


const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});


app.use(globalLimiter);

app.use((req, _res, next) => {
  Object.defineProperty(req, "query", {
    value: { ...req.query },
    writable: true,
    configurable: true,
    enumerable: true,
  });
  next();
});

app.use(mongoSanitize());

app.use(hpp());

app.get("/test",(req,res)=>{

  res.json({message:"API IS RUNNING"})
  
})

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



