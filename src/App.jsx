import { lazy, Suspense } from "react"
import { MotionConfig } from "framer-motion"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop"
import SEO from "./components/SEO"

const Home = lazy(() => import("./pages/Home"))
const About = lazy(() => import("./pages/About"))
const ServicesPage = lazy(() => import("./pages/Services"))
const WorkPage = lazy(() => import("./pages/Work"))
const ContactPage = lazy(() => import("./pages/Contact"))
const AdminGuard = lazy(() => import("./components/admin/AdminGuard"))
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"))
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"))
const AdminOverview = lazy(() => import("./pages/admin/AdminOverview"))
const AdminInquiries = lazy(() => import("./pages/admin/AdminInquiries"))
const AdminInquiryDetail = lazy(() => import("./pages/admin/AdminInquiryDetail"))
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"))
const AdminNotifications = lazy(() => import("./pages/admin/AdminNotifications"))

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
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminGuard />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminOverview />} />
                <Route path="inquiries" element={<AdminInquiries key="all" />} />
                <Route
                  path="inquiries/:id"
                  element={<AdminInquiryDetail />}
                />
                <Route
                  path="new"
                  element={
                    <AdminInquiries
                      key="new"
                      heading="New inquiries"
                      description="Follow up on the latest requests from potential clients."
                      defaultStatus="new"
                    />
                  }
                />
                <Route
                  path="clients"
                  element={
                    <AdminInquiries
                      key="clients"
                      heading="Converted clients"
                      description="Manage inquiries that have become ZENTRO clients."
                      defaultStatus="converted"
                    />
                  }
                />
                <Route path="notifications" element={<AdminNotifications />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MotionConfig>
  )
}
