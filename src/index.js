import express from "express";
import mongoose from "mongoose";
import usersRoutes from "./routes/users.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT;

app.use(express.json());

app.get("/", (_, res) => {
  console.log("Accessing Root...");
  res.send("Hello, this is Root.");
});

mongoose
  .connect(process.env.DB_CONNECT, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Success: Connection is set.");
    app.use("/users", usersRoutes);
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Error: Connection failed.");
  });
