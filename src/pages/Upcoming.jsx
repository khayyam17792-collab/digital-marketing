import { Link } from "react-router-dom"
import SiteShell from "../components/SiteShell"

export default function Upcoming({ title }) {
  return (
    <SiteShell>
      <section className="px-5 pb-24 pt-20 sm:pt-28">
        <div className="mx-auto max-w-xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-accent">NEXT PAGE</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-snow sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-mist">
            This page is reserved in the site structure. The homepage is complete, and this section will be designed next.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-full bg-violet px-6 py-3 text-sm font-semibold text-snow"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </SiteShell>
  )
}
