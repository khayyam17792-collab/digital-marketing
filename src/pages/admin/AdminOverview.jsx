import { useCallback, useEffect, useState } from "react"
import {
  ArrowUpRight,
  CircleCheck,
  Clock3,
  MessageSquareText,
  RefreshCw,
  Target,
  Users,
} from "lucide-react"
import { Link } from "react-router-dom"
import { fetchDashboardStats, fetchInquiries, formatDate } from "../../admin/adminApi"
import StatusBadge from "../../components/admin/StatusBadge"

const summaryCards = [
  { key: "total_inquiries", label: "Total inquiries", icon: MessageSquareText, tone: "blue" },
  { key: "new_inquiries", label: "New inquiries", icon: Clock3, tone: "cyan" },
  { key: "contacted_clients", label: "Contacted", icon: Users, tone: "violet" },
  { key: "in_discussion", label: "In discussion", icon: MessageSquareText, tone: "purple" },
  { key: "converted_clients", label: "Converted", icon: CircleCheck, tone: "green" },
  { key: "rejected_inquiries", label: "Rejected", icon: Target, tone: "rose" },
]

const toneStyles = {
  blue: "bg-blue-400/10 text-blue-300",
  cyan: "bg-cyan-400/10 text-cyan-300",
  violet: "bg-violet-400/10 text-violet-300",
  purple: "bg-purple-400/10 text-purple-300",
  green: "bg-emerald-400/10 text-emerald-300",
  rose: "bg-rose-400/10 text-rose-300",
}

function Panel({ children, className = "" }) {
  return (
    <section
      className={`rounded-2xl border border-white/8 bg-slate-900/55 p-5 sm:p-6 ${className}`}
    >
      {children}
    </section>
  )
}

export default function AdminOverview() {
  const [stats, setStats] = useState(null)
  const [recent, setRecent] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState("")

  const requestData = useCallback(async () => {
    const [nextStats, nextRecent] = await Promise.all([
      fetchDashboardStats(),
      fetchInquiries({ page: 1, pageSize: 5 }),
    ])
    return { stats: nextStats, recent: nextRecent.inquiries }
  }, [])

  const refresh = async () => {
    setIsRefreshing(true)
    try {
      const result = await requestData()
      setStats(result.stats)
      setRecent(result.recent)
      setError("")
    } catch (loadError) {
      setError(loadError.message || "Unable to load dashboard data.")
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const result = await requestData()
        if (active) {
          setStats(result.stats)
          setRecent(result.recent)
          setError("")
        }
      } catch (loadError) {
        if (active) setError(loadError.message || "Unable to load dashboard data.")
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
  }, [requestData])

  const monthly = stats?.monthly_inquiries ?? []
  const services = stats?.service_stats ?? []
  const maxMonthly = Math.max(1, ...monthly.map((item) => Number(item.count) || 0))
  const maxService = Math.max(1, ...services.map((item) => Number(item.count) || 0))

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-slate-400">Here’s what’s happening with your leads.</p>
          <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Inquiry overview
          </h2>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={isRefreshing}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-white/[0.07] disabled:opacity-50 sm:self-auto"
        >
          <RefreshCw className={`size-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh data
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-200 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>{error}</span>
          <button type="button" onClick={() => void refresh()} className="font-semibold underline">
            Retry
          </button>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {summaryCards.map(({ key, label, icon: Icon, tone }) => (
          <Panel key={key} className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-slate-400">{label}</p>
                <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-white">
                  {isLoading ? (
                    <span className="inline-block h-9 w-12 animate-pulse rounded-lg bg-white/10" />
                  ) : (
                    Number(stats?.[key] ?? 0).toLocaleString()
                  )}
                </p>
              </div>
              <span className={`flex size-10 items-center justify-center rounded-xl ${toneStyles[tone]}`}>
                <Icon className="size-[18px]" />
              </span>
            </div>
          </Panel>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <Panel>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-white">Monthly inquiries</h3>
              <p className="mt-1 text-xs text-slate-500">A 12-month view of incoming requests</p>
            </div>
            <span className="rounded-lg border border-white/8 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Last 12 months
            </span>
          </div>

          {isLoading ? (
            <div className="mt-8 h-48 animate-pulse rounded-xl bg-white/[0.03]" />
          ) : monthly.length === 0 ? (
            <div className="mt-8 flex h-48 items-center justify-center rounded-xl border border-dashed border-white/10 text-sm text-slate-500">
              No inquiry statistics yet.
            </div>
          ) : (
            <div
              className="mt-7 grid h-48 grid-cols-6 items-end gap-2 sm:grid-cols-12 sm:gap-3"
              aria-label="Monthly inquiries bar chart"
              role="img"
            >
              {monthly.map((item, index) => {
                const count = Number(item.count) || 0
                const height = count === 0 ? 3 : Math.max(10, (count / maxMonthly) * 100)
                return (
                  <div key={`${item.month}-${index}`} className="flex h-full flex-col items-center justify-end gap-2">
                    <span className="text-[10px] tabular-nums text-slate-500">{count || ""}</span>
                    <div className="flex h-[72%] w-full items-end rounded-t-md bg-white/[0.025]">
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-sky-400 transition-all"
                        style={{ height: `${height}%` }}
                        title={`${item.month}: ${count} inquiries`}
                      />
                    </div>
                    <span className="text-[9px] text-slate-500 sm:text-[10px]">{item.month}</span>
                  </div>
                )
              })}
            </div>
          )}
        </Panel>

        <Panel>
          <div>
            <h3 className="text-sm font-semibold text-white">Inquiries by service</h3>
            <p className="mt-1 text-xs text-slate-500">What prospective clients are requesting</p>
          </div>
          {isLoading ? (
            <div className="mt-6 space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-9 animate-pulse rounded-lg bg-white/[0.03]" />
              ))}
            </div>
          ) : services.length === 0 ? (
            <div className="mt-6 flex h-40 items-center justify-center rounded-xl border border-dashed border-white/10 text-sm text-slate-500">
              No service requests yet.
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {services.slice(0, 7).map((item) => (
                <div key={item.service}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-xs">
                    <span className="truncate text-slate-300">{item.service}</span>
                    <span className="shrink-0 tabular-nums text-slate-500">{item.count}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400"
                      style={{
                        width: `${Math.max(4, (Number(item.count) / maxService) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>
      </div>

      <Panel className="p-0">
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-4 sm:px-6">
          <div>
            <h3 className="text-sm font-semibold text-white">Recent inquiries</h3>
            <p className="mt-1 text-xs text-slate-500">The latest messages from your website</p>
          </div>
          <Link
            to="/admin/inquiries"
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-300 transition hover:text-blue-200"
          >
            View all <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
        {isLoading ? (
          <div className="space-y-3 p-5">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-12 animate-pulse rounded-lg bg-white/[0.03]" />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="text-sm font-medium text-slate-300">No inquiries yet</p>
            <p className="mt-1 text-xs text-slate-500">
              New contact form submissions will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                  <th className="px-5 py-3 sm:px-6">Client</th>
                  <th className="px-5 py-3">Service</th>
                  <th className="px-5 py-3">Received</th>
                  <th className="px-5 py-3 sm:px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {recent.map((inquiry) => (
                  <tr key={inquiry.id} className="text-xs transition hover:bg-white/[0.025]">
                    <td className="px-5 py-4 sm:px-6">
                      <Link
                        to={`/admin/inquiries/${inquiry.id}`}
                        className="font-medium text-slate-200 hover:text-blue-300"
                      >
                        {inquiry.full_name}
                      </Link>
                      <p className="mt-1 text-[11px] text-slate-500">{inquiry.email}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-400">{inquiry.service_required}</td>
                    <td className="px-5 py-4 text-slate-500">{formatDate(inquiry.created_at)}</td>
                    <td className="px-5 py-4 sm:px-6">
                      <StatusBadge status={inquiry.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  )
}
