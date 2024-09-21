import dotenv from "dotenv"
dotenv.config()


import app from './app.js';
import connectDB from "./db/connect.js";

const port = process.env.PORT || 80;


// Database connection
connectDB();


app.listen(port, () => {
  console.log(`Server is running at: ${port}`);
});