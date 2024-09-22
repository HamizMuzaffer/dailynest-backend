import express from "express";
import staticRoute from "./routes/static.route.js";
import cors from "cors"
const app = express();

// middlewares configuration 
app.use(express.json())
app.use(cors())

// Routes 
app.get("/",(req,res)=>{
    res.send("Hello From Server")
})
app.use("/api/v1/", staticRoute);

export default app;



