import { student } from "../schemas/student.js";
import { model } from "mongoose";

const Student = model("Students", student)

export { Student }