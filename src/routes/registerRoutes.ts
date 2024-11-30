import express from "express";
import bcrypt from "bcryptjs";
import mysql from "mysql2";
import dotenv from "dotenv";
import promisePool from "../config/db";

dotenv.config();

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
