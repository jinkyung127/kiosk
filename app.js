const express = require("express");
const router = require("./routes/index");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/", router);

app.listen(PORT, () => {
  console.log(PORT, "포트 번호로 서버가 실행되었습니다.");
});

// routeCache.js에서 캐싱 로직을 불러오기
const { getOptionData } = require("./routeCache");

// 이후에 라우트에서 getOptionData()를 사용하여 캐싱된 데이터를 사용하기
app.get("/optionData", async (req, res) => {
  try {
    const optionData = await getOptionData();
    res.json(optionData);
  } catch (error) {
    res.status(500).json({ message: "서버 에러" });
  }
});
