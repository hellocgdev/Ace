import React, { useState, useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import BlogPage from "./components/BlogPage";
import BlogPostLayout from "./components/BlogPostLayout";
import CommunityPage from "./components/CommunityPage";
import ApplyPage from "./components/ApplyPage";
import PerksPage from "./components/PerksPage";
import FaqPage from "./components/FaqPage";
import LoginPage from "./components/LoginPage";
import UploadArticlePage from "./components/UploadArticlePage";
import BlogPostWrapper from "./components/BlogPostWrapper";
import Dashboard from "./components/Dashboard";
import PricingPage from "./components/PricingPage";
import PaymentGatewayPage from "./components/PaymentGatewayPage";
// import UploadArticlePage2 from "./components/UploadArticlePage2";

import ReactGA from "react-ga4";
import RephraserPage from "./components/RephraserPage";
import DonationSection from "./components/CharityPage";
import DonationSuccessPage from "./components/DonationSuccessPage";
import AuthorDashboardPage from "./components/AuthorDashboardPage";
import AdminDashboard from "./components/AdminDashboard";
import PaymentPage from "./components/Payment";
import StripeCheckoutPage from "./components/StripeCheckoutPage";
import OfflinePaymentPage from "./components/OfflinePaymentPage";
import AdminArticlePreviewPage from "./components/AdminArticlePreviewPage";
import Horoscope from "./components/Horoscope";

ReactGA.initialize("G-B1FEECPXJ6");
// ReactGA.initialize("");

ReactGA.send({ hitType: "pageview", page: window.location.pathname });

function AppInner() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Read token once; memoize so it's stable
  const token = useMemo(() => localStorage.getItem("token") || null, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const t = localStorage.getItem("token");
    const user = t ? JSON.parse(localStorage.getItem("user") || "{}") : null;
    setCurrentUser(user);
  }, []);
  const baseUrl = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    if (!baseUrl) {
      // fallback to same-origin if base URL is not configured
      console.warn("VITE_API_BASE is not set - using relative /api path");
    }

    fetch(`${baseUrl || ""}/api/articles`)
      .then((res) => res.json())
      .then((data) => {
        // API may return either an array or an object with a `data` property.
        const articles = Array.isArray(data) ? data : data?.data || [];
        setPosts(articles);
      })
      .catch((err) => {
        console.error("Failed to fetch articles:", err);
        setPosts([]);
      });
  }, [baseUrl]);

  function usePageTracking() {
    const location = useLocation();

    useEffect(() => {
      ReactGA.send({ hitType: "pageview", page: location.pathname });
    }, [location]);
  }
  ReactGA.send({
    hitType: "pageview",
    page: location.pathname,
    title: document.title,
  });

  return (
    <div className="bg-white text-brand-text font-sans flex flex-col min-h-screen">
      <Header currentUser={currentUser} onLogout={handleLogout} />
      <main className="grow pt-22">
        <Routes>
          <Route
            path="/"
            element={<HomePage posts={posts} currentUser={currentUser} />}
          />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/register" element={<ApplyPage />} />
          <Route path="/perks" element={<PerksPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/upload-article" element={<UploadArticlePage />} />
          <Route
            path="/blog/:id"
            element={
              <BlogPostWrapper
                posts={posts}
                currentUser={currentUser}
                handleDeletePost={() => {}}
              />
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/payment" element={<OfflinePaymentPage />} />
          <Route path="/rephrase" element={<RephraserPage />} />
          <Route path="/donations" element={<DonationSection />} />
          <Route path="/donation-success" element={<DonationSuccessPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/author-dashboard" element={<AuthorDashboardPage />} />
          <Route
            path="/admin/article/:id"
            element={<AdminArticlePreviewPage />}
          />

          {/* Pass the token prop here */}
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/horoscope" element={<Horoscope />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

const App = () => (
  <Router>
    <AppInner />
  </Router>
);

export default App;
