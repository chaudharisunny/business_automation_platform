import { z } from "zod";

export const createWorkflowSchema = z.object({
  company_id: z.number(),

  name: z
    .string()
    .min(3)
    .max(100),

  trigger_event: z.enum([
    "LEAD_CREATED",
    "LEAD_UPDATED",
    "TASK_CREATED",
    "TASK_COMPLETED",
  ]),

  action_type: z.enum([
    "CREATE_TASK",
    "ASSIGN_USER",
    "UPDATE_LEAD_STATUS",
    "SEND_EMAIL",
  ]),
});