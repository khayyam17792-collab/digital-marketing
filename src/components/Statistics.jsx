import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { stats } from "../data/content"
import Container from "./Container"

function useCount(target, active) {
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (reduce || !active) return undefined

    let frame
    const start = performance.now()
    const duration = 1200

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - progress) ** 3
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, reduce, target])

  return reduce ? target : (active ? value : 0)
}

function Stat({ value, label, active }) {
  const count = useCount(value, active)

  return (
    <div>
      <p className="font-display text-5xl font-bold tracking-tight text-snow sm:text-6xl">
        {count}
      </p>
      <p className="mt-3 text-sm text-mist">{label}</p>
    </div>
  )
}

export default function Statistics() {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  if (stats.length === 0) return null

  return (
    <section className="border-y border-white/10 bg-navy/50 py-20 sm:py-24" aria-labelledby="stats-heading" ref={ref}>
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-accent">
            MEASURABLE GROWTH
          </p>
          <h2
            id="stats-heading"
            className="mt-4 font-display text-3xl font-bold tracking-tight text-snow sm:text-4xl"
          >
            Progress built around your goals.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-mist sm:text-base">
            We shape digital strategies around clear goals and agreed measures of progress.
          </p>
        </div>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} active={active} />
          ))}
        </div>
      </Container>
    </section>
  )
}
