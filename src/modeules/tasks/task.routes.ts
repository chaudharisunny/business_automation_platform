import { Router } from "express";
import * as taskController from "./task.controller";
import { verifyToken } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate";
import { createTaskSchema, updateTaskSchema } from "./task.validation";


const router = Router()

router.post("/", verifyToken, validate(createTaskSchema as any), taskController.createTask);

router.get("/",verifyToken,taskController.getAllTasks);

router.put("/:id", verifyToken,validate(updateTaskSchema as any), taskController.updateTask);

router.delete("/:id",verifyToken,taskController.deleteTask);

export default router;