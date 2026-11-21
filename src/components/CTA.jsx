import { motion, useReducedMotion } from "framer-motion"
import Button from "./Button"
import Container from "./Container"

export default function CTA() {
  const reduce = useReducedMotion()

  return (
    <section className="pb-14 sm:pb-28" aria-labelledby="cta-heading">
      <Container>
        <motion.div
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-navy px-5 py-10 sm:px-12 sm:py-16 lg:px-16"
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
              id="cta-heading"
              className="font-display text-[1.75rem] font-bold leading-[1.05] tracking-tight text-snow sm:text-4xl lg:text-5xl"
            >
              READY TO TAKE YOUR BUSINESS TO THE NEXT LEVEL?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-mist sm:text-lg">
              Let's create something extraordinary together. Tell us about your goals,
              and we'll help you turn your vision into reality.
            </p>
            <Button to="/contact" icon className="mt-8">
              START YOUR PROJECT
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
