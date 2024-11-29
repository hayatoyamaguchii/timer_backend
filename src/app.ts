import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import registerRoutes from "./routes/registerRoutes";
import loginRoutes from "./routes/loginRoutes";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);

export default app;
