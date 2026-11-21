import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import { projects } from "../data/content"
import Container from "./Container"
import ProjectVisual from "./ProjectVisual"
import Reveal from "./Reveal"
import SectionHeading from "./SectionHeading"

export default function Portfolio() {
  return (
    <section className="border-t border-white/10 py-20 sm:py-28" aria-labelledby="portfolio-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="portfolio-heading"
            eyebrow="OUR PORTFOLIO"
            title="CREATIVE WORK. REAL IMPACT."
            description="Explore selected projects that demonstrate our approach to digital experiences, creative strategy, and business growth."
          />
          <p className="mt-4 max-w-2xl text-sm text-mist">
            Demonstration projects for this layout. These are not client case studies or reported results.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index % 2 === 0 ? 0 : 0.08}>
              <article className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-panel/60 transition duration-300 hover:-translate-y-1 hover:border-white/20">
                <ProjectVisual type={project.visual} />
                <div className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-semibold tracking-[0.16em] text-accent">
                      {project.category.toUpperCase()}
                    </p>
                    <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-mist">
                      DEMO
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold text-snow">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    {project.description}
                  </p>
                  <Link
                    to="/work"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-snow"
                  >
                    View Project
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
