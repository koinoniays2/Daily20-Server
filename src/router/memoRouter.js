import express from "express";
import { memoDelete, memoList, memoUpdate, memoWrite } from "../controllers/memoController";
import { verifyToken } from "../middlewears/verifyToken";

const memoRouter = express.Router();

memoRouter.post("/write", verifyToken, memoWrite);
memoRouter.get("/list", verifyToken, memoList);
memoRouter.post("/delete", verifyToken, memoDelete);
memoRouter.put("/update", verifyToken, memoUpdate);

export default memoRouter;