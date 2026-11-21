import Button from "./Button"
import Container from "./Container"
import Reveal from "./Reveal"

export default function AboutPreview() {
  return (
    <section className="border-t border-white/10 py-14 sm:py-28" aria-labelledby="about-preview-heading">
      <Container className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <Reveal>
          <h2
            id="about-preview-heading"
            className="max-w-xl font-display text-[1.75rem] font-bold leading-[1.05] tracking-tight text-snow sm:text-4xl lg:text-5xl"
          >
            YOUR GROWTH PARTNER IN THE DIGITAL WORLD.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-base leading-relaxed text-mist sm:text-lg">
            We combine creativity, technology, and data-driven strategies to help
            businesses build a powerful online presence, connect with their audience,
            and achieve sustainable growth.
          </p>
          <Button to="/about" variant="secondary" className="mt-8">
            MORE ABOUT US
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
