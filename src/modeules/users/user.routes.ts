import { Router } from "express";
import * as userController from "./user.controller";
import { verifyToken } from "../../middleware/auth.middleware";

const router = Router();

router.get("/",  userController.getAllUsers);

router.get("/:id", verifyToken, userController.getUserById);

router.put("/:id", verifyToken, userController.updateaUser);

router.delete("/:id", verifyToken, userController.deleteUser);

export default router;