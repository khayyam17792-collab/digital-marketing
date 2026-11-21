import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  Info,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react"
import { useState } from "react"
import Button from "../components/Button"
import Container from "../components/Container"
import Reveal from "../components/Reveal"
import SectionHeading from "../components/SectionHeading"
import SiteShell from "../components/SiteShell"
import { brand } from "../data/content"

// ─── FAQ Dataset ─────────────────────────────────────────────────────────────

const faqItems = [
  {
    id: 1,
    question: "What services does your agency provide?",
    answer:
      "We provide end-to-end digital solutions including Digital Marketing Strategy, Social Media Marketing, Search Engine Optimization (SEO), Website Design & Development, Paid Advertising (Google & Meta Ads), Branding & Creative Design, and Content Creation.",
  },
  {
    id: 2,
    question: "How can I start a project with your agency?",
    answer:
      "Getting started is simple. Fill out our project inquiry form below with your goals and budget, or reach out directly via email or WhatsApp. We will schedule a discovery consultation within 24 business hours to map out your digital roadmap.",
  },
  {
    id: 3,
    question: "Do you work with small businesses?",
    answer:
      "Yes, absolutely. We partner with ambitious startups, growing local companies, and established enterprises alike. We customize our marketing strategies to align with your business size, target audience, and growth targets.",
  },
  {
    id: 4,
    question: "How long does a typical project take?",
    answer:
      "Timelines depend on project scope. A modern business website typically takes 2–4 weeks, brand identity design takes 1–3 weeks, and digital marketing or SEO campaigns operate on ongoing monthly growth cycles with initial setups delivered in week one.",
  },
  {
    id: 5,
    question: "Can I request a customized marketing package?",
    answer:
      "Yes. We don't believe in rigid cookie-cutter plans. Every business has unique strengths and bottlenecks, so we construct tailored service bundles that target exactly where your highest ROI opportunities lie.",
  },
  {
    id: 6,
    question: "How can I get a project quotation?",
    answer:
      "Simply complete our contact form below selecting your required services and budget range. We will analyze your specifications and provide a clear, transparent scope of work and quotation during our follow-up consultation.",
  },
]

// ─── 1. Hero Section ──────────────────────────────────────────────────────────

function ContactHero() {
  const reduce = useReducedMotion()

  return (
    <section
      className="relative overflow-hidden pb-20 pt-14 sm:pt-20 lg:min-h-[calc(100svh-4.25rem)] lg:pb-28"
      aria-labelledby="contact-hero-heading"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/4 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-violet/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-12 top-20 -z-10 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">
            GET IN TOUCH
          </p>
          <h1
            id="contact-hero-heading"
            className="mt-5 max-w-xl font-display text-[2.5rem] font-bold leading-[0.98] tracking-tight text-snow sm:text-6xl lg:text-[4.15rem]"
          >
            LET&apos;S BUILD SOMETHING GREAT TOGETHER.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
            Have a project in mind or looking to grow your business online? We&apos;d
            love to hear from you. Tell us about your goals, and let&apos;s
            create something amazing together.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="#contact-form" icon>
              START A CONVERSATION
            </Button>
            <Button to="/services" variant="secondary">
              Explore Our Services
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-6 border-t border-white/10 pt-6">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs text-snow font-medium">Accepting New Projects</p>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <p className="text-xs text-mist">
              Direct Senior-Level Consultation
            </p>
          </div>
        </motion.div>

        {/* Hero Visual Card / Quick Reach */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative rounded-[2rem] border border-white/10 bg-panel/90 p-6 shadow-[0_40px_90px_-48px_rgba(0,0,0,0.85)] sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-violet/20 text-accent">
                  <Sparkles className="size-4" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold tracking-wider text-mist uppercase">
                    Direct Line
                  </p>
                  <p className="font-display text-sm font-bold text-snow">
                    Get In Touch Today
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
                Fast Response
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/5 bg-ink/70 p-4 transition hover:border-accent/40">
                <p className="text-[11px] font-semibold tracking-wider text-accent uppercase">
                  Primary Email
                </p>
                <p className="mt-1 font-display text-base font-bold text-snow">
                  {brand.email}
                </p>
                <p className="mt-1 text-xs text-mist">
                  Inquiries, proposals & partnerships
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-ink/70 p-4 transition hover:border-accent/40">
                <p className="text-[11px] font-semibold tracking-wider text-accent uppercase">
                  Direct Phone / WhatsApp
                </p>
                <p className="mt-1 font-display text-base font-bold text-snow">
                  {brand.phone}
                </p>
                <p className="mt-1 text-xs text-mist">
                  Mon – Fri during standard business hours
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-violet/10 border border-violet/20 p-3.5 flex items-center justify-between text-xs">
              <span className="text-mist">Quickest way to reach us:</span>
              <a
                href={`https://wa.me/${brand.whatsappNumber.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-accent hover:underline flex items-center gap-1"
              >
                Chat on WhatsApp <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─── 2. Contact Information Cards ─────────────────────────────────────────────

function ContactInfoCards() {
  const whatsappUrl = `https://wa.me/${brand.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hello! I am interested in your digital marketing services.",
  )}`

  return (
    <section
      className="border-t border-white/10 py-20 sm:py-28"
      aria-labelledby="info-heading"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="info-heading"
            eyebrow="COMMUNICATION CHANNELS"
            title="WE'RE HERE TO HELP YOUR BUSINESS GROW."
            description="Whether you prefer an email inquiry, a phone discussion, or a quick WhatsApp chat, we are ready to connect."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Email */}
          <Reveal delay={0}>
            <article className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-panel/75 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/40 sm:p-7">
              <div>
                <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-accent transition duration-300 group-hover:bg-violet group-hover:text-snow">
                  <Mail className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-snow">
                  EMAIL US
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  Have questions or project inquiries? Send us an email.
                </p>
              </div>
              <div className="mt-6 border-t border-white/10 pt-4">
                <a
                  href={`mailto:${brand.email}`}
                  className="font-medium text-sm text-snow hover:text-accent transition break-all"
                >
                  {brand.email}
                </a>
                <p className="mt-1 text-[11px] text-mist/60">
                  (Editable placeholder)
                </p>
              </div>
            </article>
          </Reveal>

          {/* Card 2: Call */}
          <Reveal delay={0.06}>
            <article className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-panel/75 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/40 sm:p-7">
              <div>
                <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-accent transition duration-300 group-hover:bg-violet group-hover:text-snow">
                  <Phone className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-snow">
                  CALL US
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  Speak with us about your business requirements.
                </p>
              </div>
              <div className="mt-6 border-t border-white/10 pt-4">
                <a
                  href={`tel:${brand.phone.replace(/[^0-9+]/g, "")}`}
                  className="font-medium text-sm text-snow hover:text-accent transition"
                >
                  {brand.phone}
                </a>
                <p className="mt-1 text-[11px] text-mist/60">
                  (Editable placeholder)
                </p>
              </div>
            </article>
          </Reveal>

          {/* Card 3: WhatsApp */}
          <Reveal delay={0.12}>
            <article className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-panel/75 p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/40 sm:p-7">
              <div>
                <span className="grid size-12 place-items-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 transition duration-300 group-hover:bg-emerald-500 group-hover:text-ink">
                  <MessageCircle className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-snow">
                  WHATSAPP
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  Connect with us directly through WhatsApp.
                </p>
              </div>
              <div className="mt-6 border-t border-white/10 pt-4">
                <Button
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-ink text-xs font-bold py-2.5 shadow-none"
                >
                  CHAT ON WHATSAPP
                </Button>
                <p className="mt-1.5 text-center text-[10px] text-mist/60">
                  Phone: {brand.whatsappNumber} (Placeholder)
                </p>
              </div>
            </article>
          </Reveal>

          {/* Card 4: Location */}
          <Reveal delay={0.18}>
            <article className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-panel/75 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/40 sm:p-7">
              <div>
                <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-accent transition duration-300 group-hover:bg-violet group-hover:text-snow">
                  <MapPin className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-snow">
                  LOCATION
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  Find out where our agency is based.
                </p>
              </div>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="font-medium text-sm text-snow">{brand.location}</p>
                <p className="mt-1 text-[11px] text-mist/60">
                  (Editable placeholder)
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

// ─── 3. Contact Form Section ──────────────────────────────────────────────────

const servicesList = [
  "Digital Marketing",
  "Social Media Marketing",
  "SEO",
  "Website Design & Development",
  "Google Ads",
  "Facebook & Instagram Ads",
  "Branding & Creative Design",
  "Content Creation",
  "Other",
]

const budgetRanges = [
  "Under $100",
  "$100 - $500",
  "$500 - $1,000",
  "$1,000 - $5,000",
  "$5,000+",
  "Not Sure Yet",
]

function ContactFormSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    serviceRequired: "",
    projectBudget: "",
    projectDetails: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)

  const validate = () => {
    const errs = {}
    if (!formData.fullName.trim()) {
      errs.fullName = "Full name is required."
    }
    if (!formData.email.trim()) {
      errs.email = "Email address is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address."
    }
    if (!formData.serviceRequired) {
      errs.serviceRequired = "Please select a required service."
    }
    if (!formData.projectDetails.trim()) {
      errs.projectDetails = "Please provide details about your project."
    } else if (formData.projectDetails.trim().length < 10) {
      errs.projectDetails = "Please enter at least 10 characters."
    }
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    // Simulate clean dispatch without faking external email delivery
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmittedData({ ...formData })
    }, 800)
  }

  const handleReset = () => {
    setSubmittedData(null)
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      serviceRequired: "",
      projectBudget: "",
      projectDetails: "",
    })
    setErrors({})
  }

  return (
    <section
      id="contact-form"
      className="border-t border-white/10 py-20 sm:py-28 scroll-mt-20"
      aria-labelledby="form-heading"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">
              PROJECT INQUIRY
            </p>
            <h2
              id="form-heading"
              className="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-tight text-snow sm:text-4xl lg:text-[2.75rem]"
            >
              TELL US ABOUT YOUR PROJECT.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-mist sm:text-lg">
              Share a few details about your business and what you&apos;re looking to
              achieve. Our team will get back to you.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="rounded-[2rem] border border-white/10 bg-panel/80 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
            {submittedData ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center py-6"
              >
                <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="size-8" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-snow">
                    Inquiry Captured (Demo Mode)
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist max-w-md mx-auto">
                    Thank you, <span className="text-snow font-semibold">{submittedData.fullName}</span>!
                    Your form submission was validated successfully on the frontend.
                  </p>
                </div>

                {/* Integration notice */}
                <div className="rounded-2xl border border-white/10 bg-ink/70 p-4 text-left max-w-lg mx-auto text-xs space-y-2">
                  <div className="flex items-center gap-2 text-accent font-semibold">
                    <Info className="size-4 shrink-0" />
                    <span>Developer Integration Note:</span>
                  </div>
                  <p className="text-mist leading-relaxed">
                    This form is ready for a real endpoint (e.g. Formspree, Resend, or your custom API). No mock emails were sent. Captured payload:
                  </p>
                  <pre className="overflow-x-auto rounded-lg bg-black/50 p-2 font-mono text-[11px] text-accent/90">
                    {JSON.stringify(
                      {
                        name: submittedData.fullName,
                        email: submittedData.email,
                        service: submittedData.serviceRequired,
                        budget: submittedData.projectBudget || "Unspecified",
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>

                <div className="pt-2">
                  <Button onClick={handleReset} variant="secondary">
                    Send Another Inquiry
                  </Button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold tracking-wider text-snow uppercase mb-2"
                    >
                      Full Name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`w-full rounded-xl border bg-ink/60 px-4 py-3 text-sm text-snow placeholder:text-mist/50 focus:outline-none transition ${
                        errors.fullName
                          ? "border-red-500/80 focus:border-red-500"
                          : "border-white/10 focus:border-accent"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                        <AlertCircle className="size-3" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold tracking-wider text-snow uppercase mb-2"
                    >
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className={`w-full rounded-xl border bg-ink/60 px-4 py-3 text-sm text-snow placeholder:text-mist/50 focus:outline-none transition ${
                        errors.email
                          ? "border-red-500/80 focus:border-red-500"
                          : "border-white/10 focus:border-accent"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                        <AlertCircle className="size-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold tracking-wider text-snow uppercase mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-sm text-snow placeholder:text-mist/50 focus:border-accent focus:outline-none transition"
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-xs font-semibold tracking-wider text-snow uppercase mb-2"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Enter your company name"
                      className="w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-sm text-snow placeholder:text-mist/50 focus:border-accent focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Service Required */}
                  <div>
                    <label
                      htmlFor="serviceRequired"
                      className="block text-xs font-semibold tracking-wider text-snow uppercase mb-2"
                    >
                      Service Required <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="serviceRequired"
                        name="serviceRequired"
                        value={formData.serviceRequired}
                        onChange={handleChange}
                        className={`w-full appearance-none rounded-xl border bg-ink/60 px-4 py-3 text-sm text-snow focus:outline-none transition pr-10 ${
                          errors.serviceRequired
                            ? "border-red-500/80 focus:border-red-500"
                            : "border-white/10 focus:border-accent"
                        } ${!formData.serviceRequired ? "text-mist/60" : "text-snow"}`}
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        {servicesList.map((service) => (
                          <option
                            key={service}
                            value={service}
                            className="bg-navy text-snow"
                          >
                            {service}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-mist" />
                    </div>
                    {errors.serviceRequired && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                        <AlertCircle className="size-3" /> {errors.serviceRequired}
                      </p>
                    )}
                  </div>

                  {/* Project Budget */}
                  <div>
                    <label
                      htmlFor="projectBudget"
                      className="block text-xs font-semibold tracking-wider text-snow uppercase mb-2"
                    >
                      Project Budget
                    </label>
                    <div className="relative">
                      <select
                        id="projectBudget"
                        name="projectBudget"
                        value={formData.projectBudget}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-sm text-snow focus:border-accent focus:outline-none transition pr-10"
                      >
                        <option value="" disabled>
                          Select estimated budget
                        </option>
                        {budgetRanges.map((range) => (
                          <option
                            key={range}
                            value={range}
                            className="bg-navy text-snow"
                          >
                            {range}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-mist" />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label
                    htmlFor="projectDetails"
                    className="block text-xs font-semibold tracking-wider text-snow uppercase mb-2"
                  >
                    Project Details <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="projectDetails"
                    name="projectDetails"
                    rows={4}
                    value={formData.projectDetails}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, and requirements."
                    className={`w-full rounded-xl border bg-ink/60 px-4 py-3 text-sm text-snow placeholder:text-mist/50 focus:outline-none transition ${
                      errors.projectDetails
                        ? "border-red-500/80 focus:border-red-500"
                        : "border-white/10 focus:border-accent"
                    }`}
                  />
                  {errors.projectDetails && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                      <AlertCircle className="size-3" /> {errors.projectDetails}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 text-base"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="size-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                        PROCESSING INQUIRY...
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        SEND MESSAGE <Send className="size-4" />
                      </span>
                    )}
                  </Button>
                  <p className="mt-3 text-center text-[11px] text-mist">
                    🔒 Form is configured in demo mode. All fields validated. Ready for Formspree / API integration.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─── 4. Business Availability Section ─────────────────────────────────────────

function BusinessAvailability() {
  return (
    <section
      className="border-t border-white/10 bg-navy/40 py-20 sm:py-24"
      aria-labelledby="availability-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">
              OPERATIONAL DETAILS
            </p>
            <h2
              id="availability-heading"
              className="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-tight text-snow sm:text-4xl"
            >
              LET&apos;S TALK ABOUT YOUR NEXT BIG IDEA.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-mist">
              We work closely with clients around the world. Whether you need an
              introductory discovery session or a detailed quotation, our team
              is on standby to respond promptly.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-panel/70 p-6">
              <span className="grid size-10 place-items-center rounded-xl bg-violet/20 text-accent">
                <Clock className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-snow">
                Business Hours
              </h3>
              <p className="mt-1 text-sm text-mist">{brand.hours}</p>
              <p className="mt-2 text-[11px] text-mist/60">(Editable placeholder)</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-panel/70 p-6">
              <span className="grid size-10 place-items-center rounded-xl bg-violet/20 text-accent">
                <Calendar className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-snow">
                Expected Response
              </h3>
              <p className="mt-1 text-sm text-mist">{brand.responseTime}</p>
              <p className="mt-2 text-[11px] text-mist/60">(Editable placeholder)</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─── 5. FAQ Section (Accordion) ───────────────────────────────────────────────

function FAQSection() {
  const [openId, setOpenId] = useState(1)

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      className="border-t border-white/10 py-20 sm:py-28"
      aria-labelledby="faq-heading"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="faq-heading"
            eyebrow="COMMON QUESTIONS"
            title="FREQUENTLY ASKED QUESTIONS."
            description="Find answers to common questions about our agency services, pricing methodology, and onboarding process."
          />
        </Reveal>

        <div className="mt-14 max-w-3xl space-y-4">
          {faqItems.map((item) => {
            const isOpen = openId === item.id

            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-panel/60 transition duration-300 hover:border-white/20"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between p-6 text-left"
                >
                  <span className="font-display text-base sm:text-lg font-bold text-snow pr-4">
                    {item.question}
                  </span>
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-full bg-white/5 transition duration-300 ${
                      isOpen ? "rotate-180 bg-violet text-snow" : "text-mist"
                    }`}
                  >
                    <ChevronDown className="size-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="border-t border-white/10 px-6 pb-6 pt-4 text-sm leading-relaxed text-mist">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

// ─── 6. Final CTA Section ────────────────────────────────────────────────────

function ContactFinalCTA() {
  const reduce = useReducedMotion()

  return (
    <section className="pb-20 sm:pb-28" aria-labelledby="contact-cta-heading">
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
              TAKE ACTION
            </p>
            <h2
              id="contact-cta-heading"
              className="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-tight text-snow sm:text-4xl lg:text-5xl"
            >
              YOUR NEXT BIG MOVE STARTS HERE.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-mist sm:text-lg">
              Let&apos;s turn your business goals into a powerful digital strategy.
              We&apos;re ready when you are.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="#contact-form" icon>
                LET&apos;S WORK TOGETHER
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

export default function ContactPage() {
  return (
    <SiteShell>
      <ContactHero />
      <ContactInfoCards />
      <ContactFormSection />
      <BusinessAvailability />
      <FAQSection />
      <ContactFinalCTA />
    </SiteShell>
  )
}
