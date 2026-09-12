const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

export type Lead = { id?: number; full_name?: string; fullname?: string; email?: string; phone?: string; source?: string; status?: string };
export type Task = { id?: number; title: string; description?: string; status?: string; priority?: string; due_date?: string };
export type Workflow = { id?: number; name: string; trigger_event: string; action_type: string; is_active?: boolean };
export type Company = { id?: number; company_name: string; email: string; industry?: string; phone?: string; website?: string };
export type User = { id?: number; name: string; email: string; role?: string };
export type Role = { id?: number; name: string; description?: string };

async function request<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.message ?? "The server could not complete that request.");
  return body.data ?? body;
}

export function login(email: string, password: string) {
  return request<{ token: string }>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
}

export async function getDashboardData(token: string) {
  const [leads, tasks, workflows, companies] = await Promise.all([
    request<Lead[]>("/leads", {}, token), request<Task[]>("/task", {}, token),
    request<Workflow[]>("/workflow", {}, token), request<Company[]>("/company/all", {}, token),
  ]);
  return { leads, tasks, workflows, companies };
}

export function register(name: string, email: string, password: string) {
  return request<{ id: number; name: string; email: string }>("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) });
}

export function logout(token: string) { return request<{ message: string }>("/auth/logout", {}, token); }

export function createCompany(payload: Partial<Company>, token: string) { return request<Company>("/company/new", { method: "POST", body: JSON.stringify(payload) }, token); }
export function updateCompany(id: number, payload: Partial<Company>, token: string) { return request<Company>(`/company/${id}`, { method: "PUT", body: JSON.stringify(payload) }, token); }
export function deleteCompany(id: number, token: string) { return request<void>(`/company/${id}`, { method: "DELETE" }, token); }
export function createLead(payload: Record<string, unknown>, token: string) { return request<Lead>("/leads", { method: "POST", body: JSON.stringify(payload) }, token); }
export function updateLead(id: number, payload: Record<string, unknown>, token: string) { return request<Lead>(`/leads/${id}`, { method: "PUT", body: JSON.stringify(payload) }, token); }
export function deleteLead(id: number, token: string) { return request<void>(`/leads/${id}`, { method: "DELETE" }, token); }
export function createTask(payload: Record<string, unknown>, token: string) { return request<Task>("/task", { method: "POST", body: JSON.stringify(payload) }, token); }
export function updateTask(id: number, payload: Record<string, unknown>, token: string) { return request<Task>(`/task/${id}`, { method: "PUT", body: JSON.stringify(payload) }, token); }
export function deleteTask(id: number, token: string) { return request<void>(`/task/${id}`, { method: "DELETE" }, token); }
export function createWorkflow(payload: Record<string, unknown>, token: string) { return request<Workflow>("/workflow", { method: "POST", body: JSON.stringify(payload) }, token); }
export function updateWorkflow(id: number, payload: Record<string, unknown>, token: string) { return request<Workflow>(`/workflow/${id}`, { method: "PUT", body: JSON.stringify(payload) }, token); }
export function deleteWorkflow(id: number, token: string) { return request<void>(`/workflow/${id}`, { method: "DELETE" }, token); }
export function getUsers(token: string) { return request<User[]>("/user", {}, token); }
export function updateUser(id: number, payload: Partial<User>, token: string) { return request<User>(`/user/${id}`, { method: "PUT", body: JSON.stringify(payload) }, token); }
export function deleteUser(id: number, token: string) { return request<void>(`/user/${id}`, { method: "DELETE" }, token); }
export function getRoles(token: string) { return request<Role[]>("/role", {}, token); }
export function createRole(payload: Partial<Role>, token: string) { return request<Role>("/role", { method: "POST", body: JSON.stringify(payload) }, token); }
export function updateRole(id: number, payload: Partial<Role>, token: string) { return request<Role>(`/role/${id}`, { method: "PUT", body: JSON.stringify(payload) }, token); }
export function deleteRole(id: number, token: string) { return request<void>(`/role/${id}`, { method: "DELETE" }, token); }