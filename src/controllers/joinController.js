import User from "../model/user";

export const idCheck = async (req, res) => {
    console.log(req.body);
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
        console.log(req.body);
        const {id, password, name, phone, email} = req.body;
        const data = await User.create({
            id,
            password,
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