import mongoose from "mongoose";

export const ConnectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "Next-Todo-App",
    })
    .then(() => console.log("Database is connected successfully"));
};
