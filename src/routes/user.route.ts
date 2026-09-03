import { Router } from "express";
import * as userController from "../controllers/user.controller";

const router = Router();

router.post("/", userController.createUser);
router.post("/bulk", userController.createMany);
router.get("/:id", userController.getUserById);
router.get("/", userController.getAllUsers);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.post("/login", userController.loginController);

export default router;
