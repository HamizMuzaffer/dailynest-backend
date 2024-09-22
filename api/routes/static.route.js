import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.controller.js";
const router = Router()


// User Routes 
router.post("/sign-up",createUser)
router.post("/login",loginUser)




export default router;