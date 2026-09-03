import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/token/token.service";
import { getUserService } from "../services/user/user.service";

export async function userMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res
        .status(401)
        .json({ error: "No se proporcionó un token de acceso" });
    }

    const token = authHeader.replace("Bearer", "");
    const translateToken = verifyToken(token)
  } catch (error) {}
}
