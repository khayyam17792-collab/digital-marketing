import { lazy, Suspense } from "react"
import { MotionConfig } from "framer-motion"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop"
import SEO from "./components/SEO"

const Home = lazy(() => import("./pages/Home"))
const About = lazy(() => import("./pages/About"))
const ServicesPage = lazy(() => import("./pages/Services"))
const WorkPage = lazy(() => import("./pages/Work"))
const ContactPage = lazy(() => import("./pages/Contact"))

function PageLoadingFallback() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <span className="size-8 animate-spin rounded-full border-2 border-violet/20 border-t-accent" />
        <span className="font-display text-xs tracking-widest text-mist uppercase">
          Loading Page...
        </span>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <SEO />
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MotionConfig>
  )
}
