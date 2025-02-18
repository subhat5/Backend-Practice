import express from "express";
import cors from "cors";
import multer from "multer";
const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  Credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(multer().any());
export { app };

//importing route
import userRouter from "./src/routes/user.routes.js";

app.use("/api/v1/users", userRouter);
