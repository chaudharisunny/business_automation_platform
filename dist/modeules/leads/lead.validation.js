"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLeadSchema = exports.createLeadSchema = void 0;
const zod_1 = require("zod");
exports.createLeadSchema = zod_1.z.object({
    company_id: zod_1.z.number().describe("Company ID is required"),
    assigned_to: zod_1.z.number().optional(),
    full_name: zod_1.z
        .string()
        .min(3, "Full name must be at least 3 character"),
    email: zod_1.z
        .string()
        .email("Invalid email")
        .optional(),
    phone: zod_1.z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number cannot exceed 15 digits")
        .optional(),
    source: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
});
exports.updateLeadSchema = zod_1.z.object({
    assigned_to: zod_1.z.number().optional(),
    full_name: zod_1.z.string().min(3).optional(),
    email: zod_1.z
        .string()
        .email("Invalid email")
        .optional(),
    phone: zod_1.z
        .string()
        .min(10)
        .max(15)
        .optional(),
    source: zod_1.z.string().optional(),
    status: zod_1.z.enum([
        "New",
        "contacted",
        "Qualified",
        "Won",
        "Lost",
    ]).optional(),
    notes: zod_1.z.string().optional(),
});
//# sourceMappingURL=lead.validation.js.map