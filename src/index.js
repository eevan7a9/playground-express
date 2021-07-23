import express from "express";
import mongoose from "mongoose";
import usersRoutes from "./routes/users.js";

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Accessing Root...");
  res.send("Hello, this is Root.");
});

mongoose
  .connect("mongodb://localhost:27017/playground-db", {
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
