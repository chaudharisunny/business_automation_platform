import { NextFunction, Request, Response, Router, RequestHandler } from "express"
import * as workflowController from "./workflow.controller"
import { verifyToken } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate";
import { createWorkflowSchema, updateWorkflowSchema } from "./workflow.validation";

const router = Router();

router.post("/",
    verifyToken,
    validate(createWorkflowSchema as any) as RequestHandler,
    workflowController.createWorkflow as RequestHandler
)

router.get("/:id",
    verifyToken,
    workflowController.getWorkflowById
);

router.get("/",
    verifyToken,
    workflowController.getAllWorkflows
);

router.get(
  "/:id",
  verifyToken,
  workflowController.getWorkflowById
);

// Update Workflow
router.put(
  "/:id",
  verifyToken,
  validate(updateWorkflowSchema as any),
  workflowController.updateWorkflow
);

// Delete Workflow
router.delete(
  "/:id",
  verifyToken,
  workflowController.deleteWorkflow
);

export default router;


