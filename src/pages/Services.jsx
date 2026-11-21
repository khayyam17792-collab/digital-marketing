import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowUpRight,
  Check,
  Compass,
  Cpu,
  Lightbulb,
  Megaphone,
  MessagesSquare,
  MonitorSmartphone,
  MousePointerClick,
  NotebookPen,
  PenTool,
  Rocket,
  Search,
  Share2,
  SlidersHorizontal,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react"
import { Link } from "react-router-dom"
import Button from "../components/Button"
import Container from "../components/Container"
import Reveal from "../components/Reveal"
import SectionHeading from "../components/SectionHeading"
import SiteShell from "../components/SiteShell"

// ─── Data Definitions ────────────────────────────────────────────────────────

const detailedServices = [
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: Megaphone,
    description:
      "Grow your business with strategic digital marketing campaigns designed to increase brand awareness, attract customers, and generate business opportunities.",
    deliverables: [
      "Marketing Strategy",
      "Campaign Planning",
      "Audience Research",
      "Growth Strategy",
    ],
    tag: "High Growth",
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    icon: Share2,
    description:
      "Build a powerful social media presence and connect with your target audience through engaging content and strategic campaigns.",
    deliverables: [
      "Social Media Management",
      "Content Planning",
      "Audience Engagement",
      "Social Media Strategy",
    ],
    tag: "Community",
  },
  {
    id: "seo",
    title: "Search Engine Optimization (SEO)",
    icon: Search,
    description:
      "Improve your website's search engine visibility and attract relevant organic traffic through effective SEO strategies.",
    deliverables: [
      "Keyword Research",
      "On-Page SEO",
      "Technical SEO",
      "Content Optimization",
    ],
    tag: "Organic Traffic",
  },
  {
    id: "website-design-dev",
    title: "Website Design & Development",
    icon: MonitorSmartphone,
    description:
      "Create beautiful, responsive, and high-performing websites that provide excellent user experiences and help convert visitors into customers.",
    deliverables: [
      "Business Websites",
      "Landing Pages",
      "Responsive Design",
      "Website Optimization",
    ],
    tag: "Performance",
  },
  {
    id: "paid-advertising",
    title: "Paid Advertising",
    icon: MousePointerClick,
    description:
      "Reach the right audience through targeted advertising campaigns designed to increase leads, traffic, and sales.",
    deliverables: [
      "Google Ads",
      "Facebook Ads",
      "Instagram Ads",
      "Campaign Optimization",
    ],
    tag: "High ROI",
  },
  {
    id: "branding-creative-design",
    title: "Branding & Creative Design",
    icon: PenTool,
    description:
      "Build a recognizable and memorable brand identity with professional visual designs that communicate your business personality.",
    deliverables: [
      "Logo Design",
      "Brand Identity",
      "Graphic Design",
      "Marketing Materials",
    ],
    tag: "Identity",
  },
  {
    id: "content-creation",
    title: "Content Creation",
    icon: NotebookPen,
    description:
      "Create engaging and valuable content that communicates your brand message and builds meaningful connections with your audience.",
    deliverables: [
      "Social Media Content",
      "Copywriting",
      "Creative Posts",
      "Marketing Content",
    ],
    tag: "Engagement",
  },
]

const processSteps = [
  {
    step: "01",
    title: "DISCOVER",
    subtitle: "Understanding your business",
    description:
      "We understand your business, goals, audience, and challenges.",
    icon: Search,
  },
  {
    step: "02",
    title: "STRATEGIZE",
    subtitle: "Architecting the roadmap",
    description:
      "We develop a customized digital strategy based on your business needs.",
    icon: Compass,
  },
  {
    step: "03",
    title: "EXECUTE",
    subtitle: "Bringing solutions to life",
    description:
      "Our team implements the strategy through creative and effective solutions.",
    icon: Workflow,
  },
  {
    step: "04",
    title: "OPTIMIZE",
    subtitle: "Continuous performance tuning",
    description:
      "We review performance and continuously improve the results.",
    icon: Rocket,
  },
]

const serviceBenefits = [
  {
    title: "Customized Solutions",
    description:
      "Every campaign and digital asset is tailored specifically to your audience, business model, and competitive landscape.",
    icon: SlidersHorizontal,
  },
  {
    title: "Creative Strategies",
    description:
      "We blend innovative storytelling with cutting-edge visual concepts to capture attention and stand out from market noise.",
    icon: Lightbulb,
  },
  {
    title: "Modern Technology",
    description:
      "We employ modern development tools, high-speed stacks, and automated marketing infrastructure for peak performance.",
    icon: Cpu,
  },
  {
    title: "Transparent Communication",
    description:
      "Enjoy direct collaboration, clear reporting dashboards, and weekly status updates with zero marketing jargon.",
    icon: MessagesSquare,
  },
  {
    title: "Client-Focused Approach",
    description:
      "Your success metrics lead our efforts. We function as a genuine strategic partner and extension of your internal team.",
    icon: Users,
  },
  {
    title: "Continuous Improvement",
    description:
      "We don't launch and leave. Ongoing tracking, A/B testing, and iterative refinements ensure compounding long-term growth.",
    icon: TrendingUp,
  },
]

// ─── Hero Visual Component ───────────────────────────────────────────────────

function ServicesHeroVisual() {
  const reduce = useReducedMotion()

  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div
        className="pointer-events-none absolute left-1/2 top-10 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-violet/30 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative lg:px-4">
        {/* Main interactive mock card */}
        <div className="rounded-[1.75rem] border border-white/10 bg-panel/95 p-5 shadow-[0_40px_90px_-48px_rgba(0,0,0,0.85)] sm:p-6">
          <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-violet/20 text-accent">
                <Target className="size-4" />
              </span>
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-mist uppercase">
                  Growth Engine
                </p>
                <p className="font-display text-base font-bold text-snow">
                  Multi-Channel Performance
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              Active System
            </span>
          </div>

          {/* Performance Flow Visualization */}
          <div className="space-y-3.5">
            {[
              {
                channel: "Organic Search & SEO",
                metric: "+148% Traffic",
                width: "92%",
                color: "from-violet to-accent",
              },
              {
                channel: "Paid Acquisition (Ads)",
                metric: "3.8x ROAS",
                width: "78%",
                color: "from-violet-bright to-accent/90",
              },
              {
                channel: "Social & Community",
                metric: "+24.5k Reach",
                width: "85%",
                color: "from-violet to-violet-bright",
              },
              {
                channel: "Conversion Optimization",
                metric: "4.6% Conv. Rate",
                width: "68%",
                color: "from-accent/70 to-violet",
              },
            ].map((item) => (
              <div key={item.channel} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-mist">{item.channel}</span>
                  <span className="text-snow font-semibold">{item.metric}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/5 p-0.5">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                    initial={reduce ? { width: item.width } : { width: "0%" }}
                    animate={{ width: item.width }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Metrics Footer */}
          <div className="mt-6 grid grid-cols-3 gap-2.5 rounded-2xl border border-white/5 bg-ink/70 p-3 sm:gap-3">
            <div>
              <p className="text-[10px] text-mist uppercase tracking-wider">Avg. ROI</p>
              <p className="mt-0.5 font-display text-lg font-bold text-snow sm:text-xl">
                320%
              </p>
            </div>
            <div>
              <p className="text-[10px] text-mist uppercase tracking-wider">Retain Rate</p>
              <p className="mt-0.5 font-display text-lg font-bold text-snow sm:text-xl">
                96%
              </p>
            </div>
            <div>
              <p className="text-[10px] text-mist uppercase tracking-wider">Channels</p>
              <p className="mt-0.5 font-display text-lg font-bold text-accent sm:text-xl">
                Full-Stack
              </p>
            </div>
          </div>
        </div>

        {/* Floating Accent Card 1: Deliverables Counter */}
        <motion.div
          className="absolute -left-6 top-8 hidden w-44 rounded-2xl border border-white/10 bg-navy/95 p-4 shadow-2xl backdrop-blur lg:block"
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400" />
            <p className="text-[10px] font-semibold tracking-wider text-mist">
              INTEGRATION
            </p>
          </div>
          <p className="mt-2 font-display text-xl font-bold text-snow">7 Core Pillars</p>
          <p className="mt-0.5 text-xs text-mist">Engineered for growth</p>
        </motion.div>

        {/* Floating Accent Card 2: Strategic Impact */}
        <motion.div
          className="absolute -right-4 -bottom-6 hidden w-48 rounded-2xl border border-white/10 bg-navy/95 p-4 shadow-2xl backdrop-blur lg:block"
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <p className="text-[10px] font-semibold tracking-wider text-accent uppercase">
            STRATEGY FIRST
          </p>
          <p className="mt-1 font-display text-base font-bold text-snow">
            Proven Method
          </p>
          <p className="mt-0.5 text-xs text-mist">Discover → Optimize</p>
        </motion.div>
      </div>
    </div>
  )
}

// ─── 1. Hero Section ──────────────────────────────────────────────────────────

function ServicesHero() {
  const reduce = useReducedMotion()

  return (
    <section
      className="relative overflow-hidden pb-20 pt-14 sm:pt-20 lg:min-h-[calc(100svh-4.25rem)] lg:pb-28"
      aria-labelledby="services-hero-heading"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/3 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-violet/20 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">
            OUR SERVICES
          </p>
          <h1
            id="services-hero-heading"
            className="mt-5 max-w-xl font-display text-[2.5rem] font-bold leading-[0.98] tracking-tight text-snow sm:text-6xl lg:text-[3.9rem]"
          >
            WE HELP YOUR BUSINESS GROW IN THE DIGITAL WORLD.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
            From building your brand identity to generating leads and increasing
            sales, we provide creative and strategic digital solutions to help
            your business succeed.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="#services-list" icon>
              Explore Our Services
            </Button>
            <Button to="/contact" variant="secondary">
              Let&apos;s Talk
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-6 border-t border-white/10 pt-6">
            <div>
              <p className="font-display text-2xl font-bold text-snow">7+</p>
              <p className="text-xs text-mist">Digital Capabilities</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="font-display text-2xl font-bold text-snow">100%</p>
              <p className="text-xs text-mist">Tailored Strategies</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="font-display text-2xl font-bold text-accent">End-to-End</p>
              <p className="text-xs text-mist">Execution Partner</p>
            </div>
          </div>
        </motion.div>

        <ServicesHeroVisual />
      </Container>
    </section>
  )
}

// ─── 2. Services Overview (7 Cards) ──────────────────────────────────────────

function ServicesOverview() {
  return (
    <section
      id="services-list"
      className="border-t border-white/10 py-20 sm:py-28 scroll-mt-20"
      aria-labelledby="overview-heading"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="overview-heading"
            eyebrow="SOLUTIONS CATALOG"
            title="EVERYTHING YOUR BRAND NEEDS TO GROW."
            description="We combine creativity, technology, and marketing strategies to help businesses build a strong digital presence."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {detailedServices.map((service, index) => {
            const Icon = service.icon
            const isFullWidthSpan = index === detailedServices.length - 1

            return (
              <Reveal
                key={service.id}
                delay={Math.min(index * 0.05, 0.25)}
                className={isFullWidthSpan ? "md:col-span-2 xl:col-span-3" : undefined}
              >
                <article
                  className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/10 bg-panel/75 p-7 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_50px_-32px_rgba(92,71,230,0.75)] sm:p-8 ${
                    isFullWidthSpan
                      ? "xl:flex-row xl:items-center xl:justify-between xl:gap-12"
                      : ""
                  }`}
                >
                  {/* Subtle hover gradient glow */}
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-violet/10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  <div className={isFullWidthSpan ? "xl:max-w-3xl" : ""}>
                    <div className="flex items-center justify-between gap-4">
                      <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-accent transition duration-300 group-hover:scale-105 group-hover:bg-violet group-hover:text-snow">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-wider text-mist uppercase">
                        {service.tag}
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-2xl font-bold text-snow">
                      {service.title}
                    </h3>
                    <p className="mt-3.5 text-sm leading-relaxed text-mist sm:text-[15px]">
                      {service.description}
                    </p>

                    {/* Deliverables checklist */}
                    <div className="mt-6 border-t border-white/10 pt-5">
                      <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
                        Key Deliverables
                      </p>
                      <ul
                        className={`mt-3.5 gap-2.5 text-sm text-mist ${
                          isFullWidthSpan
                            ? "grid grid-cols-2 sm:grid-cols-4"
                            : "grid grid-cols-1 sm:grid-cols-2"
                        }`}
                      >
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <span className="grid size-4 shrink-0 place-items-center rounded-full bg-violet/20 text-accent">
                              <Check className="size-2.5" strokeWidth={3} />
                            </span>
                            <span className="text-snow text-xs sm:text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    className={`mt-8 border-t border-white/10 pt-5 ${
                      isFullWidthSpan
                        ? "xl:mt-0 xl:border-t-0 xl:pt-0 xl:shrink-0"
                        : ""
                    }`}
                  >
                    <Link
                      to="/contact"
                      className="group/link inline-flex items-center gap-2 text-sm font-semibold text-snow transition duration-300 hover:text-accent"
                    >
                      Inquire About This Service
                      <ArrowUpRight
                        className="size-4 transition duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 text-accent"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

// ─── 3. Work Process (4 Steps) ───────────────────────────────────────────────

function WorkProcess() {
  return (
    <section
      className="border-t border-white/10 bg-navy/40 py-20 sm:py-28"
      aria-labelledby="process-heading"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="process-heading"
            eyebrow="OUR METHODOLOGY"
            title="HOW WE WORK"
            description="Our structured four-step methodology ensures seamless collaboration, strategic alignment, and predictable performance."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((item, index) => {
            const Icon = item.icon
            return (
              <Reveal key={item.step} delay={index * 0.08} className="h-full">
                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/10 bg-panel/80 p-6 sm:p-7 transition duration-300 hover:border-accent/40">
                  {/* Decorative faint step watermark */}
                  <span
                    className="pointer-events-none absolute -right-2 -bottom-4 select-none font-display text-7xl font-extrabold text-white/[0.03]"
                    aria-hidden="true"
                  >
                    {item.step}
                  </span>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-bold tracking-widest text-accent">
                        STEP {item.step}
                      </span>
                      <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-snow">
                        <Icon className="size-4" />
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-xl font-bold text-snow">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent/80">
                      {item.subtitle}
                    </p>
                    <p className="mt-3.5 text-sm leading-relaxed text-mist">
                      {item.description}
                    </p>
                  </div>

                  {/* Visual connector bar */}
                  <div className="mt-8 flex items-center gap-1.5" aria-hidden="true">
                    {[0, 1, 2, 3].map((stepIdx) => (
                      <span
                        key={stepIdx}
                        className={`h-1 flex-1 rounded-full ${
                          stepIdx <= index ? "bg-violet" : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

// ─── 4. Why Choose Our Services (6 Benefits) ──────────────────────────────────

function WhyChooseServices() {
  return (
    <section
      className="border-t border-white/10 py-20 sm:py-28"
      aria-labelledby="benefits-heading"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="benefits-heading"
            eyebrow="THE ADVANTAGE"
            title="WHY WORK WITH US?"
            description="We combine deep technical rigor with creative agility to build marketing solutions that generate real business equity."
          />
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {serviceBenefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Reveal
                key={benefit.title}
                className="h-full"
                delay={Math.min(index * 0.04, 0.16)}
              >
                <article className="group flex h-full flex-col justify-between bg-ink p-7 sm:p-8 transition duration-300 hover:bg-navy/40">
                  <div>
                    <span className="grid size-11 place-items-center rounded-2xl bg-violet/15 text-accent transition duration-300 group-hover:bg-violet group-hover:text-snow">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-bold text-snow">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-mist">
                      {benefit.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-accent/80 tracking-wider uppercase">
                    <span>Guaranteed Standard</span>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

// ─── 5. Final CTA Section ────────────────────────────────────────────────────

function ServicesCTA() {
  const reduce = useReducedMotion()

  return (
    <section className="pb-20 sm:pb-28" aria-labelledby="services-cta-heading">
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
            <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">
              NEXT STEPS
            </p>
            <h2
              id="services-cta-heading"
              className="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-tight text-snow sm:text-4xl lg:text-5xl"
            >
              LET&apos;S GROW YOUR BUSINESS TOGETHER.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-mist sm:text-lg">
              Have a project in mind? Let&apos;s discuss your goals and find the
              right digital solutions for your business.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact" icon>
                START YOUR PROJECT
              </Button>
              <Button to="/work" variant="secondary">
                View Our Portfolio
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <SiteShell>
      <ServicesHero />
      <ServicesOverview />
      <WorkProcess />
      <WhyChooseServices />
      <ServicesCTA />
    </SiteShell>
  )
}
