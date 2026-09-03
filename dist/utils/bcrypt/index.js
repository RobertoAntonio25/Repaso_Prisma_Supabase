import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;
//Obligamos a que reciba un string y prometemos que devolvera un string
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};
export const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};
