import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token";

//Extendemos el Request de express para tipar 'user'
export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

/**Guardia 1: verificar que el token JWT sea valido y lo adjunta a la peticion */
export const verifyTokenMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(401)
        .json({ message: "Acceso denegado. Token no proporcionado." });
      return;
    }

    const token = authHeader.split(" ")[1];
    // Usamos nuestra utilidad modular de token
    const decoded = verifyToken(token) as { id: string; role: string };

    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Token inválido o expirado." });
  }
};

/**Guardia 2: verificar que el usuario tenga el rol de ADMIN */

export const isAdminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== "ADMIN") {
        res.status(403).json({ message: "Acceso denegado. Se requiere permisos de administrador." });
        return;
    }
    next();
};
