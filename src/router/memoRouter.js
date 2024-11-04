import express from "express";
import { memoList, memoWrite } from "../controllers/memoController";

const memoRouter = express.Router();

memoRouter.post("/write", memoWrite);
memoRouter.get("/list", memoList);

export default memoRouter;