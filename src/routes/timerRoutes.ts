import express from "express";
import promisePool from "../config/db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/", (req, res) => {
    res.send("GET request to timer");
});

router.post("/save", async (req, res) => {
    const { workNameId, duration, createdAt } = req.body;
    const formattedCreatedAt = new Date(createdAt)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

    // 保存に必要なデータが足りているか確認。
    if (!workNameId || !duration || !createdAt) {
        res.status(400).json({ error: "必要なデータが不足しています。" });
        return;
    }

    // トークンの存在確認。
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    // トークンの検証。
    let decoded;
    try {
        decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "mysecretkey"
        ) as {
            userId: string;
        };
    } catch (err) {
        console.error("トークンエラー:", err);
        res.status(403).json({ error: "トークンが無効です。" });
        return;
    }

    // DBへの書き込み。
    try {
        await promisePool.query(
            "INSERT INTO timer_records (user_id, work_name_id, duration, created_at) VALUES (?, ?, ?, ?)",
            [decoded.userId, workNameId, duration, formattedCreatedAt]
        );
        res.status(201).json({ message: "正常に保存が完了しました。" });
    } catch (err) {
        console.error("DBエラー:", err);
        res.status(500).json({ error: "保存に失敗しました。" });
    }
});

export default router;
