import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import {
  verifyTokenMiddleware,
  isAdminMiddleware,
} from "../middleware/auth.middleware.js";

const router = Router();

// Endpoint PÚBLICO: Cualquier persona (incluso sin login) puede ver los productos
router.get("/", productController.getAllProducts);

// Endpoint PRIVADO Y PROTEGIDO:
// 1. verifyTokenMiddleware: Verifica que estés logueado
// 2. isAdminMiddleware: Verifica que tengas nivel (rol) ADMIN
// 3. createProduct: Si pasas los dos filtros anteriores, se ejecuta la creación

router.post(
  "/",
  verifyTokenMiddleware,
  isAdminMiddleware,
  productController.createProduct,
);

router.patch(
  "/:id",
  verifyTokenMiddleware,
  isAdminMiddleware,
  productController.updateProduct,
);
export default router;
