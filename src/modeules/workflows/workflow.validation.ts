import z from "zod";

export const createWorkflowSchema = z.object({
    company_id: z.number().describe("Company ID is required"),
    name: z.string().min(3, "Workflow name must be at least 3 characters"),

    trigger_event: z.enum([
        "LEAD_CREATED",
        "LEAD_UPDATED",
        "TASK_CREATED",
        "TASK_COMPLETED",
    ]),

    action_tyoe: z.enum([
        "CREATE_TASK",
        "ASSIGN_USER",
        "UPDATE_LEAD_STATUS",
        "SEND_EMAIL",
    ])
});

export const updateWorkflowSchema = z.object({
  name: z
    .string()
    .min(3, "Workflow name must be at least 3 characters")
    .max(100, "Workflow name cannot exceed 100 characters")
    .optional(),

  trigger_event: z.enum([
    "LEAD_CREATED",
    "LEAD_UPDATED",
    "TASK_CREATED",
    "TASK_COMPLETED",
  ]).optional(),

  action_type: z.enum([
    "CREATE_TASK",
    "ASSIGN_USER",
    "UPDATE_LEAD_STATUS",
    "SEND_EMAIL",
  ]).optional(),

  is_active: z.boolean().optional(),
});
