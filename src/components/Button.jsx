import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

const variants = {
  primary:
    "bg-violet text-snow shadow-[0_12px_32px_-16px_rgba(92,71,230,0.95)] hover:bg-violet-bright disabled:opacity-60 disabled:pointer-events-none",
  secondary:
    "border border-white/15 bg-white/5 text-snow hover:border-white/30 hover:bg-white/10 disabled:opacity-60 disabled:pointer-events-none",
}

export default function Button({
  to,
  href,
  onClick,
  type = "button",
  disabled = false,
  children,
  variant = "primary",
  icon = false,
  className = "",
  ...props
}) {
  const commonClasses = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition duration-300 cursor-pointer ${variants[variant]} ${className}`

  const iconElement = icon ? (
    <ArrowUpRight
      className="size-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      aria-hidden="true"
    />
  ) : null

  if (href) {
    return (
      <a href={href} className={commonClasses} {...props}>
        {children}
        {iconElement}
      </a>
    )
  }

  if (to) {
    return (
      <Link to={to} className={commonClasses} {...props}>
        {children}
        {iconElement}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={commonClasses}
      {...props}
    >
      {children}
      {iconElement}
    </button>
  )
}
