import { Router } from "express";
import * as leadController from "./lead.controller"
import { verifyToken } from "../../middleware/auth.middleware";
import { createLeadSchema, updateLeadSchema } from "./lead.validation";
import { validate } from "../../middleware/validate";
const router = Router();

router.post("/",verifyToken,validate(createLeadSchema as any),leadController.createLead);

router.get("/:id", verifyToken, validate(updateLeadSchema as any), leadController.updateLead);

router.delete("/:id", verifyToken, leadController.deleteLead);

export default router;