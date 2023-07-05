import { Router } from "express";
import { Card } from "../db/models/cardBusiness.js";

const router = Router();

router.post('/', (req, res) => {
    const card = new Card({
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        phone: req.body.phone,
        image: req.body.image,
        bizNumber: req.body.bizNumber,
    })

    card
        .save()
        .then((saved) => {
            res.json({message:"Successfully saved your card"});
        })
        .catch((e) => console.log(e));
})

//get all cards from db:

router.get('/',(req,res)=>{
    Card.find()
    .then((result)=>{
        res.json(result);
    })
    .catch((e)=>res.status(500).json({message:`Error:${e}` }))
})

export { router as cardsRouter}