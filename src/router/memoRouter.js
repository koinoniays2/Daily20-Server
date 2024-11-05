import express from "express";
import { memoDelete, memoList, memoWrite } from "../controllers/memoController";
import { verifyToken } from "../middlewears/verifyToken";

const memoRouter = express.Router();

memoRouter.post("/write", verifyToken, memoWrite);
memoRouter.get("/list", verifyToken, memoList);
memoRouter.post("/delete", verifyToken, memoDelete);


export default memoRouter;