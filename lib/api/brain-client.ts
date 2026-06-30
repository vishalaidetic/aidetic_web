/**
 * Brain API Client
 * Typed client for the FastAPI backend (Brain API).
 * Base URL is set via BRAIN_API_URL env var (server-side only).
 * On the client side, calls go through the Next.js proxy at /api/brain/...
 */

const BRAIN_BASE = process.env.BRAIN_API_URL ?? 'http://localhost:8000'

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

interface BrainResponse<T> {
  data: T | null
  message: string
  status: number
  error?: string
  total?: number
}

// ─── Schema Types (mirrored from Python) ──────────────────────────────────────

export interface Employee {
  id: string
  user_code?: string
  first_name?: string
  last_name?: string
  email?: string
  contact_number?: string
  department_id?: string
  designation_id?: string
  manager_id?: string
  status?: string
  created_at?: string
}

export interface EmployeeCreate {
  user_code?: string
  first_name?: string
  last_name?: string
  email?: string
  contact_number?: string
  department_id?: string
  designation_id?: string
  manager_id?: string
  status?: string
}

export interface Department {
  id: string
  name?: string
  description?: string
  status?: string
  created_at?: string
}

export interface DepartmentCreate {
  name?: string
  description?: string
  status?: string
}

export interface Designation {
  id: string
  name?: string
  description?: string
  grade?: string
  pay_band?: string
  status?: string
  created_at?: string
}

export interface DesignationCreate {
  name?: string
  description?: string
  grade?: string
  pay_band?: string
  status?: string
}

export interface SoftwareTool {
  id: string
  name?: string
  category?: string
  license_type?: string
  monthly_cost?: number
  status?: string
  created_at?: string
}

export interface SoftwareToolCreate {
  name?: string
  category?: string
  license_type?: string
  monthly_cost?: number
  status?: string
}

export interface Project {
  id: string
  name?: string
  project_type?: string
  department_id?: string
  owner_employee_id?: string
  budget_allocated?: number
  status?: string
  start_date?: string
  end_date?: string
  created_at?: string
}

export interface ProjectCreate {
  name?: string
  project_type?: string
  department_id?: string
  owner_employee_id?: string
  budget_allocated?: number
  status?: string
  start_date?: string
  end_date?: string
}

export interface Assignment {
  id: string
  employee_id: string
  project_id: string
  role?: string
  allocation_percent?: number
  billing_rate?: number
  start_date?: string
  end_date?: string
  contribution_type?: string
  created_at?: string
}

export interface AssignmentCreate {
  employee_id: string
  project_id: string
  role?: string
  allocation_percent?: number
  billing_rate?: number
  start_date?: string
  end_date?: string
  contribution_type?: string
}

export interface Vendor {
  id: string
  name?: string
  service_type?: string
  created_at?: string
}

export interface VendorCreate {
  name?: string
  service_type?: string
}

export interface ProjectCost {
  id: string
  project_id: string
  vendor_id: string
  amount: number
  cost_type?: string
  expense_date?: string
  created_at?: string
}

export interface ProjectCostCreate {
  project_id: string
  vendor_id: string
  amount: number
  cost_type?: string
  expense_date?: string
}

export interface Client {
  id: string
  company_name?: string
  industry?: string
  created_at?: string
}

export interface ClientCreate {
  name?: string
  email?: string
  contact_person?: string
  contact_number?: string
  billing_address?: string
  status?: string
}

export interface Invoice {
  id: string
  client_id?: string
  project_id?: string
  amount: number
  due_date?: string
  created_at?: string
}

export interface InvoiceCreate {
  client_id: string
  project_id?: string
  invoice_number?: string
  amount: number
  status?: string
  due_date?: string
  issued_date?: string
}

export interface Revenue {
  id: string
  project_id?: string
  client_id?: string
  invoice_id?: string
  revenue_amount: number
  recognized_date?: string
  created_at?: string
}

export interface RevenueCreate {
  project_id: string
  amount: number
  revenue_date?: string
  notes?: string
}

export interface Reimbursement {
  id: string
  employee_id: string
  expense_id: string
  claim_amount: number
  status?: string
  description?: string
  created_at?: string
}

export interface ReimbursementCreate {
  employee_id: string
  amount: number
  category?: string
  description?: string
  status?: string
  submitted_date?: string
}

// ─── Core fetcher ─────────────────────────────────────────────────────────────

async function brainFetch<T>(
  path: string,
  method: HttpMethod = 'GET',
  body?: unknown,
  token?: string
): Promise<BrainResponse<T>> {
  const url = `${BRAIN_BASE}/api/v1${path}`
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  // Attach X-Token cookie if running in server environment
  if (typeof window === 'undefined') {
    try {
      const { cookies } = await import('next/headers')
      const cookieStore = await cookies()
      const xToken = cookieStore.get('x_token')?.value
      if (xToken) headers['X-Token'] = xToken
    } catch {
      // Ignored
    }
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  })

  if (!res.ok) {
    const err = await res.text()
    return { data: null, message: 'Request failed', status: res.status, error: err }
  }

  return res.json() as Promise<BrainResponse<T>>
}

// ─── Employees ────────────────────────────────────────────────────────────────

export const employeeApi = {
  list: (skip = 0, limit = 100, token?: string) => brainFetch<Employee[]>(`/employees/?skip=${skip}&limit=${limit}`, 'GET', undefined, token),
  get: (id: string, token?: string) => brainFetch<Employee>(`/employees/${id}`, 'GET', undefined, token),
  create: (data: EmployeeCreate, token?: string) => brainFetch<Employee>('/employees/', 'POST', data, token),
  update: (id: string, data: Partial<EmployeeCreate>, token?: string) => brainFetch<Employee>(`/employees/${id}`, 'PATCH', data, token),
  delete: (id: string, token?: string) => brainFetch<null>(`/employees/${id}`, 'DELETE', undefined, token),
}

// ─── Departments ──────────────────────────────────────────────────────────────

export const departmentApi = {
  list: (skip = 0, limit = 100, token?: string) => brainFetch<Department[]>(`/departments/?skip=${skip}&limit=${limit}`, 'GET', undefined, token),
  get: (id: string, token?: string) => brainFetch<Department>(`/departments/${id}`, 'GET', undefined, token),
  create: (data: DepartmentCreate, token?: string) => brainFetch<Department>('/departments/', 'POST', data, token),
  update: (id: string, data: Partial<DepartmentCreate>, token?: string) => brainFetch<Department>(`/departments/${id}`, 'PATCH', data, token),
  delete: (id: string, token?: string) => brainFetch<null>(`/departments/${id}`, 'DELETE', undefined, token),
}

// ─── Designations ─────────────────────────────────────────────────────────────

export const designationApi = {
  list: (skip = 0, limit = 100, token?: string) => brainFetch<Designation[]>(`/designations/?skip=${skip}&limit=${limit}`, 'GET', undefined, token),
  get: (id: string, token?: string) => brainFetch<Designation>(`/designations/${id}`, 'GET', undefined, token),
  create: (data: DesignationCreate, token?: string) => brainFetch<Designation>('/designations/', 'POST', data, token),
  update: (id: string, data: Partial<DesignationCreate>, token?: string) => brainFetch<Designation>(`/designations/${id}`, 'PATCH', data, token),
  delete: (id: string, token?: string) => brainFetch<null>(`/designations/${id}`, 'DELETE', undefined, token),
}

// ─── Software Tools ───────────────────────────────────────────────────────────

export const softwareToolApi = {
  list: (skip = 0, limit = 100, token?: string) => brainFetch<SoftwareTool[]>(`/software-tools/?skip=${skip}&limit=${limit}`, 'GET', undefined, token),
  get: (id: string, token?: string) => brainFetch<SoftwareTool>(`/software-tools/${id}`, 'GET', undefined, token),
  create: (data: SoftwareToolCreate, token?: string) => brainFetch<SoftwareTool>('/software-tools/', 'POST', data, token),
  update: (id: string, data: Partial<SoftwareToolCreate>, token?: string) => brainFetch<SoftwareTool>(`/software-tools/${id}`, 'PATCH', data, token),
  delete: (id: string, token?: string) => brainFetch<null>(`/software-tools/${id}`, 'DELETE', undefined, token),
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projectApi = {
  list: (skip = 0, limit = 100, token?: string) => brainFetch<Project[]>(`/projects/?skip=${skip}&limit=${limit}`, 'GET', undefined, token),
  get: (id: string, token?: string) => brainFetch<Project>(`/projects/${id}`, 'GET', undefined, token),
  create: (data: ProjectCreate, token?: string) => brainFetch<Project>('/projects/', 'POST', data, token),
  update: (id: string, data: Partial<ProjectCreate>, token?: string) => brainFetch<Project>(`/projects/${id}`, 'PATCH', data, token),
  delete: (id: string, token?: string) => brainFetch<null>(`/projects/${id}`, 'DELETE', undefined, token),
}

// ─── Assignments ──────────────────────────────────────────────────────────────

export const assignmentApi = {
  list: (skip = 0, limit = 100, token?: string) => brainFetch<Assignment[]>(`/assignments/?skip=${skip}&limit=${limit}`, 'GET', undefined, token),
  get: (id: string, token?: string) => brainFetch<Assignment>(`/assignments/${id}`, 'GET', undefined, token),
  byEmployee: (empId: string, token?: string) => brainFetch<Assignment[]>(`/assignments/employee/${empId}`, 'GET', undefined, token),
  create: (data: AssignmentCreate, token?: string) => brainFetch<Assignment>('/assignments/', 'POST', data, token),
  update: (id: string, data: Partial<AssignmentCreate>, token?: string) => brainFetch<Assignment>(`/assignments/${id}`, 'PATCH', data, token),
  delete: (id: string, token?: string) => brainFetch<null>(`/assignments/${id}`, 'DELETE', undefined, token),
}

// ─── Vendors ──────────────────────────────────────────────────────────────────

export const vendorApi = {
  list: (skip = 0, limit = 100, token?: string) => brainFetch<Vendor[]>(`/vendors/?skip=${skip}&limit=${limit}`, 'GET', undefined, token),
  get: (id: string, token?: string) => brainFetch<Vendor>(`/vendors/${id}`, 'GET', undefined, token),
  create: (data: VendorCreate, token?: string) => brainFetch<Vendor>('/vendors/', 'POST', data, token),
  update: (id: string, data: Partial<VendorCreate>, token?: string) => brainFetch<Vendor>(`/vendors/${id}`, 'PATCH', data, token),
  delete: (id: string, token?: string) => brainFetch<null>(`/vendors/${id}`, 'DELETE', undefined, token),
}

// ─── Costs ────────────────────────────────────────────────────────────────────

export const costApi = {
  list: (skip = 0, limit = 100, token?: string) => brainFetch<ProjectCost[]>(`/costs/?skip=${skip}&limit=${limit}`, 'GET', undefined, token),
  create: (data: ProjectCostCreate, token?: string) => brainFetch<ProjectCost>('/costs/', 'POST', data, token),
  delete: (id: string, token?: string) => brainFetch<null>(`/costs/${id}`, 'DELETE', undefined, token),
}

// ─── Clients ──────────────────────────────────────────────────────────────────

export const clientApi = {
  list: (skip = 0, limit = 100, token?: string) => brainFetch<Client[]>(`/clients/?skip=${skip}&limit=${limit}`, 'GET', undefined, token),
  get: (id: string, token?: string) => brainFetch<Client>(`/clients/${id}`, 'GET', undefined, token),
  create: (data: ClientCreate, token?: string) => brainFetch<Client>('/clients/', 'POST', data, token),
  update: (id: string, data: Partial<ClientCreate>, token?: string) => brainFetch<Client>(`/clients/${id}`, 'PATCH', data, token),
  delete: (id: string, token?: string) => brainFetch<null>(`/clients/${id}`, 'DELETE', undefined, token),
}

// ─── Invoices ─────────────────────────────────────────────────────────────────

export const invoiceApi = {
  list: (skip = 0, limit = 100, token?: string) => brainFetch<Invoice[]>(`/invoices/?skip=${skip}&limit=${limit}`, 'GET', undefined, token),
  create: (data: InvoiceCreate, token?: string) => brainFetch<Invoice>('/invoices/', 'POST', data, token),
  delete: (id: string, token?: string) => brainFetch<null>(`/invoices/${id}`, 'DELETE', undefined, token),
}

// ─── Revenues ─────────────────────────────────────────────────────────────────

export const revenueApi = {
  list: (skip = 0, limit = 100, token?: string) => brainFetch<Revenue[]>(`/revenues/?skip=${skip}&limit=${limit}`, 'GET', undefined, token),
  create: (data: RevenueCreate, token?: string) => brainFetch<Revenue>('/revenues/', 'POST', data, token),
  delete: (id: string, token?: string) => brainFetch<null>(`/revenues/${id}`, 'DELETE', undefined, token),
}

// ─── Reimbursements ───────────────────────────────────────────────────────────

export const reimbursementApi = {
  list: (skip = 0, limit = 100, token?: string) => brainFetch<Reimbursement[]>(`/reimbursements/?skip=${skip}&limit=${limit}`, 'GET', undefined, token),
  get: (id: string, token?: string) => brainFetch<Reimbursement>(`/reimbursements/${id}`, 'GET', undefined, token),
  byEmployee: (empId: string, token?: string) => brainFetch<Reimbursement[]>(`/reimbursements/employee/${empId}`, 'GET', undefined, token),
  create: (data: ReimbursementCreate, token?: string) => brainFetch<Reimbursement>('/reimbursements/', 'POST', data, token),
  update: (id: string, data: Partial<ReimbursementCreate>, token?: string) => brainFetch<Reimbursement>(`/reimbursements/${id}`, 'PATCH', data, token),
  delete: (id: string, token?: string) => brainFetch<null>(`/reimbursements/${id}`, 'DELETE', undefined, token),
}

// ─── Graph Data (Neo4j) ───────────────────────────────────────────────────────

export interface GraphNode {
  id: string
  label: string
  properties: Record<string, unknown>
  val?: number
}

export interface GraphLink {
  source: string
  target: string
  type: string
  properties: Record<string, unknown>
}

export interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

export const graphApi = {
  getData: (token?: string) => brainFetch<GraphData>('/analytics/graph-data', 'GET', undefined, token),
}

// ─── Analytics / Rules ───────────────────────────────────────────────────────

export interface AttributionGet {
  id: string
  employee_id: string
  project_id: string
  attributed_revenue: number
  roi_percentage: number
  utilization_percentage: number
  calculated_at: string
}

export const attributionApi = {
  list: (skip = 0, limit = 100, token?: string) => brainFetch<AttributionGet[]>(`/analytics/attribution/?skip=${skip}&limit=${limit}`, 'GET', undefined, token),
}

export interface BusinessRule {
  rule_id: string
  rule_name: string
  entity_type: string
  condition: Record<string, unknown>
  action: Record<string, unknown>
  priority: number
  enabled: boolean
}

export interface BusinessRuleCreate {
  rule_name: string
  entity_type: string
  condition: Record<string, unknown>
  action: Record<string, unknown>
  priority?: number
  enabled?: boolean
}

export interface EvaluationRequest {
  entity_type: string
  employee_id?: string
  project_id?: string
  department_id?: string
  is_organization?: boolean
}

export interface EvaluationResponse {
  result: unknown
  details: Record<string, unknown>
  triggered_rules: string[]
}

export const analyticsApi = {
  listRules: (token?: string) => brainFetch<BusinessRule[]>('/analytics/rules', 'GET', undefined, token),
  createRule: (data: BusinessRuleCreate, token?: string) => brainFetch<BusinessRule>('/analytics/rules', 'POST', data, token),
  evaluate: (data: EvaluationRequest, token?: string) => brainFetch<EvaluationResponse>('/analytics/evaluate', 'POST', data, token),
}

// ─── Copilot (REST query, WebSocket handled client-side) ─────────────────────

export interface CopilotQuery {
  query: string
  history?: Array<{ role: string; content: string }>
}

export interface CopilotResponse {
  query: string
  sql_generated: string
  response: string
  context_used: string[]
}

export const copilotApi = {
  query: (data: CopilotQuery, token?: string) => brainFetch<CopilotResponse>('/copilot/query', 'POST', data, token),
  /** Returns the WebSocket URL for streaming copilot responses */
  wsUrl: (): string => {
    const base = (process.env.NEXT_PUBLIC_BRAIN_WS_URL ?? 'ws://localhost:8000')
    return `${base}/api/v1/copilot/ws/query`
  },
}
