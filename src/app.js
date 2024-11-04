import "dotenv/config"; // npm i dotenv
import "./db.js"; // db 연결
import express from "express"; // npm i express
import morgan from "morgan"; // npm i morgan
import cors from "cors"; // npm i cors
import joinRouter from "./router/joinRouter.js";
import memoRouter from "./router/memoRouter.js";

const corsOption = {
    origin: "*"
};

const app = express();
app.use(morgan("dev"));
app.use(cors(corsOption));
app.use(express.json());

app.get("/", (req, res) => { res.send("root"); });
app.use("/join", joinRouter);
app.use("/memo", memoRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

export default app;