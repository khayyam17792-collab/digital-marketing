import { useEffect, useState } from "react"
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Check,
  Copy,
  Mail,
  Phone,
  Trash2,
} from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  deleteInquiry,
  fetchInquiry,
  formatDate,
  inquiryStatuses,
  updateInquiry,
} from "../../admin/adminApi"
import StatusBadge from "../../components/admin/StatusBadge"

function DetailField({ label, children }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</dt>
      <dd className="mt-2 break-words text-sm leading-6 text-slate-200">{children || "—"}</dd>
    </div>
  )
}

export default function AdminInquiryDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [inquiry, setInquiry] = useState(null)
  const [status, setStatus] = useState("new")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const result = await fetchInquiry(id)
        if (active) {
          setInquiry(result)
          setStatus(result.status)
          setNotes(result.admin_notes ?? "")
        }
      } catch (loadError) {
        if (active) setError(loadError.message || "Unable to load this inquiry.")
      } finally {
        if (active) setIsLoading(false)
      }
    }

    void load()
    return () => {
      active = false
    }
  }, [id])

  const handleSave = async (event) => {
    event.preventDefault()
    if (isSaving) return

    setError("")
    setNotice("")
    setIsSaving(true)
    try {
      const updated = await updateInquiry(id, { status, adminNotes: notes })
      setInquiry(updated)
      setNotice("Inquiry changes saved.")
    } catch (saveError) {
      setError(saveError.message || "Unable to save these changes.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCopy = async (value, label) => {
    if (!value) return
    setError("")
    setNotice("")
    try {
      await navigator.clipboard.writeText(value)
      setNotice(`${label} copied to clipboard.`)
    } catch (copyError) {
      setError(copyError.message || `Unable to copy ${label.toLowerCase()}.`)
    }
  }

  const handleDelete = async () => {
    if (
      !inquiry ||
      isDeleting ||
      !window.confirm(`Permanently delete the inquiry from ${inquiry.full_name}?`)
    ) {
      return
    }

    setError("")
    setIsDeleting(true)
    try {
      await deleteInquiry(id)
      navigate("/admin/inquiries", {
        replace: true,
        state: { message: "Inquiry deleted." },
      })
    } catch (deleteError) {
      setError(deleteError.message || "Unable to delete this inquiry.")
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-40 animate-pulse rounded-lg bg-white/10" />
        <div className="h-72 animate-pulse rounded-2xl bg-slate-900/70" />
      </div>
    )
  }

  if (!inquiry) {
    return (
      <section className="rounded-2xl border border-white/8 bg-slate-900/55 p-6">
        <p role="alert" className="text-sm text-red-200">
          {error || "Inquiry not found."}
        </p>
        <Link
          to="/admin/inquiries"
          className="mt-5 inline-flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200"
        >
          <ArrowLeft className="size-4" /> Back to inquiries
        </Link>
      </section>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <Link
        to="/admin/inquiries"
        className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Back to inquiries
      </Link>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {inquiry.full_name}
            </h2>
            <StatusBadge status={status} />
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Inquiry received {formatDate(inquiry.created_at)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={`mailto:${inquiry.email}`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-3.5 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-400"
          >
            <Mail className="size-3.5" /> Email client
          </a>
          {inquiry.phone && (
            <a
              href={`tel:${inquiry.phone}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3.5 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/5"
            >
              <Phone className="size-3.5" /> Call client
            </a>
          )}
        </div>
      </div>

      {(error || notice) && (
        <div
          role={error ? "alert" : "status"}
          className={`rounded-xl border px-4 py-3 text-sm ${
            error
              ? "border-red-400/20 bg-red-400/5 text-red-200"
              : "border-emerald-400/20 bg-emerald-400/5 text-emerald-200"
          }`}
        >
          {error || notice}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-5">
          <section className="rounded-2xl border border-white/8 bg-slate-900/55 p-5 sm:p-6">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
                <Building2 className="size-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white">Client information</h3>
                <p className="mt-1 text-xs text-slate-500">Contact details and project request</p>
              </div>
            </div>
            <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <DetailField label="Full name">{inquiry.full_name}</DetailField>
              <DetailField label="Company">{inquiry.company_name}</DetailField>
              <DetailField label="Email">
                <a className="text-blue-300 hover:text-blue-200" href={`mailto:${inquiry.email}`}>
                  {inquiry.email}
                </a>
              </DetailField>
              <DetailField label="Phone">
                {inquiry.phone ? (
                  <a className="text-blue-300 hover:text-blue-200" href={`tel:${inquiry.phone}`}>
                    {inquiry.phone}
                  </a>
                ) : (
                  "—"
                )}
              </DetailField>
              <DetailField label="Service required">{inquiry.service_required}</DetailField>
              <DetailField label="Project budget">{inquiry.project_budget}</DetailField>
              <DetailField label="Submitted">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="size-4 text-slate-500" />
                  {formatDate(inquiry.created_at)}
                </span>
              </DetailField>
              <DetailField label="Last updated">{formatDate(inquiry.updated_at)}</DetailField>
            </dl>

            <div className="mt-7 border-t border-white/8 pt-6">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Project details
              </h4>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                {inquiry.project_details}
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-white/8 bg-slate-900/55 p-5 sm:p-6">
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-white">Private admin notes</h3>
              <p className="mt-1 text-xs text-slate-500">
                Only authorized ZENTRO administrators can view these notes.
              </p>
            </div>
            <label htmlFor="admin-notes" className="sr-only">
              Private admin notes
            </label>
            <textarea
              id="admin-notes"
              rows={6}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Add internal context, follow-up details, or next steps…"
              className="w-full resize-y rounded-xl border border-white/10 bg-[#080d18]/80 px-4 py-3 text-sm leading-6 text-slate-200 outline-none placeholder:text-slate-600 focus:border-blue-400/50"
            />
            <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
              <label className="block">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Inquiry status
                </span>
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="min-w-44 rounded-xl border border-white/10 bg-[#080d18] px-3 py-2.5 text-xs text-slate-200 outline-none focus:border-blue-400/50"
                >
                  {inquiryStatuses.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-xl bg-blue-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-white/8 bg-slate-900/55 p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-white">Quick actions</h3>
            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={() => void handleCopy(inquiry.email, "Email address")}
                className="flex w-full items-center justify-between rounded-xl border border-white/8 px-3.5 py-3 text-left text-xs text-slate-300 transition hover:bg-white/[0.04]"
              >
                <span className="flex items-center gap-2.5">
                  <Mail className="size-4 text-slate-500" /> Copy email address
                </span>
                <Copy className="size-3.5 text-slate-500" />
              </button>
              <button
                type="button"
                onClick={() => void handleCopy(inquiry.phone, "Phone number")}
                disabled={!inquiry.phone}
                className="flex w-full items-center justify-between rounded-xl border border-white/8 px-3.5 py-3 text-left text-xs text-slate-300 transition hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="flex items-center gap-2.5">
                  <Phone className="size-4 text-slate-500" /> Copy phone number
                </span>
                {notice.startsWith("Phone number") ? (
                  <Check className="size-3.5 text-emerald-300" />
                ) : (
                  <Copy className="size-3.5 text-slate-500" />
                )}
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-red-400/15 bg-red-400/[0.035] p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-slate-200">Delete inquiry</h3>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              This permanently removes the inquiry. This action cannot be undone.
            </p>
            <button
              type="button"
              onClick={() => void handleDelete()}
              disabled={isDeleting}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-red-400/20 px-3.5 py-2.5 text-xs font-semibold text-red-200 transition hover:bg-red-400/10 disabled:opacity-50"
            >
              <Trash2 className="size-3.5" />
              {isDeleting ? "Deleting…" : "Delete inquiry"}
            </button>
          </section>
        </aside>
      </div>
    </div>
  )
}
