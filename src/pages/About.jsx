import { motion, useReducedMotion } from "framer-motion"
import {
  Check,
  Compass,
  Eye,
  Globe,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react"
import Button from "../components/Button"
import Container from "../components/Container"
import Reveal from "../components/Reveal"
import SectionHeading from "../components/SectionHeading"
import SiteShell from "../components/SiteShell"
import { brand, coreValues } from "../data/content"

// ─── About Hero ──────────────────────────────────────────────────────────────

function AboutHero() {
  const reduce = useReducedMotion()

  return (
    <section
      className="relative overflow-hidden pb-20 pt-14 sm:pt-20 lg:pb-28"
      aria-labelledby="about-hero-heading"
    >
      <div
        className="hero-grid pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/4 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-violet/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-20 -z-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <motion.div
          className="max-w-3xl"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold tracking-[0.22em] text-accent">
            ABOUT US
          </p>
          <h1
            id="about-hero-heading"
            className="mt-5 font-display text-[2.6rem] font-bold leading-[0.98] tracking-tight text-snow sm:text-6xl lg:text-[4.15rem]"
          >
            WE ARE MORE THAN JUST A DIGITAL AGENCY.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
            We are a team of strategists, creatives, and digital specialists
            committed to helping businesses grow online. From brand identity to
            paid campaigns, we build digital ecosystems that attract, engage,
            and convert — turning online presence into measurable growth.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/contact" icon>
              Start a Project
            </Button>
            <Button to="/services" variant="secondary">
              Our Services
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
        >
          {[
            { value: "5+", label: "Years of Experience" },
            { value: "48+", label: "Projects Delivered" },
            { value: "32+", label: "Happy Clients" },
            { value: "7", label: "Digital Services" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-panel/70 px-5 py-5"
            >
              <p className="font-display text-3xl font-bold text-snow sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-mist">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

// ─── Our Story ───────────────────────────────────────────────────────────────

function OurStory() {
  return (
    <section
      className="border-t border-white/10 py-20 sm:py-28"
      aria-labelledby="story-heading"
    >
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-accent">
            OUR STORY
          </p>
          <h2
            id="story-heading"
            className="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-tight text-snow sm:text-4xl lg:text-5xl"
          >
            WHERE IT ALL BEGAN.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-mist">
            <p>
              {brand.name} was built out of a simple observation: too many good
              businesses were being overlooked online — not because their
              products or services weren&apos;t exceptional, but because their
              digital presence wasn&apos;t communicating their value clearly.
            </p>
            <p>
              We started with a belief that every business, regardless of size,
              deserves access to strategic digital marketing that actually drives
              results. So we built a team around that idea — people who
              understand both the creative side of marketing and the analytical
              thinking behind what makes campaigns perform.
            </p>
            <p>
              Today, we work with businesses across industries to build their
              digital presence from the ground up, grow their audience, and
              convert attention into sustainable, long-term growth.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative">
            <div
              className="pointer-events-none absolute -left-8 -top-8 h-48 w-48 rounded-full bg-violet/20 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-navy p-6 sm:p-8">
              <p className="mb-7 text-xs font-semibold tracking-[0.18em] text-accent">
                OUR JOURNEY
              </p>
              <div className="space-y-6">
                {[
                  {
                    year: "Year 01",
                    label: "Agency Founded",
                    detail:
                      "Built our first client relationships and refined our strategic process.",
                  },
                  {
                    year: "Year 02",
                    label: "Team Expansion",
                    detail:
                      "Grew our team and broadened our service offering across new channels.",
                  },
                  {
                    year: "Year 03",
                    label: "50+ Projects",
                    detail:
                      "Surpassed 50 delivered projects across diverse industries and markets.",
                  },
                  {
                    year: "Today",
                    label: "Growing Together",
                    detail:
                      "Continuing to scale brands and deliver consistent, measurable results.",
                  },
                ].map((item, i, arr) => (
                  <div key={item.year} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div
                        className={`size-3 shrink-0 rounded-full ${
                          i === arr.length - 1 ? "bg-accent" : "bg-violet"
                        }`}
                      />
                      {i < arr.length - 1 && (
                        <div className="mt-2 w-px flex-1 bg-white/10" />
                      )}
                    </div>
                    <div className="pb-2">
                      <p className="text-[11px] font-semibold tracking-[0.16em] text-accent">
                        {item.year}
                      </p>
                      <p className="mt-1 font-display text-base font-bold text-snow">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm text-mist">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

// ─── Mission & Vision ─────────────────────────────────────────────────────────

function MissionVision() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="mission-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="mission-heading"
            eyebrow="WHAT WE STAND FOR"
            title="PURPOSE-LED AT EVERY STEP."
            description="We are guided by a clear sense of why we exist and where we are headed. That clarity shapes every project, every decision, and every relationship we build."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal delay={0}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-panel/70 p-7 sm:p-9">
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-violet/25 blur-2xl"
                aria-hidden="true"
              />
              <span className="relative grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-accent">
                <Compass className="size-5" aria-hidden="true" />
              </span>
              <h3 className="relative mt-5 font-display text-2xl font-bold text-snow">
                OUR MISSION
              </h3>
              <p className="relative mt-4 flex-1 text-base leading-relaxed text-mist">
                Our mission is to empower businesses to thrive in the digital
                landscape. We combine creative strategy, data-driven thinking,
                and deep market insight to deliver solutions that build real,
                lasting growth — not just impressions.
              </p>
              <p className="relative mt-4 text-base leading-relaxed text-mist">
                Every engagement we take on is guided by one question: what will
                actually move the needle for this business?
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-panel/70 p-7 sm:p-9">
              <div
                className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-accent/12 blur-2xl"
                aria-hidden="true"
              />
              <span className="relative grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-accent">
                <Globe className="size-5" aria-hidden="true" />
              </span>
              <h3 className="relative mt-5 font-display text-2xl font-bold text-snow">
                OUR VISION
              </h3>
              <p className="relative mt-4 flex-1 text-base leading-relaxed text-mist">
                Our vision is to become the most trusted digital growth partner
                for ambitious businesses. We see a world where every brand,
                regardless of size, has access to elite-level digital strategy
                and creative execution.
              </p>
              <p className="relative mt-4 text-base leading-relaxed text-mist">
                We are building toward a future where our clients lead their
                markets online — and we are right there leading alongside them.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

// ─── Core Values ─────────────────────────────────────────────────────────────

const valueIcons = { Sparkles, Zap, Eye, Users, Target }

function CoreValues() {
  return (
    <section
      className="border-t border-white/10 py-20 sm:py-28"
      aria-labelledby="values-heading"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="values-heading"
            eyebrow="WHAT DRIVES US"
            title="OUR CORE VALUES."
            description="These are the principles that guide every decision we make, every campaign we run, and every client relationship we build."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((value, index) => {
            const Icon = valueIcons[value.icon]
            const isLastOddOnSm =
              index === coreValues.length - 1 && coreValues.length % 2 !== 0

            return (
              <Reveal
                key={value.title}
                delay={Math.min(index * 0.05, 0.2)}
                className={
                  isLastOddOnSm ? "sm:col-span-2 lg:col-span-1" : undefined
                }
              >
                <article className="group flex h-full flex-col rounded-3xl border border-white/10 bg-panel/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_50px_-32px_rgba(92,71,230,0.75)] sm:p-7">
                  <span className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-snow">
                    {value.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-mist sm:text-[15px]">
                    {value.description}
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

// ─── Why We're Different ──────────────────────────────────────────────────────

const differentiators = [
  "We treat your business like our own — your goals are our goals.",
  "Every strategy is built from scratch around your market, audience, and offer.",
  "We communicate clearly and consistently, so you're never in the dark.",
  "We focus on measurable outcomes, not just activity and impressions.",
  "We bring senior-level thinking to every engagement, not junior execution.",
  "We stay ahead of digital trends so your brand always has an edge.",
]

function WhyDifferent() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="different-heading">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-accent">
            WHY CHOOSE US
          </p>
          <h2
            id="different-heading"
            className="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-tight text-snow sm:text-4xl lg:text-5xl"
          >
            WHAT MAKES US DIFFERENT.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-mist">
            There is no shortage of digital agencies. What sets us apart is not
            our list of services — it is how we deliver them. We approach every
            project as a long-term partnership, not a transaction.
          </p>
          <Button to="/contact" icon className="mt-8">
            Work With Us
          </Button>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="space-y-5">
            {differentiators.map((item) => (
              <li key={item} className="flex items-start gap-4">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-violet/20 text-accent">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                <p className="text-base leading-relaxed text-mist">{item}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}

// ─── About CTA ───────────────────────────────────────────────────────────────

function AboutCTA() {
  const reduce = useReducedMotion()

  return (
    <section
      className="pb-20 sm:pb-28"
      aria-labelledby="about-cta-heading"
    >
      <Container>
        <motion.div
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-navy px-6 py-14 sm:px-12 sm:py-16 lg:px-16"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full bg-violet/35 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 left-8 size-56 rounded-full bg-violet-bright/15 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative max-w-2xl">
            <h2
              id="about-cta-heading"
              className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-snow sm:text-4xl lg:text-5xl"
            >
              LET&apos;S BUILD SOMETHING GREAT TOGETHER.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-mist sm:text-lg">
              Whether you&apos;re starting from zero or scaling an existing
              brand, we&apos;re ready to help. Tell us about your business and
              let&apos;s figure out the best path forward together.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact" icon>
                CONTACT US
              </Button>
              <Button to="/services" variant="secondary">
                VIEW OUR SERVICES
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <SiteShell>
      <AboutHero />
      <OurStory />
      <MissionVision />
      <CoreValues />
      <WhyDifferent />
      <AboutCTA />
    </SiteShell>
  )
}
