import { Router } from "express";
import * as roleController from "./role.controller"
import { verifyToken } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", verifyToken, roleController.createdRole);

router.get("/", verifyToken, roleController.getAllROles);

router.get("/:id", verifyToken, roleController.getRoleById);

router.put("/:id", verifyToken, roleController.updateRole);

router.delete("/:id", verifyToken, roleController.deleteRole);

export default router;