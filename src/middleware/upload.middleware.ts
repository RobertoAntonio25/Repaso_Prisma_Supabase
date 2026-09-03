import multer from "multer";
import path from "path";
import fs from "fs";

// 1. Definimos la carpeta donde se guardarán (ej. en la raíz del proyecto en la carpeta 'uploads')
const uploadDir = path.join(process.cwd(), "uploads");

// Buena práctica: Si la carpeta 'uploads' no existe, Node.js la crea automáticamente

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 2. Configuramos el "Storage" (Almacenamiento)

const storage = multer.diskStorage({
  //Donde se guarda?
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  // ¿Cómo se llamará el archivo?
  filename: (req, file, cb) => {
    // Generamos un sufijo único usando la fecha actual y un número aleatorio
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    //Extraemos la extension original (.jpg,png)
    const ext = path.extname(file.originalname);

    //Unimos todos: nombre-campo-16323456789.jpg
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// 3. (Opcional pero recomendado) Filtro de seguridad: Solo aceptar imágenes

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  console.log("🕵️‍♂️ MIME type detectado por Multer:", file.mimetype);
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error(`El archivo no es una imagen. Formato recibido: ${file.mimetype}`));
  }
};

// 4. Exportamos el middleware listo para usarse

export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB por seguridad
});

