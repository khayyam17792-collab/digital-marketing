import { supabase } from "../lib/supabase"

export const inquiryStatuses = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "in_discussion", label: "In Discussion" },
  { value: "converted", label: "Converted" },
  { value: "rejected", label: "Rejected" },
]

export const inquiryServices = [
  "Digital Marketing",
  "Social Media Marketing",
  "SEO",
  "Website Design & Development",
  "Google Ads",
  "Facebook & Instagram Ads",
  "Branding & Creative Design",
  "Content Creation",
  "Other",
]

export function getStatusLabel(status) {
  return inquiryStatuses.find((item) => item.value === status)?.label ?? status
}

export function formatDate(value, options = {}) {
  if (!value) return "—"
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
    ...options,
  }).format(new Date(value))
}

const inquiryFields =
  "id,created_at,updated_at,full_name,email,phone,company_name,service_required,project_budget,project_details,status,admin_notes"

function getClient() {
  if (!supabase) {
    throw new Error("Supabase is not configured for this deployment.")
  }

  return supabase
}

export async function verifyAdmin() {
  const { data, error } = await getClient().rpc("is_zentro_admin")
  if (error) throw error
  return data === true
}

export async function fetchDashboardStats() {
  const { data, error } = await getClient().rpc("get_zentro_inquiry_stats")
  if (error) throw error

  const stats = Array.isArray(data) ? data[0] : data
  if (!stats) {
    throw new Error("Dashboard statistics were not returned by Supabase.")
  }

  return stats
}

export async function fetchInquiries({
  status = "",
  service = "",
  search = "",
  sort = "newest",
  page = 1,
  pageSize = 10,
} = {}) {
  const client = getClient()
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  let query = client
    .from("inquiries")
    .select(inquiryFields, { count: "exact" })

  if (status) query = query.eq("status", status)
  if (service) query = query.eq("service_required", service)

  const safeSearch = search.replace(/[,%*()\\]/g, " ").trim()
  if (safeSearch) {
    query = query.or(
      `full_name.ilike.%${safeSearch}%,email.ilike.%${safeSearch}%,company_name.ilike.%${safeSearch}%`
    )
  }

  const { data, error, count } = await query
    .order("created_at", { ascending: sort === "oldest" })
    .range(from, to)

  if (error) throw error
  return { inquiries: data ?? [], total: count ?? 0 }
}

export async function fetchInquiry(id) {
  const { data, error } = await getClient()
    .from("inquiries")
    .select(inquiryFields)
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}

export async function updateInquiry(id, updates) {
  const { data, error } = await getClient()
    .from("inquiries")
    .update({
      status: updates.status,
      admin_notes: updates.adminNotes,
    })
    .eq("id", id)
    .select(inquiryFields)
    .single()

  if (error) throw error
  return data
}

export async function deleteInquiry(id) {
  const { error } = await getClient().from("inquiries").delete().eq("id", id)
  if (error) throw error
}
