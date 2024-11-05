import express from "express";
import { memoList, memoWrite } from "../controllers/memoController";
import { verifyToken } from "../middlewears/verifyToken";

const memoRouter = express.Router();

memoRouter.post("/write", verifyToken, memoWrite);
memoRouter.get("/list", verifyToken, memoList);

export default memoRouter;