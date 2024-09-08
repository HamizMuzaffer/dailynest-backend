import express from "express";
import staticRoute from "./routes/static.route.js";
const app = express();

app.use("/", staticRoute);

export default app;
