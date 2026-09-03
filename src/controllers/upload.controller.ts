import { Request, Response } from "express";

export const uploadFile = (req: Request, res: Response): void => {
  // Gracias a Multer, el archivo físico viene dentro de 'req.file
  if (!req.file) {
    res.status(400).json({
      message: "No se subio ningún archivo o el formato es incorrecto",
    });
    return;
  }
  // Construimos la ruta pública que guardaremos luego en la base de datos de productos
  const fileUrl = `/uploads/${req.file.filename}`;

  res.status(200).json({
    message: "Archivo subido con éxito",
    imageUrl: fileUrl,
  });
};
