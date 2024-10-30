import User from "../model/user";
import bcrypt from 'bcryptjs';

export const idCheck = async (req, res) => {
    // console.log(req.body);
    const { id } = req.body;

    try {
        const userExists = await User.findOne({ id });
        if (userExists) {
            return res.status(200).json({ result: false, message: "중복" });
        } else {
            return res.status(200).json({ result: true, message: "사용가능" });
        };
    } catch (error) {
        console.error(error);
        return res.status(500).json({ result: false, message: "에러" });
    };
};

export const join = async (req, res) => {
    try{
        // console.log(req.body);
        const {id, password, name, phone, email} = req.body;
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
    try{
        // console.log(req.body);
        const { id, password } = req.body;

        const user = await User.findOne({ id });
        if (!user) {
            return res.status(401).send({ result: false, message: "아이디 또는 비밀번호가 잘못되었습니다." });
        }
        // 입력한 비밀번호와 저장된 해시된 비밀번호 비교
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ result: false, message: "아이디 또는 비밀번호가 잘못되었습니다." });
        };

        // 로그인 성공
        return res.status(200).send({ result: true, data: { id: user.id, name: user.name } });
    }catch(error){
        console.log(error);
        return res.send({result: false});
    };
};