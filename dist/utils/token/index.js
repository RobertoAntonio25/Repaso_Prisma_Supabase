import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET || "mi_llave_secreta";
// Recibe un objeto genérico como payload y devuelve un string(token)
export const generateToken = (payload, expiresIn = "24h") => {
    return jwt.sign(payload, SECRET, { expiresIn });
};
//Verificamos el token. Retorna cualquier tipo por que el payload puede variar
export const verifyToken = (token) => {
    return jwt.verify(token, SECRET);
};
