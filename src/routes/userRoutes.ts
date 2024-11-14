import { Router } from "express";
import promisePool from "../config/db";

const router = Router();

router.get("/", (req, res) => {
    res.send("GET request to the homepage");
});

router.post("/", (req, res) => {
    res.send("POST request to the homepage");
});

router.get("/alldatabase", async (req, res) => {
    try {
        const [rows] = await promisePool.execute("SELECT * FROM users");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Database error" });
    }
});

export default router;
