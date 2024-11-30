import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface DecodedToken {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: DecodedToken;
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];
    // トークンの存在を確認。
    if (!token) {
        res.status(401).json({ message: "Access token is missing" });
        console.log("401");
        return;
    }

    // JWTをデコードし、整合性を確認。
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as DecodedToken;
        req.user = decoded;
        console.log("success");
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
        console.log("403");
        return;
    }
};

export default verifyToken;
