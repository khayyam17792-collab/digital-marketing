import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  ArrowUpRight,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import Button from "../components/Button"
import Container from "../components/Container"
import Reveal from "../components/Reveal"
import SiteShell from "../components/SiteShell"

// ─── Filter Categories ────────────────────────────────────────────────────────

const categories = [
  "All Projects",
  "Website Design",
  "Social Media Marketing",
  "Branding",
  "Digital Marketing",
  "Creative Design",
]

// ─── Project Visual Renderers (High-fidelity CSS/SVG Mockups) ────────────────

function ModernWebsiteVisual() {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-[radial-gradient(ellipse_at_top,_rgba(122,104,242,0.3)_0%,_transparent_60%),linear-gradient(160deg,#141b2f_0%,#090d16_100%)] p-5">
      {/* Browser chrome header */}
      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-red-400/80" />
          <span className="size-2 rounded-full bg-amber-400/80" />
          <span className="size-2 rounded-full bg-emerald-400/80" />
        </div>
        <div className="h-3 w-32 rounded-full bg-white/10 text-center text-[8px] text-mist/60 leading-3">
          agency-enterprise.com
        </div>
        <div className="size-2 rounded-full bg-accent/30" />
      </div>

      {/* Website Hero Preview */}
      <div className="my-auto rounded-xl border border-white/10 bg-ink/80 p-4 shadow-2xl">
        <div className="flex items-center justify-between pb-3">
          <div className="space-y-1">
            <div className="h-2 w-12 rounded bg-accent" />
            <div className="h-4 w-36 rounded bg-snow/90" />
          </div>
          <span className="rounded-full bg-violet/30 px-2 py-0.5 text-[9px] text-accent">
            Live Demo
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="h-14 rounded-lg bg-white/5 border border-white/5 p-2 flex flex-col justify-end">
            <div className="h-1.5 w-8 rounded bg-white/40 mb-1" />
            <div className="h-2 w-12 rounded bg-accent" />
          </div>
          <div className="h-14 rounded-lg bg-violet/20 border border-violet/30 p-2 flex flex-col justify-end">
            <div className="h-1.5 w-6 rounded bg-white/40 mb-1" />
            <div className="h-2 w-10 rounded bg-white" />
          </div>
          <div className="h-14 rounded-lg bg-white/5 border border-white/5 p-2 flex flex-col justify-end">
            <div className="h-1.5 w-10 rounded bg-white/40 mb-1" />
            <div className="h-2 w-7 rounded bg-accent" />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] text-mist/70 pt-1">
        <span>Responsive UI / 60fps</span>
        <span className="text-accent font-mono font-medium">99.8% Speed Score</span>
      </div>
    </div>
  )
}

function SocialCampaignVisual() {
  return (
    <div className="relative flex h-full flex-col justify-center overflow-hidden bg-[linear-gradient(135deg,#1f1638_0%,#111628_100%)] p-5">
      <div className="relative mx-auto w-full max-w-[240px]">
        {/* Floating Social Post Card 1 */}
        <div className="relative z-10 rounded-2xl border border-white/15 bg-panel/90 p-3.5 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="size-6 rounded-full bg-gradient-to-tr from-violet to-accent" />
            <div>
              <div className="h-2 w-16 rounded bg-snow/80" />
              <div className="mt-1 h-1.5 w-10 rounded bg-mist/40" />
            </div>
          </div>
          <div className="h-20 w-full rounded-xl bg-gradient-to-br from-violet/70 via-indigo-600/50 to-accent/60 p-2 flex items-end">
            <span className="rounded bg-black/40 px-2 py-0.5 text-[8px] font-semibold text-snow">
              #ViralGrowth
            </span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[10px] text-mist">
            <span className="text-accent font-semibold">❤️ 24.8k Likes</span>
            <span>💬 842 Comments</span>
          </div>
        </div>

        {/* Backdrop card */}
        <div className="absolute -right-3 -top-3 z-0 w-full rounded-2xl border border-white/10 bg-white/5 p-3.5 opacity-60 filter blur-[0.5px]" />
      </div>
    </div>
  )
}

function BrandIdentityVisual() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,_rgba(201,191,255,0.18)_0%,_transparent_70%),linear-gradient(180deg,#12192d_0%,#090d15_100%)] p-6">
      <div className="text-center">
        {/* Monogram emblem */}
        <div className="mx-auto flex size-20 items-center justify-center rounded-3xl border border-white/20 bg-gradient-to-br from-violet to-blue-bright shadow-[0_20px_40px_-15px_rgba(37,99,235,0.6)]">
          <span className="font-display text-4xl font-black tracking-tighter text-snow">
            Z
          </span>
          <span className="absolute -top-1 -right-1 size-3 rounded-full bg-accent" />
        </div>

        <p className="mt-4 font-display text-sm font-bold tracking-[0.22em] text-snow">
          ZENTRO IDENTITY
        </p>
        <p className="mt-1 text-[11px] font-semibold tracking-widest text-accent uppercase">
          Brand Guideline System
        </p>

        {/* Color swatches */}
        <div className="mt-4 flex justify-center gap-1.5" aria-hidden="true">
          <span className="size-4 rounded-full bg-violet ring-2 ring-white/10" title="Electric Blue #2563EB" />
          <span className="size-4 rounded-full bg-ink ring-2 ring-white/10" title="Midnight Navy #101828" />
          <span className="size-4 rounded-full bg-snow ring-2 ring-white/10" title="Cloud White #F8FAFC" />
          <span className="size-4 rounded-full bg-mist ring-2 ring-white/10" title="Slate Grey #94A3B8" />
        </div>
      </div>
    </div>
  )
}

function DigitalGrowthVisual() {
  return (
    <div className="relative flex h-full flex-col justify-end overflow-hidden bg-[linear-gradient(155deg,#171e35_0%,#0c1221_100%)] p-5">
      <div className="rounded-xl border border-white/10 bg-ink/75 p-3.5 backdrop-blur-sm">
        <div className="flex items-center justify-between pb-2">
          <p className="text-[11px] font-semibold text-mist uppercase tracking-wider">
            Conversion Velocity
          </p>
          <span className="text-[11px] font-bold text-accent">+342%</span>
        </div>

        {/* Graph SVG representation */}
        <svg viewBox="0 0 300 90" className="h-20 w-full" aria-hidden="true">
          <defs>
            <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c9bfff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#5c47e6" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M0,80 Q50,75 100,55 T200,35 T300,8 L300,90 L0,90 Z"
            fill="url(#growth-fill)"
          />
          <path
            d="M0,80 Q50,75 100,55 T200,35 T300,8"
            fill="none"
            stroke="#c9bfff"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        <div className="mt-2 flex justify-between border-t border-white/10 pt-2 text-[10px] text-mist">
          <span>Q1 Baseline</span>
          <span className="text-snow font-semibold">Q4 Scale Reach</span>
        </div>
      </div>
    </div>
  )
}

function CreativeAdVisual() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_20%_30%,rgba(122,104,242,0.4)_0%,transparent_50%),linear-gradient(135deg,#1c1538_0%,#0f1424_100%)] p-6">
      <div className="w-full max-w-[250px] rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md">
        <div className="relative h-24 overflow-hidden rounded-xl bg-gradient-to-tr from-violet via-purple-600 to-accent/80 p-3 flex flex-col justify-between">
          <span className="self-start rounded-full bg-white/20 px-2 py-0.5 text-[8px] font-bold tracking-wider text-snow uppercase">
            Promo
          </span>
          <p className="font-display text-sm font-bold leading-tight text-snow">
            THE FUTURE OF <br />CREATIVE MEDIA
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-2 w-20 rounded bg-white/80" />
            <div className="h-1.5 w-12 rounded bg-mist/50" />
          </div>
          <span className="rounded-lg bg-accent px-2.5 py-1 text-[10px] font-bold text-ink">
            DISCOVER
          </span>
        </div>
      </div>
    </div>
  )
}

function EcommerceVisual() {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-[linear-gradient(160deg,#151e33_0%,#0a0f1c_100%)] p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-xs font-semibold">
        <span className="text-snow tracking-wider uppercase font-display text-[11px]">
          LUMEN STORE
        </span>
        <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] text-accent">
          Cart (3)
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 my-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-center">
          <div className="mx-auto h-12 w-12 rounded-lg bg-violet/40 mb-2 flex items-center justify-center">
            <span className="text-xs">⚡</span>
          </div>
          <div className="h-2 w-14 rounded bg-white/70 mx-auto" />
          <p className="mt-1 text-[11px] font-bold text-snow">$189.00</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-center">
          <div className="mx-auto h-12 w-12 rounded-lg bg-accent/30 mb-2 flex items-center justify-center">
            <span className="text-xs">✨</span>
          </div>
          <div className="h-2 w-14 rounded bg-white/70 mx-auto" />
          <p className="mt-1 text-[11px] font-bold text-snow">$245.00</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-mist/80">
        <span>Stripe Integrated</span>
        <span className="text-emerald-400 font-semibold">1-Click Checkout</span>
      </div>
    </div>
  )
}

function InstagramCampaignVisual() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,191,255,0.2)_0%,_transparent_60%),linear-gradient(135deg,#1f1335_0%,#0d1120_100%)] p-5">
      <div className="grid grid-cols-3 gap-2 w-full max-w-[260px]">
        {[
          { label: "Story 01", gradient: "from-violet to-purple-600" },
          { label: "Story 02", gradient: "from-purple-600 to-accent" },
          { label: "Story 03", gradient: "from-accent to-violet" },
        ].map((story, i) => (
          <div
            key={story.label}
            className={`aspect-[9/16] rounded-xl border border-white/15 bg-gradient-to-b ${story.gradient} p-2 flex flex-col justify-between shadow-lg ${
              i === 1 ? "scale-105 z-10 ring-2 ring-accent/60" : "opacity-80"
            }`}
          >
            <div className="flex gap-1">
              <span className="h-0.5 flex-1 rounded bg-white/80" />
              <span className="h-0.5 flex-1 rounded bg-white/40" />
            </div>
            <div className="text-[8px] font-bold text-snow leading-tight">
              AESTHETIC SERIES
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BusinessBrandingVisual() {
  return (
    <div className="relative flex h-full flex-col justify-center items-center overflow-hidden bg-[linear-gradient(145deg,#131a2e_0%,#080c16_100%)] p-6">
      <div className="w-full max-w-[240px] rounded-2xl border border-white/15 bg-white/5 p-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-tr from-violet to-accent flex items-center justify-center font-display font-bold text-snow text-lg">
            B
          </div>
          <div>
            <h4 className="font-display text-sm font-bold text-snow">
              BEACON CORP
            </h4>
            <p className="text-[10px] text-accent tracking-wider uppercase font-semibold">
              Corporate Standard
            </p>
          </div>
        </div>
        <div className="mt-3.5 space-y-1.5 border-t border-white/10 pt-3 text-[10px] text-mist">
          <div className="flex justify-between">
            <span>Primary Typography</span>
            <span className="text-snow font-semibold">Space Grotesk</span>
          </div>
          <div className="flex justify-between">
            <span>Body Typography</span>
            <span className="text-snow font-semibold">Inter Sans</span>
          </div>
          <div className="flex justify-between">
            <span>Palette Balance</span>
            <span className="text-snow font-semibold">Midnight Navy &amp; Electric Blue</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Project Database (All 8 requested projects) ─────────────────────────────

const portfolioProjects = [
  {
    id: 1,
    title: "Modern Business Website",
    category: "Website Design",
    description:
      "A modern business website concept focused on professional branding and user experience.",
    visual: ModernWebsiteVisual,
    tags: ["UI/UX", "Responsive", "React"],
    metric: "3.2s → 0.8s Load Speed",
  },
  {
    id: 2,
    title: "Social Media Campaign",
    category: "Social Media Marketing",
    description:
      "A creative social media campaign concept designed to improve brand engagement.",
    visual: SocialCampaignVisual,
    tags: ["Strategy", "Community", "Reels"],
    metric: "+240% Engagement Rate",
  },
  {
    id: 3,
    title: "Brand Identity Design",
    category: "Branding",
    description:
      "A complete visual identity concept including logo, colors, and brand elements.",
    visual: BrandIdentityVisual,
    tags: ["Visual Identity", "Typography", "Kit"],
    metric: "Complete Rebrand System",
  },
  {
    id: 4,
    title: "Digital Growth Campaign",
    category: "Digital Marketing",
    description:
      "A sample digital marketing strategy focused on online visibility and audience growth.",
    visual: DigitalGrowthVisual,
    tags: ["SEO", "Performance", "Funnel"],
    metric: "+342% Organic Inquiries",
  },
  {
    id: 5,
    title: "Creative Advertising Design",
    category: "Creative Design",
    description:
      "Modern advertising visuals designed to communicate brand messages effectively.",
    visual: CreativeAdVisual,
    tags: ["Meta Ads", "Motion", "Copy"],
    metric: "4.8x Return On Ad Spend",
  },
  {
    id: 6,
    title: "E-Commerce Website",
    category: "Website Design",
    description:
      "A modern e-commerce website concept with a clean shopping experience.",
    visual: EcommerceVisual,
    tags: ["E-Commerce", "Conversion", "Checkout"],
    metric: "+48% Conversion Rate",
  },
  {
    id: 7,
    title: "Instagram Brand Campaign",
    category: "Social Media Marketing",
    description:
      "A visually engaging Instagram marketing campaign concept.",
    visual: InstagramCampaignVisual,
    tags: ["Content Calendar", "Stories", "Viral"],
    metric: "+65k Organic Followers",
  },
  {
    id: 8,
    title: "Business Branding",
    category: "Branding",
    description:
      "A professional branding concept designed to establish a recognizable business identity.",
    visual: BusinessBrandingVisual,
    tags: ["Corporate", "Guidelines", "Stationery"],
    metric: "Multi-Touchpoint Rollout",
  },
]

// ─── 1. Portfolio Hero Section ───────────────────────────────────────────────

function PortfolioHero() {
  const reduce = useReducedMotion()

  return (
    <section
      className="relative overflow-hidden pb-20 pt-14 sm:pt-20 lg:min-h-[calc(100svh-4.25rem)] lg:pb-28"
      aria-labelledby="portfolio-hero-heading"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/3 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-violet/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-10 top-1/4 -z-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">
            OUR PORTFOLIO
          </p>
          <h1
            id="portfolio-hero-heading"
            className="mt-5 max-w-xl font-display text-[2.5rem] font-bold leading-[0.98] tracking-tight text-snow sm:text-6xl lg:text-[4rem]"
          >
            CREATIVE IDEAS. POWERFUL DIGITAL EXPERIENCES.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
            Explore our creative work, digital strategies, and innovative solutions
            designed to help businesses build stronger brands and grow online.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="#projects-gallery" icon>
              Explore Projects
            </Button>
            <Button to="/contact" variant="secondary">
              Start a Project
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-8 border-t border-white/10 pt-6">
            <div>
              <p className="font-display text-2xl font-bold text-snow">8+</p>
              <p className="text-xs text-mist">Curated Case Studies</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="font-display text-2xl font-bold text-snow">100%</p>
              <p className="text-xs text-mist">Custom Concepts</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="font-display text-2xl font-bold text-accent">Award-Grade</p>
              <p className="text-xs text-mist">Design Rigor</p>
            </div>
          </div>
        </motion.div>

        {/* Hero Visual Collage */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative rounded-[2rem] border border-white/10 bg-panel/90 p-5 shadow-[0_40px_90px_-48px_rgba(0,0,0,0.85)] sm:p-6">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-accent" />
                <span className="text-xs font-semibold tracking-wider text-snow uppercase">
                  Featured Showcase
                </span>
              </div>
              <span className="rounded-full bg-violet/20 px-3 py-1 text-xs text-accent">
                Demonstration Suite
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <ModernWebsiteVisual />
              </div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <BrandIdentityVisual />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-ink/70 p-3 border border-white/5">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-violet/20 text-accent">
                  <TrendingUp className="size-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-snow">High Performance</p>
                  <p className="text-[10px] text-mist">Multi-disciplinary outcomes</p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-accent">PROD READY</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─── 2. Portfolio Introduction & Interactive Gallery ─────────────────────────

function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState("All Projects")
  const reduce = useReducedMotion()

  const filteredProjects =
    activeCategory === "All Projects"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory)

  return (
    <section
      id="projects-gallery"
      className="border-t border-white/10 py-20 sm:py-28 scroll-mt-20"
      aria-labelledby="portfolio-gallery-heading"
    >
      <Container>
        <Reveal>
          <div className="text-center mx-auto max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">
              SHOWCASE ARCHIVE
            </p>
            <h2
              id="portfolio-gallery-heading"
              className="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-tight text-snow sm:text-4xl lg:text-[2.75rem]"
            >
              OUR WORK SPEAKS FOR OUR CREATIVITY.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-mist sm:text-lg">
              Every project is an opportunity to create something meaningful. We
              focus on combining creativity, strategy, and technology to deliver
              impactful digital experiences.
            </p>
          </div>
        </Reveal>

        {/* ─── 3. Filter Buttons ────────────────────────────────────────── */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`relative cursor-pointer rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition duration-300 ${
                  isActive
                    ? "text-snow"
                    : "border border-white/10 bg-white/5 text-mist hover:border-white/20 hover:text-snow"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeFilterPill"
                    className="absolute inset-0 rounded-full bg-violet shadow-[0_8px_24px_-10px_rgba(92,71,230,0.9)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            )
          })}
        </div>

        {/* ─── 4. Project Grid ───────────────────────────────────────────── */}
        <motion.div
          layout
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const VisualComponent = project.visual

              return (
                <motion.article
                  layout
                  key={project.id}
                  initial={reduce ? false : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? false : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/10 bg-panel/70 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_24px_50px_-32px_rgba(92,71,230,0.75)]"
                >
                  {/* High Quality Visual Frame */}
                  <div className="aspect-[16/10] w-full overflow-hidden border-b border-white/10">
                    <div className="h-full w-full transition duration-700 group-hover:scale-[1.03]">
                      <VisualComponent />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
                          {project.category}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold text-mist uppercase">
                          {project.metric}
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-2xl font-bold text-snow">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-mist">
                        {project.description}
                      </p>

                      {/* Tag badges */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg bg-ink/60 px-2.5 py-1 text-xs text-mist border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                      <Link
                        to="/contact"
                        className="group/btn inline-flex items-center gap-1.5 text-sm font-semibold text-snow transition hover:text-accent"
                      >
                        Request Similar Project
                        <ArrowUpRight
                          className="size-4 text-accent transition duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                      <span className="text-[11px] font-mono text-mist/60">
                        Concept #{project.id}
                      </span>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  )
}

// ─── 5. Final CTA Section ────────────────────────────────────────────────────

function PortfolioCTA() {
  const reduce = useReducedMotion()

  return (
    <section className="pb-20 sm:pb-28" aria-labelledby="portfolio-cta-heading">
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
              START COLLABORATION
            </p>
            <h2
              id="portfolio-cta-heading"
              className="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-tight text-snow sm:text-4xl lg:text-5xl"
            >
              READY TO BRING YOUR VISION TO LIFE?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-mist sm:text-lg">
              Let&apos;s build an extraordinary digital experience that accelerates
              your growth and sets your brand apart.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact" icon>
                START YOUR PROJECT
              </Button>
              <Button to="/services" variant="secondary">
                EXPLORE OUR SERVICES
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function WorkPage() {
  return (
    <SiteShell>
      <PortfolioHero />
      <PortfolioGallery />
      <PortfolioCTA />
    </SiteShell>
  )
}
