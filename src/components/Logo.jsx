import { Link } from "react-router-dom"
import { brand } from "../data/content"

export default function Logo({ className = "" }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 rounded-lg focus-visible:outline-none ${className}`}
      aria-label={`${brand.name} home`}
    >
      {/* Unique minimalist Zentro Monogram with glowing electric blue accent */}
      <span className="relative flex size-9.5 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy via-panel to-ink p-1.5 ring-1 ring-white/10 shadow-[0_4px_20px_-4px_rgba(37,99,235,0.5)] transition duration-300 group-hover:ring-violet/60 group-hover:shadow-[0_4px_24px_-2px_rgba(37,99,235,0.7)]">
        <svg
          viewBox="0 0 32 32"
          className="size-5 transition duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Top horizontal stroke */}
          <path
            d="M6.5 8.5H25.5"
            stroke="#F8FAFC"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Dynamic diagonal with electric gradient */}
          <path
            d="M24 9.5L8 23"
            stroke="url(#zentro-diag-grad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Bottom horizontal stroke */}
          <path
            d="M6.5 23.5H25.5"
            stroke="#F8FAFC"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Electric Blue precision vertex dot */}
          <circle cx="24.5" cy="8.5" r="2.2" fill="#3b82f6" />
          <defs>
            <linearGradient id="zentro-diag-grad" x1="24" y1="9.5" x2="8" y2="23" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60a5fa" />
              <stop offset="1" stopColor="#2563EB" />
            </linearGradient>
          </defs>
        </svg>
      </span>

      {/* Clean ZENTRO wordmark & tagline */}
      <span className="flex flex-col">
        <span className="font-display text-[15px] font-extrabold tracking-[0.14em] text-snow transition duration-300 group-hover:text-white">
          {brand.name}
        </span>
        <span className="-mt-1 text-[8px] font-semibold tracking-[0.22em] text-mist transition duration-300 group-hover:text-accent">
          {brand.tagline}
        </span>
      </span>
    </Link>
  )
}
