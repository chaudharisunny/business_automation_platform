import { z } from "zod";
import { updateTask } from "./task.repository";

export const createTaskSchema = z.object({
    lead_id: z.number().describe("Lead Id is required"),
    assigned_to: z.number().refine(() => true, {
        message: "Assigned user is required",
    }),

    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(255, "Title cannot exceed 255 character"),

        description: z.string().optional(),

        priority: z
        .enum(["Low", "Medium", "High"])
        .optional(),

        due_date: z.coerce.date().optional(),
});

export const updateTaskSchema = z.object({
    assigned_to: z.number().optional(),

    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(255, "Title cannot exceed 255 characters")
        .optional(),

        description: z.string().optional(),

        status: z
        .enum([
            "pending",
            "In Progress",
            "Completed",
            "Cancelled",
        ])
        .optional(),

        priority: z
            .enum([
                "Low",
                "Medium",
                "High",
            ])
            .optional(),
        due_date: z.coerce.date().optional(),    
});