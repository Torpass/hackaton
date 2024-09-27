import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AdminDB } from "../config/sequelize.conf";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || "";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    return res.status(401).json({ message: "private route, token required" });
  }
  const [bearer, token] = authorizationHeader.split(" ");
  if (!authorizationHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    console.log(decoded);
    const { email } = decoded;

    const user = await AdminDB.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    console.error(`Error verifying token: ${error}`);
    return res.status(401).json({ message: "Error verifying token" });
  }
};
