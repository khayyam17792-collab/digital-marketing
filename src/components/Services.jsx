import {
  ArrowUpRight,
  Megaphone,
  MonitorSmartphone,
  MousePointerClick,
  NotebookPen,
  PenTool,
  Search,
  Share2,
} from "lucide-react"
import { Link } from "react-router-dom"
import { services } from "../data/content"
import Container from "./Container"
import Reveal from "./Reveal"
import SectionHeading from "./SectionHeading"

const icons = {
  Megaphone,
  Share2,
  Search,
  MonitorSmartphone,
  MousePointerClick,
  PenTool,
  NotebookPen,
}

export default function Services() {
  return (
    <section className="py-14 sm:py-28" aria-labelledby="services-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="services-heading"
            eyebrow="WHAT WE DO"
            title="EVERYTHING YOUR BRAND NEEDS TO GROW."
            description="From building your online presence to generating leads and increasing sales, we provide digital solutions that help your business move forward."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[service.icon]
            const wide = index === services.length - 1

            return (
              <Reveal
                key={service.title}
                delay={Math.min(index * 0.04, 0.2)}
                className={wide ? "md:col-span-2 xl:col-span-3" : undefined}
              >
                <article
                  className={`group flex h-full flex-col rounded-3xl border border-white/10 bg-panel/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_50px_-32px_rgba(92,71,230,0.75)] sm:p-7 ${
                    wide ? "md:flex-row md:items-center md:justify-between md:gap-8" : ""
                  }`}
                >
                  <div className={wide ? "md:max-w-2xl" : undefined}>
                    <span className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-accent">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-bold text-snow">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-mist sm:text-[15px]">
                      {service.description}
                    </p>
                  </div>
                  <Link
                    to="/services"
                    className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-snow ${
                      wide ? "md:mt-0 md:shrink-0" : ""
                    }`}
                  >
                    Learn More
                    <ArrowUpRight
                      className="size-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
