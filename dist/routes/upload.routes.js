import { Router } from "express";
import { isAdminMiddleware, verifyTokenMiddleware, } from "../middleware/auth.middleware.js";
import { uploadMiddleware } from "../middleware/upload.middleware.js";
import { uploadFile } from "../controllers/upload.controller.js";
const router = Router();
const handleUpload = (req, res, next) => {
    const upload = uploadMiddleware.single("image");
    upload(req, res, (err) => {
        if (err) {
            // Si Multer lanza un error (como nuestro archivo no permitido), respondemos con JSON
            return res.status(400).json({ error: true, message: err.message });
        }
        // Si todo salió bien, pasamos al siguiente controlador
        next();
    });
};
// Endpoint: POST /api/upload
// Fíjate en el orden de los middlewares (nuestros guardias):
// 1. Debe estar logueado
// 2. Debe ser ADMIN
// 3. Pasamos Multer buscando un campo llamado 'image' en el formulario
// 4. Ejecutamos el controlador
router.post("/", verifyTokenMiddleware, isAdminMiddleware, handleUpload, uploadFile);
export default router;
