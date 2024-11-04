import Memo from "../model/memo";

export const memoWrite = async (req, res) => {
    const { writer,  language, mean, pronunciation, reference} = req.body;

    try {
        const data = await Memo.create({
            writer,
            language,
            mean,
            pronunciation,
            reference,
            createdAt: new Date(Date.now() + 9 * 60 * 60 * 1000)
        });
        return res.status(201).json({ result: true, message: "메모 저장 완료" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ result: false, message: "죄송합니다, 서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요." });
    };
};