import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { brand } from "../data/content"

const pageMetadata = {
  "/": {
    title: `${brand.name} — Digital Marketing Agency | Ideas. Strategy. Growth.`,
    description:
      "ZENTRO helps businesses build their digital presence and achieve sustainable growth through strategic digital marketing, creative branding, and high-performing websites.",
  },
  "/about": {
    title: `About Us — ${brand.name} | Digital Marketing Agency`,
    description:
      "Learn about ZENTRO's story, mission, vision, and core values. We are your trusted digital growth partner, transforming ideas into measurable business results.",
  },
  "/services": {
    title: `Our Services — ${brand.name} | Digital Marketing & Web Solutions`,
    description:
      "Explore ZENTRO's 7 core capabilities: Digital Marketing Strategy, Social Media Marketing, SEO, Web Design & Development, Paid Ads, Branding, and Content Creation.",
  },
  "/work": {
    title: `Our Work & Portfolio — ${brand.name} | Creative Digital Showcase`,
    description:
      "Explore ZENTRO's selected projects, case studies, and demonstration concepts across web development, social strategy, and brand identities.",
  },
  "/contact": {
    title: `Contact Us — ${brand.name} | Start Your Project`,
    description:
      "Connect with ZENTRO today. Discuss your business goals, request a customized proposal, or chat with our team on WhatsApp.",
  },
}

export default function SEO() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = pageMetadata[pathname] || pageMetadata["/"]

    // Document title
    document.title = meta.title

    // Standard description
    let descTag = document.querySelector('meta[name="description"]')
    if (!descTag) {
      descTag = document.createElement("meta")
      descTag.setAttribute("name", "description")
      document.head.appendChild(descTag)
    }
    descTag.setAttribute("content", meta.description)

    // OpenGraph Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute("content", meta.title)

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute("content", meta.description)

    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute("content", window.location.href)

    // Twitter Title & Description
    const twTitle = document.querySelector('meta[name="twitter:title"]')
    if (twTitle) twTitle.setAttribute("content", meta.title)

    const twDesc = document.querySelector('meta[name="twitter:description"]')
    if (twDesc) twDesc.setAttribute("content", meta.description)
  }, [pathname])

  return null
}
