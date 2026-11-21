import { useEffect, useState } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { verifyAdmin } from "../../admin/adminApi"
import { supabase } from "../../lib/supabase"

export default function AdminGuard() {
  const [access, setAccess] = useState("checking")
  const [error, setError] = useState("")
  const location = useLocation()

  useEffect(() => {
    let active = true

    const checkAccess = async () => {
      if (!supabase) {
        if (active) {
          setError("Supabase is not configured for this deployment.")
          setAccess("error")
        }
        return
      }

      const { data, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) {
        if (active) {
          setError(sessionError.message)
          setAccess("error")
        }
        return
      }
      if (!data.session) {
        if (active) setAccess("unauthenticated")
        return
      }

      try {
        const isAdmin = await verifyAdmin()
        if (active) setAccess(isAdmin ? "authorized" : "unauthorized")
      } catch (verificationError) {
        if (active) {
          setError(
            verificationError.message ||
              "Could not verify administrator access. Apply the admin dashboard migration."
          )
          setAccess("error")
        }
      }
    }

    void checkAccess()
    return () => {
      active = false
    }
  }, [])

  if (access === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-200">
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span className="size-5 animate-spin rounded-full border-2 border-blue-400/20 border-t-blue-400" />
          Verifying administrator access…
        </div>
      </div>
    )
  }

  if (access === "unauthenticated" || access === "unauthorized") {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from: location.pathname,
          message:
            access === "unauthorized"
              ? "This account is not authorized to access the ZENTRO dashboard."
              : "",
        }}
      />
    )
  }

  if (access === "error") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-slate-100">
        <div className="max-w-lg rounded-2xl border border-red-400/20 bg-slate-900 p-6">
          <h1 className="text-lg font-semibold">Admin access could not be verified</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">{error}</p>
        </div>
      </main>
    )
  }

  return <Outlet />
}
