import AboutPreview from "../components/AboutPreview"
import CTA from "../components/CTA"
import Hero from "../components/Hero"
import Portfolio from "../components/Portfolio"
import Services from "../components/Services"
import SiteShell from "../components/SiteShell"
import Statistics from "../components/Statistics"
import Testimonials from "../components/Testimonials"
import WhyChooseUs from "../components/WhyChooseUs"

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <AboutPreview />
      <Services />
      <Portfolio />
      <WhyChooseUs />
      <Statistics />
      <Testimonials />
      <CTA />
    </SiteShell>
  )
}
