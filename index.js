import express from "express";

import usersRoutes from './routes/users.js';

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
    console.log('Hello, accessing Root');
    res.send('Hello, this is Root');
});

app.use('/users', usersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
 