import { useEffect, useState } from "react";
import { Activity, ArrowUpRight, Building2, CheckCircle2, ChevronRight, CircleAlert, LayoutDashboard, ListTodo, LogOut, Menu, RefreshCw, Search, Settings2, ShieldCheck, Sparkles, Users, Workflow, X } from "lucide-react";
import { createCompany, createLead, createRole, createTask, createWorkflow, deleteCompany, deleteLead, deleteRole, deleteTask, deleteUser, deleteWorkflow, getDashboardData, getRoles, getUsers, login, updateCompany, updateLead, updateRole, updateTask, updateUser, updateWorkflow, type Company, type Lead, type Task, type Workflow as WorkflowRecord } from "./api";
import "./App.css";

type DashboardData = { leads: Lead[]; tasks: Task[]; workflows: WorkflowRecord[]; companies: Company[] };
const emptyData: DashboardData = { leads: [], tasks: [], workflows: [], companies: [] };

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("bap_token"));
  const [data, setData] = useState<DashboardData>(emptyData);
  const [activeView, setActiveView] = useState("Overview");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mobileNav, setMobileNav] = useState(false);

  const loadData = async (activeToken = token) => {
    if (!activeToken) return;
    setIsLoading(true); setError("");
    try { setData(await getDashboardData(activeToken)); }
    catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Could not load workspace data."); }
    finally { setIsLoading(false); }
  };

  useEffect(() => { void loadData(); }, [token]);
  if (!token) return <Login onLogin={(nextToken) => { localStorage.setItem("bap_token", nextToken); setToken(nextToken); }} />;

  const activeTasks = data.tasks.filter((task) => !["done", "completed"].includes(task.status?.toLowerCase() ?? ""));
  const completedTasks = data.tasks.length - activeTasks.length;
  const activeWorkflows = data.workflows.filter((workflow) => workflow.is_active !== false).length;
  const stats = [
    { label: "Pipeline leads", value: data.leads.length, detail: "Across your workspace", icon: Users, tone: "coral" },
    { label: "Open tasks", value: activeTasks.length, detail: `${completedTasks} completed`, icon: ListTodo, tone: "blue" },
    { label: "Active workflows", value: activeWorkflows, detail: `${data.workflows.length} configured`, icon: Workflow, tone: "green" },
    { label: "Companies", value: data.companies.length, detail: "Connected accounts", icon: Building2, tone: "gold" },
  ];
  const recentLeads = data.leads.slice(0, 5);
  const upcomingTasks = activeTasks.slice(0, 4);

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
      <div className="brand"><span className="brand-mark"><Sparkles size={17} /></span><span>Flowdesk</span></div>
      <div className="workspace-switcher"><span className="workspace-dot" /> Acme workspace <ChevronRight size={15} /></div>
      <nav className="nav-list" aria-label="Main navigation"><p className="nav-label">Workspace</p>
          {[["Overview", LayoutDashboard], ["Leads", Users], ["Tasks", ListTodo], ["Workflows", Workflow], ["Companies", Building2], ["Users", Users], ["Roles", ShieldCheck], ["Reports", Activity]].map(([label, Icon]) => <button key={label as string} className={`nav-item ${activeView === label ? "active" : ""}`} onClick={() => { setActiveView(label as string); setMobileNav(false); }}><Icon size={17} /> {label as string}{label === "Leads" && <span className="nav-count">{data.leads.length}</span>}</button>)}
          <p className="nav-label nav-label-lower">Manage</p><button className={`nav-item ${activeView === "Settings" ? "active" : ""}`} onClick={() => { setActiveView("Settings"); setMobileNav(false); }}><Settings2 size={17} /> Settings</button>
      </nav>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><CircleAlert size={16} /></div><strong>Need a hand?</strong><span>Visit the help center</span></div><button className="profile-row" onClick={() => { localStorage.removeItem("bap_token"); setToken(null); }}><span className="avatar">JD</span><span className="profile-copy"><strong>Jordan Davis</strong><small>Administrator</small></span><LogOut size={16} /></button></div>
    </aside>
    {mobileNav && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileNav(false)} />}
    <main className="main-content"><header className="topbar"><button className="menu-button" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu size={20} /></button><div className="breadcrumbs"><span>Workspace</span><ChevronRight size={14} /><strong>{activeView}</strong></div><div className="topbar-actions"><button className="icon-button"><Search size={18} /></button><button className="icon-button"><Activity size={18} /></button><span className="top-avatar">JD</span></div></header>
      <div className="page-wrap"><div className="page-heading"><div><p className="eyebrow">Thursday, September 11, 2026</p><h1>{activeView === "Overview" ? <>Good morning, Jordan <span>✦</span></> : activeView}</h1><p className="subheading">{activeView === "Overview" ? "Here is what is happening across your business today." : `Manage your ${activeView.toLowerCase()} through the connected API.`}</p></div><button className="refresh-button" onClick={() => void loadData()} disabled={isLoading}>{isLoading ? <RefreshCw className="spin" size={16} /> : <RefreshCw size={16} />} Refresh data</button></div>
        {error && <div className="error-banner"><CircleAlert size={18} /><span>{error}</span><button onClick={() => setError("")}><X size={16} /></button></div>}
        {activeView === "Reports" && <ReportsPage data={data} />}
        {activeView === "Settings" && <SettingsPage />}
        {["Leads", "Tasks", "Workflows", "Companies", "Users", "Roles"].includes(activeView) && <ResourceView resource={activeView} token={token} data={data} onChanged={() => void loadData()} onError={setError} />}
        {activeView === "Overview" && <>
        <section className="stats-grid">{stats.map(({ label, value, detail, icon: Icon, tone }) => <article className={`stat-card ${tone}`} key={label}><div className="stat-top"><span>{label}</span><span className="stat-icon"><Icon size={18} /></span></div><strong>{value}</strong><small>{detail}</small></article>)}</section>
        <div className="section-heading"><div><h2>Today at a glance</h2><p>Keep your team moving with the latest activity.</p></div><button className="text-button" onClick={() => setActiveView("Reports")}>View reports <ArrowUpRight size={15} /></button></div>
        <section className="content-grid"><article className="panel"><div className="panel-heading"><div><h3>Recent leads</h3><p>New opportunities entering your pipeline</p></div><button className="round-action" aria-label="View all leads" onClick={() => setActiveView("Leads")}><ArrowUpRight size={16} /></button></div>{recentLeads.length ? <div className="lead-list">{recentLeads.map((lead, index) => <div className="lead-row" key={lead.id ?? `${lead.email}-${index}`}><span className={`lead-avatar avatar-${index % 4}`}>{(lead.full_name ?? lead.fullname ?? "Lead").slice(0, 2).toUpperCase()}</span><span className="lead-main"><strong>{lead.full_name ?? lead.fullname ?? "Unnamed lead"}</strong><small>{lead.email ?? lead.phone ?? "No contact details"}</small></span><span className="lead-source">{lead.source ?? "Direct"}</span><ChevronRight size={15} className="muted-icon" /></div>)}</div> : <EmptyState label="No leads found yet" />}</article><article className="panel"><div className="panel-heading"><div><h3>Priority tasks</h3><p>What needs your attention next</p></div><button className="round-action" aria-label="View all tasks" onClick={() => setActiveView("Tasks")}><ArrowUpRight size={16} /></button></div>{upcomingTasks.length ? <div className="task-list">{upcomingTasks.map((task, index) => <div className="task-row" key={task.id ?? `${task.title}-${index}`}><span className={`priority-dot ${task.priority?.toLowerCase() ?? "normal"}`} /><span className="task-main"><strong>{task.title}</strong><small>{task.due_date ? `Due ${new Date(task.due_date).toLocaleDateString()}` : task.status ?? "Open"}</small></span><span className="task-arrow"><ChevronRight size={15} /></span></div>)}</div> : <EmptyState label="No open tasks" />}</article></section>
        <section className="workflow-strip"><div className="workflow-copy"><span className="workflow-symbol"><Workflow size={19} /></span><div><h3>Automation is working for you</h3><p>{activeWorkflows} active workflow{activeWorkflows === 1 ? "" : "s"} are keeping your follow-ups on track.</p></div></div><button className="text-button" onClick={() => setActiveView("Workflows")}>Manage workflows <ArrowUpRight size={15} /></button></section>
        </>}
      </div></main>
  </div>;
}

function EmptyState({ label }: { label: string }) { return <div className="empty-state"><CheckCircle2 size={20} /><span>{label}</span></div>; }

function ReportsPage({ data }: { data: DashboardData }) {
  const completedTasks = data.tasks.filter((task) => ["done", "completed"].includes(task.status?.toLowerCase() ?? "")).length;
  const activeWorkflows = data.workflows.filter((workflow) => workflow.is_active !== false).length;
  const sourceCounts = data.leads.reduce<Record<string, number>>((counts, lead) => { const source = lead.source ?? "Direct"; counts[source] = (counts[source] ?? 0) + 1; return counts; }, {});
  const maxSourceCount = Math.max(...Object.values(sourceCounts), 1);
  return <section className="reports-page"><div className="report-summary"><article className="report-hero"><span className="report-icon"><Activity size={20} /></span><p className="eyebrow">Workspace report</p><h2>Business pulse</h2><p>Live performance signals from the connected leads, tasks, workflows, and company APIs.</p></article><article className="report-total"><small>Total tracked records</small><strong>{data.leads.length + data.tasks.length + data.workflows.length + data.companies.length}</strong><span>Across four workspaces</span></article></div><div className="report-grid"><article className="panel report-card"><div className="panel-heading"><div><h3>Lead sources</h3><p>Where your pipeline is coming from</p></div></div><div className="source-bars">{Object.entries(sourceCounts).length ? Object.entries(sourceCounts).map(([source, count]) => <div className="source-row" key={source}><div><span>{source}</span><strong>{count}</strong></div><div className="bar-track"><span style={{ width: `${(count / maxSourceCount) * 100}%` }} /></div></div>) : <EmptyState label="No lead data yet" />}</div></article><article className="panel report-card"><div className="panel-heading"><div><h3>Execution health</h3><p>Current state of your operations</p></div></div><div className="health-list"><div><span>Completed tasks</span><strong>{completedTasks} / {data.tasks.length}</strong></div><div><span>Active workflows</span><strong>{activeWorkflows} / {data.workflows.length}</strong></div><div><span>Connected companies</span><strong>{data.companies.length}</strong></div><div><span>Pipeline coverage</span><strong>{data.leads.length ? "Healthy" : "Waiting"}</strong></div></div></article></div></section>;
}

function SettingsPage() {
  return <section className="settings-page"><article className="panel settings-card"><div className="settings-title"><span className="workflow-symbol"><Settings2 size={19} /></span><div><h3>Workspace settings</h3><p>Configure the local connection used by this dashboard.</p></div></div><label>API base URL<input value={import.meta.env.VITE_API_URL ?? "http://localhost:5000/api"} readOnly /></label><label>Workspace name<input value="Acme workspace" readOnly /></label><div className="settings-status"><CheckCircle2 size={17} /><span><strong>API connection enabled</strong><small>Authenticated requests use your saved session token.</small></span></div></article></section>;
}

type ResourceName = "Leads" | "Tasks" | "Workflows" | "Companies" | "Users" | "Roles";
type ResourceViewProps = { resource: string; token: string; data: DashboardData; onChanged: () => void; onError: (message: string) => void };

function ResourceView({ resource, token, data, onChanged, onError }: ResourceViewProps) {
  const [records, setRecords] = useState<Array<Record<string, unknown>>>([]);
  const [form, setForm] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<number | undefined>();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const resourceName = resource as ResourceName;
  const isExternalResource = resourceName === "Users" || resourceName === "Roles";

  const loadRecords = async () => {
    if (!isExternalResource) return;
    try { const result = resourceName === "Users" ? await getUsers(token) : await getRoles(token); setRecords(result as unknown as Array<Record<string, unknown>>); }
    catch (requestError) { onError(requestError instanceof Error ? requestError.message : "Could not load records."); }
  };
  useEffect(() => { void loadRecords(); }, [resourceName, token]);

  const source = isExternalResource ? records : (({ Leads: data.leads, Tasks: data.tasks, Workflows: data.workflows, Companies: data.companies } as Record<string, unknown[]>)[resourceName] ?? []) as Array<Record<string, unknown>>;
  const fields: Record<ResourceName, Array<[string, string, boolean]>> = {
    Leads: [["full_name", "Full name", true], ["email", "Email", false], ["company_id", "Company ID", true], ["assigned_to", "Assigned user ID", false], ["source", "Source", false], ["status", "Status", false]],
    Tasks: [["title", "Title", true], ["description", "Description", false], ["lead_id", "Lead ID", true], ["assigned_to", "Assigned user ID", true], ["priority", "Priority (Low, Medium, High)", false], ["status", "Status", false], ["due_date", "Due date", false]],
    Workflows: [["name", "Name", true], ["company_id", "Company ID", true], ["trigger_event", "Trigger event", true], ["action_type", "Action type", true]],
    Companies: [["company_name", "Company name", true], ["email", "Email", true], ["industry", "Industry", false], ["phone", "Phone", false], ["website", "Website", false]],
    Users: [["name", "Name", true], ["email", "Email", true]],
    Roles: [["name", "Name", true], ["description", "Description", false]],
  };
  const titleFor = (record: Record<string, unknown>) => String(record.full_name ?? record.fullname ?? record.title ?? record.name ?? record.company_name ?? "Untitled");
  const subtitleFor = (record: Record<string, unknown>) => String(record.email ?? record.status ?? record.description ?? record.industry ?? "");
  const openCreate = () => { setEditingId(undefined); setForm({}); setShowForm(true); onError(""); };
  const openEdit = (record: Record<string, unknown>) => { setEditingId(Number(record.id)); setForm(Object.fromEntries(fields[resourceName].map(([key]) => [key, String(record[key] ?? "")] ))); setShowForm(true); onError(""); };
  const remove = async (id: number) => { if (!window.confirm("Delete this record?")) return; setLoading(true); try { const removeCall = { Leads: deleteLead, Tasks: deleteTask, Workflows: deleteWorkflow, Companies: deleteCompany, Users: deleteUser, Roles: deleteRole }[resourceName]; await removeCall(id, token); await loadRecords(); onChanged(); } catch (requestError) { onError(requestError instanceof Error ? requestError.message : "Delete failed."); } finally { setLoading(false); } };
  const save = async (event: React.FormEvent) => {
    event.preventDefault(); setLoading(true); onError("");
    const payload = Object.fromEntries(Object.entries(form).filter(([, value]) => value !== "").map(([key, value]) => [key, ["company_id", "assigned_to", "lead_id"].includes(key) ? Number(value) : value]));
    try {
      if (editingId) {
        const updateCall = { Leads: updateLead, Tasks: updateTask, Workflows: updateWorkflow, Companies: updateCompany, Users: updateUser, Roles: updateRole }[resourceName];
        await updateCall(editingId, payload, token);
      } else {
        if (resourceName === "Users") throw new Error("Users are created through registration.");
        if (resourceName === "Leads") await createLead(payload, token);
        if (resourceName === "Tasks") await createTask(payload, token);
        if (resourceName === "Workflows") await createWorkflow(payload, token);
        if (resourceName === "Companies") await createCompany(payload, token);
        if (resourceName === "Roles") await createRole(payload, token);
      }
      setShowForm(false); await loadRecords(); onChanged();
    } catch (requestError) { onError(requestError instanceof Error ? requestError.message : "Save failed."); } finally { setLoading(false); }
  };

  return <section className="resource-manager"><div className="resource-toolbar"><div><span className="resource-count">{source.length} records</span><span className="resource-hint">Changes sync directly with the backend.</span></div><button className="submit-button resource-add" onClick={openCreate}>+ Add {resourceName.slice(0, -1)}</button></div>
    {showForm && <form className="resource-form panel" onSubmit={save}><div className="form-heading"><div><h3>{editingId ? `Edit ${resourceName.slice(0, -1)}` : `Add ${resourceName.slice(0, -1)}`}</h3><p>Use the backend field contract for this record.</p></div><button type="button" className="icon-button" onClick={() => setShowForm(false)}><X size={18} /></button></div><div className="form-grid">{fields[resourceName].map(([key, label, required]) => <label key={key}>{label}<input required={required} type={key === "email" ? "email" : key.includes("id") ? "number" : key === "due_date" ? "date" : "text"} value={form[key] ?? ""} onChange={(event) => setForm({ ...form, [key]: event.target.value })} /></label>)}</div><div className="form-actions"><button type="button" className="refresh-button" onClick={() => setShowForm(false)}>Cancel</button><button className="submit-button resource-save" disabled={loading}>{loading ? "Saving..." : editingId ? "Save changes" : "Create record"}</button></div></form>}
    <div className="resource-list panel">{source.length ? source.map((record, index) => <div className="resource-row" key={String(record.id ?? index)}><div className="resource-initial">{titleFor(record).slice(0, 2).toUpperCase()}</div><div className="resource-details"><strong>{titleFor(record)}</strong><small>{subtitleFor(record)}</small></div><span className="resource-id">#{String(record.id ?? index + 1)}</span><button className="row-action" onClick={() => openEdit(record)}>Edit</button>{record.id !== undefined && <button className="row-action danger" onClick={() => void remove(Number(record.id))}>Delete</button>}</div>) : <EmptyState label={`No ${resourceName.toLowerCase()} found`} />}</div>
  </section>;
}

function Login({ onLogin }: { onLogin: (token: string) => void }) {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const submit = async (event: React.FormEvent) => { event.preventDefault(); setLoading(true); setError(""); try { const result = await login(email, password); onLogin(result.token); } catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Unable to sign in."); } finally { setLoading(false); } };
  return <main className="login-page"><div className="login-art"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><span className="login-mark"><Sparkles size={24} /></span><div className="art-copy"><p className="eyebrow">Business automation platform</p><h1>More momentum.<br /><em>Less busywork.</em></h1><p>Bring leads, people, and processes into one calm, clear workspace.</p></div><div className="quote-card"><span>“</span><p>Flowdesk gives our team the clarity to focus on the conversations that matter.</p><small>— Maya Chen, Head of Growth</small></div></div><div className="login-form-wrap"><div className="login-form"><div className="mobile-brand"><span className="brand-mark"><Sparkles size={17} /></span> Flowdesk</div><p className="eyebrow">Welcome back</p><h2>Sign in to your workspace</h2><p className="login-subtext">Enter your details to continue to Flowdesk.</p><form onSubmit={submit}><label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" required /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required /></label>{error && <div className="form-error"><CircleAlert size={16} /> {error}</div>}<button className="submit-button" disabled={loading}>{loading ? "Signing in..." : "Continue"}<ArrowUpRight size={17} /></button></form><p className="login-footnote">Secure access powered by your Flowdesk account.</p></div></div></main>;
}

export default App;