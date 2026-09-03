import * as authService from "../services/auth/auth.service.js";
/**
 * CONTROLADOR DE REGISTRO
 */
// Promise<void> indica que esta función asíncrona no "retorna" un valor con 'return' al final,
// sino que responde al cliente a través de 'res'.
export const registerUser = async (req, res) => {
    //1. Pasamos el cuerpo de la peticion (req.body) al servicio de registro
    const result = await authService.registerService(req.body);
    //2. Verificamos si el servicio atrapo algun error o validacion
    if (result.error) {
        res.status(result.status).json({ message: result.message });
        return;
    }
    //3. Si todo salio bien, respondemos con exito(ej. 201)
    res
        .status(result.status)
        .json({ message: "Usuario registrado exitosamente", user: result.user });
};
/**
 * CONTROLADOR DE LOGIN
 */
export const loginUser = async (req, res) => {
    //1. Pasamos el cuerpo de la peticion (req.body) al servicio de login
    const result = await authService.loginService(req.body);
    //2. Manejo de errores
    if (result.error) {
        res.status(result.status).json({ message: result.message });
        return;
    }
    //3. Respuesta de exito
    res
        .status(result.status)
        .json({ message: "Login exitoso", token: result.token, user: result.user });
};
