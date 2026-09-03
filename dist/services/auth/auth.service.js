import { comparePassword, hashPassword } from "../bcrypt/bcrypt.service.js";
import { generateToken } from "../../utils/token/index.js";
import { prisma } from "../../lib/prisma.js";
export const registerService = async (userData) => {
    try {
        const { name, email, password } = userData;
        // 1. Validación temprana (Si falta algo, cortamos el proceso de inmediato)
        if (!name || !email || !password) {
            return {
                error: true,
                status: 400,
                message: "Todos los campos son obligatorios",
            };
        }
        // 2. Comprobar si el usuario ya existe
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return {
                error: true,
                status: 400,
                message: "El correo ya está registrado",
            };
        }
        // 3. Hashear la contraseña (NUNCA guardamos contraseñas planas)
        const hashedPassword = await hashPassword(password);
        // 4. Crear el usuario en Prisma (recuerda que el rol 'USER' se asigna por defecto)
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        // 5. Retornar los datos exitosos (sin la contraseña, por seguridad)
        return {
            error: false,
            status: 201,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        };
    }
    catch (error) {
        console.error("Error en registerService:", error);
        // Atrapamos cualquier caída de la base de datos sin tumbar la aplicación
        return { error: true, status: 500, message: "Error interno del servidor" };
    }
};
export const loginService = async (credentials) => {
    try {
        const { email, password } = credentials;
        if (!email || !password) {
            return {
                error: true,
                status: 400,
                message: "Email y contraseña obligatorios",
            };
        }
        //1. Buscar el usuario
        const user = await prisma.user.findUnique({ where: { email } });
        // Usamos el mismo mensaje de error para no dar pistas a atacantes
        if (!user) {
            return { error: true, status: 401, message: "Credenciales inválidas" };
        }
        //2.Comparar la contraseña ingresada con el hash guardado
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return { error: true, status: 401, message: "Credenciales inválidas" };
        }
        //3. Crear el JWT (Token de accesso)
        // El 'payload' lleva el ID y el role,fundamentales para la autorizacion posterior
        const token = generateToken({ id: user.id, role: user.role });
        //4. Retornar el token y los datos basicos del usuario
        return {
            error: false,
            status: 200,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
    catch (error) {
        console.error("Error en loginService:", error);
        return { error: true, status: 500, message: "Error interno del servidor" };
    }
};
