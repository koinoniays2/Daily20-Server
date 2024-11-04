import Memo from "../model/memo";
import jwt from "jsonwebtoken";

export const memoWrite = async (req, res) => {
    const { language, mean, pronunciation, reference} = req.body;
     // 요청 헤더에서 토큰 추출
    const token = req.headers.authorization?.split(" ")[1];
        
    if (!token) {
        return res.status(401).json({ result: false, message: "로그인이 필요합니다. 먼저 로그인해 주세요." });
    };

    // 토큰 검증 및 사용자 정보 추출
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;  // 토큰 페이로드에 포함된 사용자 ID

    try {
        const data = await Memo.create({
            writer : userId,
            language,
            mean,
            pronunciation,
            reference,
            createdAt: new Date(Date.now() + 9 * 60 * 60 * 1000)
        });
        return res.status(201).json({ result: true, message: "메모 저장 완료" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ result: false, message: "죄송합니다. 서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요." });
    };
};

export const memoList = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ result: false, message: "로그인이 필요합니다. 먼저 로그인해 주세요." });
        };

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const memos = await Memo.find({ writer: userId });
        if (memos.length === 0) {
            return res.status(200).json({ result: false, message: "등록된 메모가 없습니다.", memos: [] });
        };
        return res.status(200).json({ result: true, memos });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ result: false, message: "죄송합니다. 서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요." });
    }
};