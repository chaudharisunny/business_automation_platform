import { z } from "zod";

export const createLeadSchema = z.object({
    company_id: z.number().describe("Company ID is required"),

    assigned_to: z.number().optional(),

    full_name: z 
    .string()
    .min(3, "Full name must be at least 3 character"),

    email: z 
    .string()
    .email("Invalid email")
    .optional(),

    phone: z 
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .optional(),

    source: z.string().optional(),

    notes: z.string().optional(),
});

export const updateLeadSchema = z.object({
    assigned_to: z.number().optional,

    full_name: z.string().min(3).optional(),

    email: z 
        .string()
        .email("Invalid email")
        .optional(),

   phone: z     
        .string()
        .min(10)
        .max(15)
        .optional(),

    source: z.string().optional(),
    
    status: z.enum([
        "New",
        "contacted",
        "Qualified",
        "Won",
        "Lost",
    ]).optional(),

    notes: z.string().optional(),
})