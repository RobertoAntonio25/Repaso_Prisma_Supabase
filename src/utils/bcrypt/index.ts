import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

//Obligamos a que reciba un string y prometemos que devolvera un string
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
