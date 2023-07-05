import { Router } from "express"

const router = Router();

router.get('/',(req,res)=>{
    res.json({message:"We are in login"})
})


export {router as loginRouter}