var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import { Student } from "../db/models/student.js";
const router = Router();
// request handlers:
//GET all students:
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO: handle errors:
    try {
        const students = yield Student.find();
        res.json(students);
    }
    catch (e) {
        res.status(500).json({ message: "Error", error: e });
    }
}));
router.get("/abc", (req, res) => {
    Student.find()
        .then((students) => res.json(students))
        .catch((e) => res.status(500).json({ message: "Error", error: e }));
});
//POST a student:
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newStudent = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    });
    try {
        const result = yield newStudent.save();
        res.json({ message: "Student Saved", id: result.id });
    }
    catch (e) {
        res.status(500).json({ message: "Error", error: e });
    }
}));
export { router as studentsRouter };
