import { Router } from "express"

const router = Router();

router.get("/all", (req, res) => {
    res.json([{ title: "All Books" }])
})


router.get("/fantasy", (req, res) => {
    res.json([{ title: "Harry Potter" }])
})

export { router as booksRouter }