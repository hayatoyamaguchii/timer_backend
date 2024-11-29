import express from "express";
import bcrypt from "bcryptjs";
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
    res.send("GET request to register");
});

router.post("/", async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req);

    try {
        // パスワードをハッシュ化し、フォームの内容をINSERT。
        const hashedPassword = await bcrypt.hash(password, 10);
        const [rows] = await promisePool.execute(
            "INSERT INTO users (name, email, password, type) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, "basic"]
        );
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Database error" });
    }
});

export default router;
