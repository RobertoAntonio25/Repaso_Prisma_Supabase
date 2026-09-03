import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "mi_llave_secreta";

// Recibe un objeto genérico como payload y devuelve un string(token)
export const generateToken = (
  payload: object,
  expiresIn: string | number = "24h",
): string => {
  return jwt.sign(payload, SECRET, { expiresIn } as jwt.SignOptions);
};

//Verificamos el token. Retorna cualquier tipo por que el payload puede variar

export const verifyToken = (token: string): any => {
  return jwt.verify(token, SECRET);
};
