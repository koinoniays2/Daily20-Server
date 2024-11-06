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
        return res.status(201).json({ result: true, message: "메모 저장 완료", data });
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

export const memoDelete = async (req, res) => {
    const { ids } = req.body; // 삭제할 메모의 ID 목록


    if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ result: false, message: "삭제할 메모를 선택해주세요." });
    }

    try {
        // ids 배열에 있는 _id에 해당하는 메모들을 삭제
        await Memo.deleteMany({ _id: { $in: ids } });
        return res.status(200).json({ result: true, message: "선택한 메모가 삭제되었습니다." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ result: false, message: "죄송합니다. 서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요." });
    }
};

export const memoUpdate = async (req, res) => {
    const { _id, language, mean, pronunciation, reference } = req.body;

    try {
        const updatedMemo = await Memo.findByIdAndUpdate(
            _id,
            { language, mean, pronunciation, reference },
            { new: true }
        );

        if (!updatedMemo) {
            return res.status(404).json({ result: false, message: "메모를 찾을 수 없습니다." });
        }
        res.status(200).json({ result: true, message: "메모가 성공적으로 수정되었습니다.", data: updatedMemo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: false, message: "죄송합니다. 서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요." });
    }
};