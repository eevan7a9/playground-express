import express from "express";
// import bodyPareser from 'body-parser';

const app = express();
const PORT = 5000;

app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
 