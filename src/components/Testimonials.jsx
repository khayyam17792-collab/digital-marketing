import { Star } from "lucide-react"
import { testimonials } from "../data/content"
import Container from "./Container"
import Reveal from "./Reveal"
import SectionHeading from "./SectionHeading"

export default function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <section className="py-20 sm:py-28" aria-labelledby="testimonials-heading">
      <Container>
        <Reveal>
          <SectionHeading id="testimonials-heading" title="WHAT PEOPLE SAY." />
          <p className="mt-4 max-w-2xl text-sm text-mist">
            Demo testimonials for the layout. Replace them with genuine customer feedback.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.quote} delay={index * 0.06}>
              <figure className="flex h-full flex-col rounded-3xl border border-white/10 bg-panel/70 p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex gap-1" aria-label="Sample rating, 5 of 5 stars">
                    {Array.from({ length: 5 }, (_, star) => (
                      <Star
                        key={star}
                        className="size-4 fill-accent text-accent"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-mist">
                    DEMO
                  </span>
                </div>
                <blockquote className="mt-5 flex-1 text-base leading-relaxed text-snow">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-sm font-semibold text-snow">{item.name}</p>
                  <p className="mt-1 text-sm text-mist">{item.company}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
