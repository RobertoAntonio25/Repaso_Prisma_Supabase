import { Request, Response } from "express";
import * as userService from "../services/user/user.service";

export const createUser = async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  return res.status(201).json(result.data);
};

export const createMany = async (req: Request, res: Response) => {
  const result = await userService.createMany(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  return res.status(201).json(result.data);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  if (isNaN(id)) {
    return res.status(400).json({ error: "El ID proporcionado no es válido" });
  }
  const result = await userService.getUserById(id);
  if (!result.success) {
    return res.status(404).json({ error: result.error });
  }
  res.status(200).json(result.data);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const result = await userService.getAllUsers();
  res.status(200).json(result.data);
};

export const updateUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  if (isNaN(id)) {
    return res.status(400).json({ error: "El ID proporcionado no es válido" });
  }
  const result = await userService.updateUser(id, req.body);

  if (!result.success) {
    return res.status(404).json({ error: result.error });
  }

  return res.status(200).json(result.data);
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  if (isNaN(id)) {
    return res.status(400).json({ error: "El ID proporcionado no es válido" });
  }
  const result = await userService.deleteUser(id);
  if (!result.success) {
    return res.status(404).json({ error: result.error });
  }

  return res
    .status(200)
    .json({ message: "Usuario eliminado correctamente de Supabase" });
};

export const loginController = async (req: Request, res: Response) => {
  const {email,password}=req.body
  if (!email || !password) {
    return res.status(400).json({ error: "Email y password son obligatorios" });
  }

  const result = await userService.loginService(req.body)
  if (!result.success) {
    return res.status(401).json({ error: result.error });
  }
  return res.status(200).json(result.data);
};
