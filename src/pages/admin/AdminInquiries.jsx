import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal } from "lucide-react"
import { Link } from "react-router-dom"
import {
  fetchInquiries,
  formatDate,
  inquiryServices,
  inquiryStatuses,
} from "../../admin/adminApi"
import StatusBadge from "../../components/admin/StatusBadge"

const pageSize = 10

export default function AdminInquiries({
  heading = "All inquiries",
  description = "Search and manage every contact form submission.",
  defaultStatus = "",
}) {
  const [status, setStatus] = useState(defaultStatus)
  const [service, setService] = useState("")
  const [sort, setSort] = useState("newest")
  const [searchText, setSearchText] = useState("")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [inquiries, setInquiries] = useState([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSearch(searchText)
      setPage(1)
    }, 250)
    return () => window.clearTimeout(timeout)
  }, [searchText])

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const result = await fetchInquiries({ status, service, search, sort, page, pageSize })
        if (active) {
          setInquiries(result.inquiries)
          setTotal(result.total)
          setError("")
        }
      } catch (loadError) {
        if (active) setError(loadError.message || "Unable to load inquiries.")
      } finally {
        if (active) setIsLoading(false)
      }
    }

    void load()
    const interval = window.setInterval(() => void load(), 30000)
    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [status, service, search, sort, page])

  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const firstItem = total === 0 ? 0 : (page - 1) * pageSize + 1
  const lastItem = Math.min(page * pageSize, total)

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-400">{description}</p>
        <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {heading}
        </h2>
      </div>

      <section className="rounded-2xl border border-white/8 bg-slate-900/55">
        <div className="border-b border-white/8 p-4 sm:p-5">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <label className="relative block w-full xl:max-w-sm">
              <span className="sr-only">Search name, email or company</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
              <input
                type="search"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search name, email or company"
                className="w-full rounded-xl border border-white/10 bg-[#080d18]/80 py-2.5 pl-10 pr-3 text-xs text-white outline-none placeholder:text-slate-600 focus:border-blue-400/50"
              />
            </label>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <label className="relative">
                <span className="sr-only">Filter by service</span>
                <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-500" />
                <select
                  value={service}
                  onChange={(event) => {
                    setService(event.target.value)
                    setPage(1)
                  }}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-[#080d18]/80 py-2.5 pl-9 pr-8 text-xs text-slate-300 outline-none focus:border-blue-400/50"
                >
                  <option value="">All services</option>
                  {inquiryServices.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="sr-only">Filter by status</span>
                <select
                  value={status}
                  onChange={(event) => {
                    setStatus(event.target.value)
                    setPage(1)
                  }}
                  className="w-full rounded-xl border border-white/10 bg-[#080d18]/80 px-3 py-2.5 text-xs text-slate-300 outline-none focus:border-blue-400/50"
                >
                  <option value="">All statuses</option>
                  {inquiryStatuses.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="sr-only">Sort inquiries</span>
                <select
                  value={sort}
                  onChange={(event) => {
                    setSort(event.target.value)
                    setPage(1)
                  }}
                  className="w-full rounded-xl border border-white/10 bg-[#080d18]/80 px-3 py-2.5 text-xs text-slate-300 outline-none focus:border-blue-400/50"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {error && (
          <div role="alert" className="m-4 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-200">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="space-y-3 p-5">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-14 animate-pulse rounded-lg bg-white/[0.03]" />
            ))}
          </div>
        ) : inquiries.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-blue-400/10 text-blue-300">
              <Search className="size-5" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-200">No inquiries found</h3>
            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">
              Try changing your search or filters. New submissions are checked automatically.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1180px] text-left">
              <thead className="border-b border-white/[0.06]">
                <tr className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                  <th className="px-5 py-3.5">Client</th>
                  <th className="px-4 py-3.5">Contact</th>
                  <th className="px-4 py-3.5">Company</th>
                  <th className="px-4 py-3.5">Service / Budget</th>
                  <th className="px-4 py-3.5">Project details</th>
                  <th className="px-4 py-3.5">Submitted</th>
                  <th className="px-5 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="align-top text-xs transition hover:bg-white/[0.025]">
                    <td className="px-5 py-4">
                      <Link
                        to={`/admin/inquiries/${inquiry.id}`}
                        className="font-semibold text-slate-200 hover:text-blue-300"
                      >
                        {inquiry.full_name}
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      <a className="block text-slate-300 hover:text-blue-300" href={`mailto:${inquiry.email}`}>
                        {inquiry.email}
                      </a>
                      <a
                        className="mt-1 block text-slate-500 hover:text-blue-300"
                        href={inquiry.phone ? `tel:${inquiry.phone}` : undefined}
                      >
                        {inquiry.phone || "No phone"}
                      </a>
                    </td>
                    <td className="px-4 py-4 text-slate-400">{inquiry.company_name || "—"}</td>
                    <td className="px-4 py-4">
                      <p className="text-slate-300">{inquiry.service_required}</p>
                      <p className="mt-1 text-slate-500">{inquiry.project_budget || "Budget not set"}</p>
                    </td>
                    <td className="max-w-[250px] px-4 py-4 text-slate-400">
                      <p className="line-clamp-2 leading-5">{inquiry.project_details}</p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                      {formatDate(inquiry.created_at)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={inquiry.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && (
          <div className="flex flex-col gap-3 border-t border-white/8 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-xs text-slate-500">
              Showing {firstItem}–{lastItem} of {total} inquiries
            </p>
            <div className="flex items-center justify-between gap-2 sm:justify-end">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page <= 1}
                className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="size-3.5" />
                Previous
              </button>
              <span className="px-2 text-xs tabular-nums text-slate-500">
                Page {page} of {pageCount}
              </span>
              <button
                type="button"
                onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                disabled={page >= pageCount}
                className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
