import Memo from "../model/memo";

export const memoWrite = async (req, res) => {
    const { language, mean, pronunciation, reference} = req.body;

    // 미들웨어로부터 전달된 사용자 ID
    const userId = req.user.id; // 토큰 페이로드에 포함된 사용자 ID

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
        const userId = req.user.id;

        const memos = await Memo.find({ writer: userId }).sort({ createdAt: -1 }); // 날짜 내림차순
        if (memos.length === 0) {
            return res.status(200).json({ result: false, message: "등록된 메모가 없습니다.", memos: [] });
        };
        return res.status(200).json({ result: true, memos });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ result: false, message: "죄송합니다. 서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요." });
    }
};