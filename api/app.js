import express from "express";
import staticRoute from "./routes/static.route.js";
import './config/passport.config.js' 
import passport from "passport"
import authRoute from "./routes/auth.route.js"

const app = express();

// middlewares configuration 
app.use(passport.initialize());
app.use(express.json())


// Routes 

app.use("/api/v1", staticRoute);
app.use("/api/v1/auth",authRoute)
export default app;



