
import mongoose, { mongo } from "mongoose";

// connect mongoDB
export const connectDB = () => {
    mongoose
      .connect(process.env.MONGODB_URL, {
        dbName: "todo_app",
      })
      .then(() => console.log("Database Connected"))
      .catch((e) => console.log(e));
  };
  