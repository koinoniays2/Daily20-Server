import User from "../model/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const idCheck = async (req, res) => {
    // console.log(req.body);
    const { id } = req.body;

    try {
        const userExists = await User.findOne({ id });
        return res.status(200).json({ result: !userExists, message: userExists ? "중복" : "사용가능" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ result: false, message: "서버오류" });
    };
};

export const join = async (req, res) => {
    // console.log(req.body);
    const {id, password, name, phone, email} = req.body;
    // 필수 항목(id, password, name) 검증 추가
    /*
    if (!id || !password || !name || !phone || !email) { 
        return res.status(400).json({ result: false, message: "필수 항목을 입력해주세요." });
    }
    */
    try{
        // 비밀번호 해시
        const hashedPassword = await bcrypt.hash(password, 10);

        const data = await User.create({
            id,
            password : hashedPassword,
            name,
            phone,
            email,
            createdAt: new Date(Date.now() + 9 * 60 * 60 * 1000)
        });

        return res.send({result: true, data});
    }catch(error){
        console.log(error);
        return res.send({result: false});
    };
};

export const login = async (req, res) => {
    // console.log(req.body);
    const { id, password } = req.body;

    try{
        // 데이터베이스에서 사용자 찾기
        const user = await User.findOne({ id });
        if (!user) {
            return res.status(401).send({ result: false, message: "아이디 비밀번호 오류" });
        }
        // 입력한 비밀번호와 저장된 해시된 비밀번호 비교
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ result: false, message: "아이디 비밀번호 오류" });
        };

         // JWT 발급
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // 로그인 성공
        return res.status(200).send({ result: true, token, data: { id: user.id, name: user.name } });
    }catch(error){
        console.log(error);
        return res.status(500).json({ result: false, message: "서버 오류" });
    };
};