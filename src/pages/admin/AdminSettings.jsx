import { useEffect, useState } from "react"
import { ExternalLink, KeyRound, ShieldCheck, UserRound } from "lucide-react"
import { supabase } from "../../lib/supabase"

export default function AdminSettings() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true
    const loadUser = async () => {
      if (!supabase) {
        setError("Supabase is not configured for this deployment.")
        return
      }

      const { data, error: userError } = await supabase.auth.getUser()
      if (!active) return
      if (userError) {
        setError(userError.message)
      } else {
        setEmail(data.user?.email ?? "")
      }
    }

    void loadUser()
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm text-slate-400">Manage the security context for this workspace.</p>
        <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Admin settings
        </h2>
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-200">
          {error}
        </p>
      )}

      <section className="rounded-2xl border border-white/8 bg-slate-900/55 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
            <UserRound className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-white">Signed-in administrator</h3>
            <p className="mt-1 text-xs text-slate-500">
              This account must also be authorized in the Supabase admin membership table.
            </p>
            <p className="mt-4 break-all text-sm text-slate-200">{email || "Loading account…"}</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/8 bg-slate-900/55 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
            <ShieldCheck className="size-5" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-white">Database-enforced access</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Supabase Row Level Security checks administrator membership for every inquiry read,
              update, and delete. The dashboard UI is not the security boundary.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-amber-400/15 bg-amber-400/[0.035] p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-200">
            <KeyRound className="size-5" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-slate-100">Administrator provisioning</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Create or invite administrator accounts in Supabase Auth, then add only their Auth
              user IDs to <code className="text-amber-200">public.zentro_admins</code>. Disable
              email sign-ups in Supabase Auth so visitors cannot register accounts.
            </p>
            <a
              href="https://supabase.com/dashboard/project/krzyqqwberlmqzthtcwk/auth/users"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-amber-200 transition hover:text-amber-100"
            >
              Open Supabase Auth users <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
