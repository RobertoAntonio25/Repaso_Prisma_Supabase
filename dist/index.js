// 1. IMPORTACIONES PRINCIPALES
import express from "express";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import dotenv from "dotenv";
// 2. INICIALIZACIÓN
dotenv.config();
const app = express();
// Buena práctica: Usar variables de entorno para el puerto, con un fallback (3000)
const PORT = process.env.PORT || 3000;
// 3. MIDDLEWARES GLOBALES (Procesamiento del Master Bus)
// Esto es vital: le dice a Express que entienda el formato JSON que viene del Frontend
app.use(express.json());
// MAGIA AQUÍ: Convertimos la carpeta 'uploads' en una carpeta pública visible en la web
app.use("/upload", express.static(path.join(process.cwd(), "uploads")));
// 4. ENDPOINT DE SALUD (Health Check)
// Es un estándar en la industria tener una ruta base para que plataformas como AWS o Vercel
// sepan que tu servidor está "vivo".
app.get("/", (req, res) => {
    res.send("API Funcionando correctamente");
});
// 5. REGISTRO DE RUTAS (Ruteando los canales al Master)
// Todo lo que venga a /api/users (o /api/auth) será manejado por authRoutes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
//Tarea finall, findMany
