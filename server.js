const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const app = express();
const port = process.env.PORT || 3000; // 让 Railway 自动分配端口

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 直接使用环境变量
});

app.use(cors());
app.use(bodyParser.json());

app.post("/analyze", async (req, res) => {
  const { inputA, inputB } = req.body;

  const prompt = `
    情侣A说: "${inputA}"
    情侣B说: "${inputB}"
    他们在争吵。作为一个专业的情感咨询师，请帮助他们找到矛盾点,并用一句话清晰指出根本矛盾点。然后结合双方的信息，分别用一两句话安慰并开导对方，接着给出关键的且简洁的解决方案让他们更容易和解，最后加鼓励双方的话，但不要标注出来是鼓励的话语：
    `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error("AI 处理错误:", error);
    res.status(500).json({ error: "AI 处理错误" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
