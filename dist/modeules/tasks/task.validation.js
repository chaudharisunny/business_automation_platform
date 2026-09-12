"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    lead_id: zod_1.z.number().describe("Lead Id is required"),
    assigned_to: zod_1.z.number().refine(() => true, {
        message: "Assigned user is required",
    }),
    title: zod_1.z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(255, "Title cannot exceed 255 character"),
    description: zod_1.z.string().optional(),
    priority: zod_1.z
        .enum(["Low", "Medium", "High"])
        .optional(),
    due_date: zod_1.z.coerce.date().optional(),
});
exports.updateTaskSchema = zod_1.z.object({
    assigned_to: zod_1.z.number().optional(),
    title: zod_1.z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(255, "Title cannot exceed 255 characters")
        .optional(),
    description: zod_1.z.string().optional(),
    status: zod_1.z
        .enum([
        "pending",
        "In Progress",
        "Completed",
        "Cancelled",
    ])
        .optional(),
    priority: zod_1.z
        .enum([
        "Low",
        "Medium",
        "High",
    ])
        .optional(),
    due_date: zod_1.z.coerce.date().optional(),
});
//# sourceMappingURL=task.validation.js.map