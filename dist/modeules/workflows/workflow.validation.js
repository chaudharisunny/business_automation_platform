"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWorkflowSchema = exports.createWorkflowSchema = void 0;
const zod_1 = require("zod");
exports.createWorkflowSchema = zod_1.z.object({
    company_id: zod_1.z.number(),
    name: zod_1.z
        .string()
        .min(3)
        .max(100),
    trigger_event: zod_1.z.enum([
        "LEAD_CREATED",
        "LEAD_UPDATED",
        "TASK_CREATED",
        "TASK_COMPLETED",
    ]),
    action_type: zod_1.z.enum([
        "CREATE_TASK",
        "ASSIGN_USER",
        "UPDATE_LEAD_STATUS",
        "SEND_EMAIL",
    ]),
    is_active: zod_1.z.boolean().optional(),
});
exports.updateWorkflowSchema = exports.createWorkflowSchema.partial();
//# sourceMappingURL=workflow.validation.js.map