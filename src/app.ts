import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import registerRoutes from "./routes/registerRoutes";
import loginRoutes from "./routes/loginRoutes";
import timerRoutes from "./routes/timerRoutes";
import verifyToken from "./middlewares/verifyToken";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);

app.use("/api/users", verifyToken, userRoutes);
app.use("/api/timer", verifyToken, timerRoutes);

export default app;
