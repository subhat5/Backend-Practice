import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";
import { app } from "../../app.js";
const connectDb = async () => {
  try {
    const connectMongo = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    app.on("error", (error) => {
      console.log("ERROR:", error);
      throw error;
    });
    console.log(`MongoDb connected || host: ${connectMongo.connection.host}`);
  } catch (error) {
    console.log("connection falied:", error);
    process.exit(1);
  }
};
export default connectDb;
