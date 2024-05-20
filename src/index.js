import dotenv from "dotenv";
import { DbConnect } from "./db/dbConnect.js";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});

DbConnect()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`server is running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDb Connection error !!", error.message);
  });
