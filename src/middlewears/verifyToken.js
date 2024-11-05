import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    // 요청 헤더에서 토큰 추출
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ result: false, message: "로그인이 필요합니다. 먼저 로그인해 주세요." });
    }

    try {
        // 토큰 검증 및 사용자 정보 추출
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // 사용자 정보를 핸들러에서 접근하기위해 설정합니다.
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(403).json({ result: false, message: "토큰이 만료되었습니다. 다시 로그인해 주세요." });
        }
        return res.status(403).json({ result: false, message: "유효하지 않은 토큰입니다." });
    }
};