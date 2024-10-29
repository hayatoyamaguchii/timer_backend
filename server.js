// server.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// ルートエンドポイントの設定
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// サーバーの起動
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
