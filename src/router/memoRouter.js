import express from "express";
import { memoWrite } from "../controllers/memoController";

const memoRouter = express.Router();

memoRouter.post("/write", memoWrite);

export default memoRouter;