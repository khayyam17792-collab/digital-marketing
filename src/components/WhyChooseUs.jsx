import {
  ChartNoAxesCombined,
  Handshake,
  Lightbulb,
  MessagesSquare,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react"
import { reasons } from "../data/content"
import Container from "./Container"
import Reveal from "./Reveal"
import SectionHeading from "./SectionHeading"

const icons = {
  Lightbulb,
  ChartNoAxesCombined,
  SlidersHorizontal,
  MessagesSquare,
  Handshake,
  TrendingUp,
}

export default function WhyChooseUs() {
  return (
    <section className="py-14 sm:py-28" aria-labelledby="why-heading">
      <Container>
        <Reveal>
          <SectionHeading id="why-heading" title="WHY PARTNER WITH US?" />
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = icons[reason.icon]
            return (
              <Reveal key={reason.title} className="h-full" delay={Math.min(index * 0.04, 0.16)}>
                <article className="h-full bg-ink p-7 sm:p-8">
                  <span className="grid size-11 place-items-center rounded-2xl bg-violet/15 text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-snow">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    {reason.description}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
