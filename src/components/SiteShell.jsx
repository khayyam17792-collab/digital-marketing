import Footer from "./Footer"
import Navbar from "./Navbar"

export default function SiteShell({ children }) {
  return (
    <div className="min-h-screen bg-ink text-snow">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-snow focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </div>
  )
}
