import dotenv from "dotenv"
import app from './app.js';
import connectDB from "./db/connect.js";

dotenv.config()


const port = process.env.PORT || 8030;

// Database connection
connectDB();


app.listen(port, () => {
  console.log(`Server is running at: ${port}`);
});