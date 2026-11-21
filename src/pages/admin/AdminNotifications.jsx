import { useEffect, useState } from "react"
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  MessageCircle,
  RefreshCw,
  RotateCcw,
  Send,
  XCircle,
} from "lucide-react"
import { formatDate } from "../../admin/adminApi"
import { supabase } from "../../lib/supabase"

const statusStyles = {
  sent: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  delivered: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  read: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  accepted: "border-blue-400/20 bg-blue-400/10 text-blue-200",
  failed: "border-red-400/20 bg-red-400/10 text-red-300",
  pending: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  processing: "border-blue-400/20 bg-blue-400/10 text-blue-200",
}

function StatCard({ label, value, icon: Icon, tone }) {
  const toneStyles = {
    emerald: "bg-emerald-400/10 text-emerald-300",
    red: "bg-red-400/10 text-red-300",
    amber: "bg-amber-400/10 text-amber-200",
  }

  return (
    <section className="rounded-2xl border border-white/8 bg-slate-900/55 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-400">{label}</p>
          <p className="mt-3 font-display text-3xl font-semibold text-white">
            {value === null ? "—" : value.toLocaleString()}
          </p>
        </div>
        <span className={`flex size-10 items-center justify-center rounded-xl ${toneStyles[tone]}`}>
          <Icon className="size-[18px]" />
        </span>
      </div>
    </section>
  )
}

function notificationName(notification) {
  const inquiry = notification.inquiries
  if (Array.isArray(inquiry)) return inquiry[0]?.full_name ?? "Inquiry"
  return inquiry?.full_name ?? "Inquiry"
}

function getNotificationDeliveryStatus(notification) {
  if (notification.status === "processing") return "processing"
  return notification.delivery_status ?? notification.status
}

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([])
  const [counts, setCounts] = useState({
    delivered: null,
    accepted: null,
    failed: null,
    pending: null,
  })
  const [configuration, setConfiguration] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)
  const [retryingId, setRetryingId] = useState("")
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")

  useEffect(() => {
    let active = true
    const load = async () => {
      if (!supabase) {
        if (active) {
          setError("Supabase is not configured for this deployment.")
          setIsLoading(false)
        }
        return
      }

      try {
        const [
          statusResult,
          schedulerResult,
          notificationsResult,
          deliveredResult,
          acceptedResult,
          failedResult,
          pendingResult,
        ] = await Promise.all([
          supabase.functions.invoke("whatsapp-notifier", { body: { action: "status" } }),
          supabase.rpc("get_zentro_whatsapp_scheduler_status"),
          supabase
            .from("whatsapp_notifications")
            .select("id,inquiry_id,status,delivery_status,attempt_count,last_error,provider_message_id,created_at,delivered_at,delivery_status_updated_at,inquiries(full_name,email)")
            .order("created_at", { ascending: false })
            .limit(25),
          supabase
            .from("whatsapp_notifications")
            .select("id", { count: "exact", head: true })
            .in("delivery_status", ["delivered", "read"]),
          supabase
            .from("whatsapp_notifications")
            .select("id", { count: "exact", head: true })
            .in("delivery_status", ["accepted", "sent"]),
          supabase
            .from("whatsapp_notifications")
            .select("id", { count: "exact", head: true })
            .eq("status", "failed"),
          supabase
            .from("whatsapp_notifications")
            .select("id", { count: "exact", head: true })
            .in("status", ["pending", "processing"]),
        ])

        if (!active) return

        if (notificationsResult.error) {
          setError(notificationsResult.error.message)
        }

        if (!notificationsResult.error) setNotifications(notificationsResult.data ?? [])

        if (statusResult.error) {
          setConfiguration({
            enabled: false,
            senderConfigured: false,
            schedulerReady: false,
            missingConfig: [],
            error: statusResult.error.message,
          })
        } else {
          const missingConfig = [...(statusResult.data?.missingConfig ?? [])]
          if (schedulerResult.error) {
            missingConfig.push("Scheduler status could not be verified")
          } else if (schedulerResult.data !== true) {
            missingConfig.push("Supabase Vault worker secrets")
          }
          setConfiguration({
            enabled: statusResult.data?.enabled === true && schedulerResult.data === true,
            senderConfigured: statusResult.data?.enabled === true,
            schedulerReady: schedulerResult.data === true,
            missingConfig,
            error: schedulerResult.error
              ? "Apply the WhatsApp migration and verify the Vault scheduler configuration."
              : "",
          })
        }

        const countError =
          deliveredResult.error ||
          acceptedResult.error ||
          failedResult.error ||
          pendingResult.error
        if (countError) {
          setError(countError.message)
        } else {
          setCounts({
            delivered: deliveredResult.count ?? 0,
            accepted: acceptedResult.count ?? 0,
            failed: failedResult.count ?? 0,
            pending: pendingResult.count ?? 0,
          })
          if (!notificationsResult.error) setError("")
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "Unable to load notifications.")
        }
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
  }, [refreshKey])

  const retryNotification = async (id) => {
    if (!supabase || retryingId) return
    setRetryingId(id)
    setError("")
    setNotice("")

    try {
      const { data, error: retryError } = await supabase.functions.invoke(
        "whatsapp-notifier",
        { body: { action: "retry", notificationId: id } },
      )

      if (retryError) {
        setError(retryError.message)
        return
      }
      if (data?.error) {
        setError(data.error)
        return
      }

      setNotice("Retry queued. The notification worker will process it shortly.")
      setRefreshKey((key) => key + 1)
    } catch (retryError) {
      setError(retryError instanceof Error ? retryError.message : "Could not queue retry.")
    } finally {
      setRetryingId("")
    }
  }

  const lastNotification = notifications[0]
  const lastStatus = lastNotification
    ? getNotificationDeliveryStatus(lastNotification)
    : "none"

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-slate-400">
            Monitor delivery of new inquiry alerts to your WhatsApp Business number.
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            WhatsApp notifications
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setRefreshKey((key) => key + 1)}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-white/[0.07] sm:self-auto"
        >
          <RefreshCw className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-200">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-sm text-emerald-200">
          {notice}
        </p>
      )}

      <section
        className={`rounded-2xl border p-5 sm:p-6 ${
          configuration?.enabled
            ? "border-emerald-400/20 bg-emerald-400/[0.04]"
            : "border-amber-400/20 bg-amber-400/[0.035]"
        }`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <span
            className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
              configuration?.enabled
                ? "bg-emerald-400/10 text-emerald-300"
                : "bg-amber-400/10 text-amber-200"
            }`}
          >
            <MessageCircle className="size-5" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-white">WhatsApp delivery</h3>
              <span
                className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                  configuration?.enabled
                    ? statusStyles.sent
                    : statusStyles.pending
                }`}
              >
                {configuration?.enabled ? "Enabled" : "Disabled"}
              </span>
            </div>
            {configuration?.error ? (
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {configuration.error}
              </p>
            ) : configuration?.enabled ? (
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Configuration and recipient opt-in are present. New inquiries are queued
                automatically; delivery still depends on Meta accepting the approved template.
              </p>
            ) : (
              <>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Notifications stay disabled until Meta configuration, the delivery webhook,
                  and recipient opt-in are complete.
                </p>
                {configuration?.missingConfig?.length > 0 && (
                  <p className="mt-2 break-words text-xs text-amber-200/80">
                    Missing configuration: {configuration.missingConfig.join(", ")}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Delivered / read" value={counts.delivered} icon={CheckCircle2} tone="emerald" />
        <StatCard label="Accepted by Meta" value={counts.accepted} icon={Send} tone="amber" />
        <StatCard label="Failed" value={counts.failed} icon={XCircle} tone="red" />
        <StatCard label="Queued / processing" value={counts.pending} icon={Clock3} tone="amber" />
      </div>
      <p className="-mt-4 text-xs leading-5 text-slate-500">
        “Delivered / read” comes from Meta delivery webhooks. “Accepted by Meta” is not a
        confirmation that the message reached the recipient.
      </p>

      <section className="overflow-hidden rounded-2xl border border-white/8 bg-slate-900/55">
        <div className="flex flex-col justify-between gap-2 border-b border-white/8 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h3 className="text-sm font-semibold text-white">Recent notifications</h3>
            <p className="mt-1 text-xs text-slate-500">Latest 25 inquiry delivery records</p>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Send className="size-3.5" />
            Last status:
            <span className="font-medium capitalize text-slate-200">
              {lastStatus.replace("_", " ")}
            </span>
            {lastNotification && (
              <span className="text-slate-500">
                · {formatDate(
                  lastNotification.delivery_status_updated_at ??
                    lastNotification.delivered_at ??
                    lastNotification.created_at,
                )}
              </span>
            )}
          </div>
        </div>

        {isLoading && notifications.length === 0 ? (
          <div className="space-y-3 p-5">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-14 animate-pulse rounded-lg bg-white/[0.03]" />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <MessageCircle className="mx-auto size-8 text-slate-600" />
            <p className="mt-3 text-sm font-medium text-slate-300">No notifications yet</p>
            <p className="mt-1 text-xs text-slate-500">
              Notifications will appear after new contact form submissions are saved.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] text-left">
              <thead>
                <tr className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                  <th className="px-5 py-3 sm:px-6">Inquiry</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Attempts</th>
                  <th className="px-5 py-3">Last updated</th>
                  <th className="px-5 py-3 sm:px-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {notifications.map((notification) => (
                  <tr key={notification.id} className="align-top text-xs">
                    <td className="px-5 py-4 sm:px-6">
                      <p className="font-medium text-slate-200">{notificationName(notification)}</p>
                      <p className="mt-1 break-all text-[11px] text-slate-500">
                        {Array.isArray(notification.inquiries)
                          ? notification.inquiries[0]?.email
                          : notification.inquiries?.email}
                      </p>
                      {notification.last_error && (
                        <p className="mt-2 max-w-md text-[11px] leading-5 text-red-300/80">
                          {notification.last_error}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold capitalize ${statusStyles[getNotificationDeliveryStatus(notification)] ?? statusStyles.pending}`}
                      >
                        {getNotificationDeliveryStatus(notification)}
                      </span>
                    </td>
                    <td className="px-5 py-4 tabular-nums text-slate-400">
                      {notification.attempt_count}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-slate-500">
                      {formatDate(
                        notification.delivery_status_updated_at ??
                          notification.delivered_at ??
                          notification.created_at,
                      )}
                    </td>
                    <td className="px-5 py-4 sm:px-6">
                      {notification.status === "failed" && (
                        <button
                          type="button"
                          onClick={() => void retryNotification(notification.id)}
                          disabled={!configuration?.senderConfigured || Boolean(retryingId)}
                          title="Retry can duplicate a message if Meta accepted it but the response was lost."
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-2 text-[11px] font-medium text-slate-300 transition hover:border-blue-400/30 hover:text-blue-200 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {retryingId === notification.id ? (
                            <RefreshCw className="size-3 animate-spin" />
                          ) : (
                            <RotateCcw className="size-3" />
                          )}
                          Retry
                        </button>
                      )}
                      {notification.status === "processing" && (
                        <span className="inline-flex items-center gap-1.5 text-[11px] text-blue-200">
                          <AlertCircle className="size-3.5" />
                          Processing
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="text-xs leading-5 text-slate-500">
        Manual retries are limited to failed records. If Meta accepted a message but its response
        timed out, retrying may deliver a duplicate; verify WhatsApp delivery first.
      </p>
    </div>
  )
}
