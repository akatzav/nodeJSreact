import { model } from "mongoose";
import { cardsSchema } from "../schemas/cardBusiness.js";
const Card = model("Cards", cardsSchema);
export { Card };
