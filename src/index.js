import connectDb from "./db/db.js";
import { app } from "../app.js";
import dotenv from "dotenv";
dotenv.config();

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`mongodb connection error ${error}`);
  });
