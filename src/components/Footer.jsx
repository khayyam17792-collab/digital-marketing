import {
  Globe2,
  Link2,
  Mail,
  MapPin,
  Phone,
  PlayCircle,
  Share2,
} from "lucide-react"
import { Link } from "react-router-dom"
import {
  brand,
  footerServices,
  navLinks,
  socials,
} from "../data/content"
import Container from "./Container"
import Logo from "./Logo"

const socialIcons = { Instagram: Share2, Facebook: Globe2, Linkedin: Link2, Youtube: PlayCircle }

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
            {brand.description}
          </p>
          <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold tracking-wider text-accent uppercase">
            <span className="size-1.5 rounded-full bg-accent" />
            <span>{brand.tagline}</span>
          </div>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-2">
              {socials.map((social) => {
                const Icon = socialIcons[social.icon]
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="grid size-10 place-items-center rounded-full border border-white/10 text-mist transition duration-300 hover:border-white/25 hover:text-snow"
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-[0.16em] text-snow">QUICK LINKS</h2>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-mist transition hover:text-snow">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-[0.16em] text-snow">SERVICES</h2>
          <ul className="mt-5 space-y-3">
            {footerServices.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-sm text-mist transition hover:text-snow">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-[0.16em] text-snow">CONTACT</h2>
          <ul className="mt-5 space-y-4 text-sm text-mist">
            {brand.email && (
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={`mailto:${brand.email}`} className="hover:text-snow">
                  {brand.email}
                </a>
              </li>
            )}
            {brand.phone && (
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={`tel:${brand.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-snow">
                  {brand.phone}
                </a>
              </li>
            )}
            {brand.location && (
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{brand.location}</span>
              </li>
            )}
            {!brand.email && !brand.phone && !brand.location && (
              <li>
                <Link to="/contact#contact-form" className="hover:text-snow">
                  Use the project inquiry form
                </Link>
              </li>
            )}
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-5 text-xs text-mist">
          © 2026 {brand.name}. All Rights Reserved.
        </Container>
      </div>
    </footer>
  )
}
