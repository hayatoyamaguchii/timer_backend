import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const promisePool = pool.promise();
const router = express.Router();

router.get("/", (req, res) => {
    res.send("GET request to login");
});

router.post("/", async (req, res): Promise<void> => {
    const { email, password } = req.body;
    console.log(req);

    try {
        // emailに合致するレコードをSELECT。
        const [rows] = await promisePool.execute<mysql.RowDataPacket[]>(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        // 取得したレコードがない場合はエラーでリターン。
        if (rows.length === 0) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }

        // パスワードがマッチしているかを確認。マッチしていなければエラーでリターン。
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }

        // jwdでトークンを発行。
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || "mysecretkey",
            { expiresIn: process.env.JWT_EXPIRATION || "1h" }
        );
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Database error" });
    }
});

export default router;
