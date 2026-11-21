import { useState } from "react"
import { ArrowLeft, ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { verifyAdmin } from "../../admin/adminApi"
import { supabase } from "../../lib/supabase"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    setError("")
    setIsSubmitting(true)

    if (!supabase) {
      setError("Supabase is not configured for this deployment.")
      setIsSubmitting(false)
      return
    }

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })
      if (signInError) throw signInError

      let isAdmin
      try {
        isAdmin = await verifyAdmin()
      } catch (verificationError) {
        const { error: signOutError } = await supabase.auth.signOut()
        const verificationMessage =
          verificationError.message ||
          "Admin authorization is unavailable. Apply the dashboard migration and authorize this account."
        throw new Error(
          signOutError
            ? `${verificationMessage} Sign-out also failed: ${signOutError.message}`
            : verificationMessage
        )
      }

      if (!isAdmin) {
        const { error: signOutError } = await supabase.auth.signOut()
        if (signOutError) throw signOutError
        throw new Error("This account is not authorized to access the ZENTRO dashboard.")
      }

      const destination =
        typeof location.state?.from === "string"
          ? location.state.from
          : "/admin/dashboard"
      navigate(destination, { replace: true })
    } catch (signInError) {
      setError(signInError.message || "Unable to sign in. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080d18] px-4 py-12 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(37,99,235,0.2),transparent_55%)]" />
      <div className="relative w-full max-w-md">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Back to ZENTRO
        </Link>

        <section className="rounded-3xl border border-white/10 bg-slate-900/90 p-7 shadow-2xl shadow-black/30 sm:p-9">
          <div className="mb-8 flex size-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-300">
            <ShieldCheck className="size-6" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-300">
            ZENTRO Admin
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Sign in with an authorized administrator account to manage inquiries.
          </p>

          {(location.state?.message || error) && (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm leading-6 text-red-200"
            >
              {error || location.state.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-slate-200">
                Email address
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/10"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Password
              </label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/10"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Verifying access…" : "Sign in"}
              {!isSubmitting && <ArrowRight className="size-4" />}
            </button>
          </form>

          <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-5 text-slate-500">
            Access requires an authorized Supabase account. Keep public sign-ups disabled in
            Supabase Auth.
          </p>
        </section>
      </div>
    </main>
  )
}
