import express from "express";
import promisePool from "../config/db";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("GET request to users");
});

export default router;
