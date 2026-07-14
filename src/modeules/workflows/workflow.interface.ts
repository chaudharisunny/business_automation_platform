export interface IWorkflow {
  id?: number;

  company_id: number;

  name: string;

  trigger_event: string;

  action_type: string;

  is_active?: boolean;

  created_at?: Date;
  updated_at?: Date;
}

export interface ICreateWorkflow {
  company_id: number;

  name: string;

  trigger_event: string;

  action_type: string;
}

export interface IUpdateWorkflow {
  name?: string;

  trigger_event?: string;

  action_type?: string;

  is_active?: boolean;
}

