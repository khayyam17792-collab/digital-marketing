import {
  BarChart3,
  CirclePlus,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Menu,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react"
import { useState } from "react"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabase"

const navigation = [
  { label: "Overview", to: "/admin/dashboard", icon: LayoutDashboard, end: true },
  { label: "All Inquiries", to: "/admin/inquiries", icon: BarChart3 },
  { label: "New Inquiries", to: "/admin/new", icon: CirclePlus },
  { label: "Clients", to: "/admin/clients", icon: Users },
  { label: "Notifications", to: "/admin/notifications", icon: MessageCircle },
  { label: "Settings", to: "/admin/settings", icon: Settings },
]

const pageTitles = {
  "/admin/dashboard": "Overview",
  "/admin/inquiries": "All Inquiries",
  "/admin/new": "New Inquiries",
  "/admin/clients": "Clients",
  "/admin/notifications": "Notifications",
  "/admin/settings": "Settings",
}

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [error, setError] = useState("")
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const pageTitle =
    location.pathname.startsWith("/admin/inquiries/")
      ? "Inquiry Details"
      : pageTitles[location.pathname] ?? "Admin"

  const handleLogout = async () => {
    if (!supabase || isLoggingOut) return
    setError("")
    setIsLoggingOut(true)

    const { error: signOutError } = await supabase.auth.signOut()
    setIsLoggingOut(false)
    if (signOutError) {
      setError(signOutError.message)
      return
    }
    navigate("/admin/login", { replace: true })
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="min-h-screen bg-[#080d18] text-slate-100">
      {menuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-30 bg-black/70 lg:hidden"
          onClick={closeMenu}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/8 bg-[#0b1220] transition-transform duration-200 lg:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/8 px-6">
          <div>
            <p className="font-display text-xl font-bold tracking-[0.16em] text-white">ZENTRO</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.19em] text-slate-500">
              Agency workspace
            </p>
          </div>
          <button
            type="button"
            aria-label="Close navigation menu"
            className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
            onClick={closeMenu}
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="px-4 pt-6">
          <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
            Workspace
          </p>
          <nav aria-label="Admin navigation" className="space-y-1">
            {navigation.map(({ label, to, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-500/12 text-blue-200 ring-1 ring-inset ring-blue-400/15"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon className="size-[18px]" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t border-white/8 p-4">
          {error && (
            <p role="alert" className="mb-3 rounded-lg bg-red-400/10 p-3 text-xs text-red-200">
              {error}
            </p>
          )}
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
              <ShieldCheck className="size-4" />
            </span>
            <div>
              <p className="text-xs font-medium text-slate-200">Admin session</p>
              <p className="mt-0.5 text-[11px] text-slate-500">Protected by Supabase RLS</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-400/10 hover:text-red-200 disabled:opacity-50"
          >
            <LogOut className="size-[18px]" />
            {isLoggingOut ? "Signing out…" : "Logout"}
          </button>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/8 bg-[#080d18]/90 px-4 backdrop-blur-xl sm:px-7 lg:px-9">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open navigation menu"
              className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="size-5" />
            </button>
            <div>
              <p className="text-xs text-slate-500">ZENTRO / Admin</p>
              <h1 className="mt-0.5 text-sm font-semibold text-white">{pageTitle}</h1>
            </div>
          </div>
          <span className="hidden items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/5 px-3 py-1.5 text-xs text-emerald-300 sm:inline-flex">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Secure workspace
          </span>
        </header>

        <main className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-7 sm:py-8 lg:px-9">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
