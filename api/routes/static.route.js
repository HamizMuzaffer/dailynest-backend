import { Router } from "express";
const router = Router()

router.get("/api/v1",(req,res)=>{
    res.json({message : "Hello From Server"})
})



export default router