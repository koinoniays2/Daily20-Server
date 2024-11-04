import mongoose from "mongoose";
// 스키마 정의
const memoSchema = new mongoose.Schema({
    writer: String,
    language: String,
    mean: String,
    pronunciation: String,
    reference: String,
    createdAt: Date
})

const Memo = mongoose.model("Memo", memoSchema);

export default Memo;