import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.controller.js";
const router = Router()

router.get("/",(req,res)=>{
    res.json({message : "Hello From Server"})
})

// User Routes 
router.post("/sign-up",createUser)
router.get("/login",loginUser)


// google auth route 


export default router;