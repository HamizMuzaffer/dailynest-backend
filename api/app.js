import express from "express";
import staticRoute from "./routes/static.route.js";
import './config/passport.config.js' 
import passport from "passport"
import cors from "cors"
const app = express();

// middlewares configuration 
app.use(passport.initialize());
app.use(express.json())
app.use(cors())

// Routes 

app.use("/api/v1/", staticRoute);
app.get("/",(req,res)=>{
    res.send("Hello From Server")
})
export default app;



