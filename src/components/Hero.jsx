import { motion, useReducedMotion } from "framer-motion"
import { brand } from "../data/content"
import Button from "./Button"
import Container from "./Container"

const sampleMetrics = [
  { label: "Reach", value: "24.6k" },
  { label: "Leads", value: "186" },
  { label: "Engagement", value: "4.8%" },
]

function FloatCard({ children, className, delay = 0 }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  )
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div
        className="pointer-events-none absolute left-1/2 top-8 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-violet/30 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative lg:px-8">
        <div className="rounded-[1.75rem] border border-white/10 bg-panel/95 p-4 shadow-[0_40px_90px_-48px_rgba(0,0,0,0.85)] sm:p-5">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-mist">
                ILLUSTRATION
              </p>
              <p className="mt-1 font-display text-lg text-snow">Campaign overview</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-accent">
              Sample view
            </span>
          </div>

          <svg viewBox="0 0 480 150" className="h-36 w-full sm:h-40" aria-hidden="true">
            <defs>
              <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7a68f2" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#7a68f2" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[30, 70, 110].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="480"
                y2={y}
                stroke="rgba(255,255,255,0.06)"
              />
            ))}
            <path
              d="M0 118 C48 112 72 86 112 88 C156 90 176 48 228 56 C280 64 304 28 356 38 C404 48 436 22 480 16 L480 150 L0 150 Z"
              fill="url(#hero-area)"
            />
            <path
              d="M0 118 C48 112 72 86 112 88 C156 90 176 48 228 56 C280 64 304 28 356 38 C404 48 436 22 480 16"
              fill="none"
              stroke="#c9bfff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          <div className="mt-2 grid grid-cols-3 gap-2 sm:gap-3">
            {sampleMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-ink/60 px-3 py-3"
              >
                <p className="text-[11px] text-mist">{metric.label}</p>
                <p className="mt-1 font-display text-lg text-snow sm:text-xl">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-mist">
            Sample figures for the illustration. Not business results.
          </p>
        </div>

        <FloatCard className="absolute left-0 top-10 hidden w-40 rounded-2xl border border-white/10 bg-navy/95 p-4 shadow-2xl backdrop-blur lg:block">
          <p className="text-[10px] font-semibold tracking-[0.16em] text-mist">SAMPLE</p>
          <p className="mt-2 font-display text-2xl text-snow">+18%</p>
          <p className="text-xs text-mist">Audience direction</p>
        </FloatCard>

        <FloatCard
          delay={0.6}
          className="absolute bottom-8 right-0 hidden w-48 rounded-2xl border border-white/10 bg-navy/95 p-4 shadow-2xl backdrop-blur lg:block"
        >
          <p className="text-[10px] font-semibold tracking-[0.16em] text-mist">SAMPLE</p>
          <p className="mt-2 text-sm font-semibold text-snow">Content calendar</p>
          <div className="mt-3 flex gap-1.5" aria-hidden="true">
            {["bg-violet", "bg-accent/70", "bg-white/30", "bg-white/15"].map((tone) => (
              <span key={tone} className={`h-8 flex-1 rounded-md ${tone}`} />
            ))}
          </div>
        </FloatCard>
      </div>
    </div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden pb-20 pt-14 sm:pt-20 lg:min-h-[calc(100svh-4.25rem)] lg:pb-24">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold tracking-[0.22em] text-accent">
            {brand.label}
          </p>
          <h1 className="mt-5 max-w-xl font-display text-[2.6rem] font-bold leading-[0.98] tracking-tight text-snow sm:text-6xl lg:text-[4.15rem]">
            WE TURN IDEAS INTO DIGITAL GROWTH.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
            We help ambitious businesses grow through strategic digital marketing,
            creative branding, and high-performing websites.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/contact" icon>
              Start a Project
            </Button>
            <Button to="/work" variant="secondary">
              Explore Our Work
            </Button>
          </div>
          <p className="mt-8 text-xs font-semibold tracking-[0.2em] text-accent">
            {brand.tagline}
          </p>
        </motion.div>
        <HeroVisual />
      </Container>
    </section>
  )
}
