import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 5000;

const server = '127.0.0.1:27017'; 
const database = 'image_boarding';
mongoose
.connect(`mongodb://${server}/${database}`)
.then(() => {
  console.log('Database connection successful');
})
.catch((err) => {
  console.error('Database connection error');
});

app.use(cors());
app.use(express.json())

import threadRouter from "./routes/threads.js";
import userRouter from "./routes/users.js";
import BoardRouter from "./routes/imageboards.js"

app.use('/threads', threadRouter);
app.use('/users', userRouter);
app.use('/boards', BoardRouter);

app.listen(port, () => {
    console.log(`Server running on port : ${port}`)
});