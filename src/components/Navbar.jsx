import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { navLinks } from "../data/content"
import Button from "./Button"
import Container from "./Container"
import Logo from "./Logo"

const linkClass = ({ isActive }) =>
  `rounded-full px-3 py-2 text-sm transition duration-300 ${
    isActive ? "text-snow" : "text-mist hover:text-snow"
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const [prevPath, setPrevPath] = useState(location.pathname)

  // Close menu when route changes during render without cascading setState effect
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname)
    setOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button to="/contact" className="!hidden px-5 py-2.5 sm:!inline-flex">
            Let's Talk
          </Button>
          <button
            type="button"
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/10 text-snow lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {open ? (
        <nav
          id="mobile-navigation"
          className="border-t border-white/10 bg-ink lg:hidden"
          aria-label="Mobile"
        >
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `rounded-2xl px-3 py-3 text-base transition hover:bg-white/5 ${
                    isActive ? "text-snow" : "text-mist"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button to="/contact" className="mt-3 sm:!hidden">
              Let's Talk
            </Button>
          </Container>
        </nav>
      ) : null}
    </header>
  )
}
