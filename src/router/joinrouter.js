import express from "express";
import { idCheck, join } from "../controllers/joinController";

const joinRouter = express.Router();

joinRouter.post("", join);
joinRouter.post("/idCheck", idCheck);

export default joinRouter;