import { prisma } from "../../lib/prisma";
import { comparePassword, hashPassword } from "../bcrypt/bcrypt.service";
import { createToken } from "../token/token.service";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

interface SetLogin {
  email: string;
  password: string;
}

export const loginService = async (data: SetLogin) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      return {
        success: false,
        error: "correo no se ha encontrado en la BD",
      };
    }
    const isPasswordValid = await comparePassword(
      data.password,
      user.password as string,
    );

    if (!isPasswordValid) {
      return { success: false, error: "Contraseña incorrecta" };
    }

    const token = createToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    const { password, ...userWithoutPassword } = user;

    return { success: true, data: { user: userWithoutPassword, token } };
  } catch (error) {
    console.error("Error en loginService:", error);
    return { success: false, error: "Error interno del servidor" };
  }
};

export const createUser = async (data: CreateUserInput) => {
  try {
    const hashedPassword = await hashPassword(data.password);
    const user = await prisma.user.create({
      data: { ...data, password: hashedPassword },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return {
      success: true,
      data: { user },
      id: user.id,
    };
  } catch (error) {
    console.error("Error en BD", error);
    return { success: false, error: "Email ya existe o datos invalidos" };
  }
};

export const createMany = async (users: CreateUserInput[]) => {
  try {
    const user = await prisma.user.createMany({
      data: users,
      skipDuplicates: true,
    });
    return { success: true, data: user };
  } catch (error) {
    console.error("Error en BD", error);
    return { success: false, error: "Datos invalidos o usuario repetido" };
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      return { success: false, error: "El usuario solicitado no existe." };
    }
    return { success: true, data: user };
  } catch (error) {
    console.error("Error en BD", error);
    return { success: false, error: "Usuario no encontrado" };
  }
};

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return { success: true, data: users };
  } catch (error) {
    console.error("Error en BD", error);
    return { success: false, error: "No se ha podido encontrar usuarios" };
  }
};

export const updateUser = async (
  id: string,
  data: Partial<CreateUserInput>,
) => {
  try {
    const user = await prisma.user.update({
      where: { id: id },
      data: data,
    });
    return { success: true, data: user };
  } catch (error) {
    console.error(`Error en BD al actualizar ID ${id}`);
    return { success: false, error: "No se pudo actualizar" };
  }
};

export const deleteUser = async (id: string) => {
  try {
    await prisma.user.delete({
      where: { id: id },
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "No se pudo eliminar. Es posible que el usuario ya no exista.",
    };
  }
};
