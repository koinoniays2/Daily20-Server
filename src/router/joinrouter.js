import express from "express";
import { idCheck, join, login } from "../controllers/joinController";

const joinRouter = express.Router();

joinRouter.post("", join);
joinRouter.post("/idCheck", idCheck);
joinRouter.post("/login", login);

export default joinRouter;