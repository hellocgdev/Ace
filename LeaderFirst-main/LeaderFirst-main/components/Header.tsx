import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuIcon, CloseIcon } from "./icons/Icons";
import { api } from "../lib/api";
import DonationPage from "./CharityPage";
import ReferFriendModal from "./ReferFriendModal";
const categoryItems = [
  { label: "Leadership", description: "Leading teams, strategy & vision." },
  { label: "Technology", description: "AI, products & digital change." },
  { label: "Education", description: "Learning, careers & upskilling." },
  { label: "Health", description: "Wellbeing, performance & balance." },
  { label: "Business", description: "Growth, finance & operations." },
  { label: "Politics", description: "Policy, power & leadership." },
  { label: "Science", description: "Research, discovery & innovation." },
  { label: "Fashion", description: "Style, culture & personal brand." },
];

const Header = ({ currentUser, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Dropdown Logic
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);
  const [showRefer, setShowRefer] = useState(false);

  const navigate = useNavigate();

  // --- Auth Logic (Unchanged) ---
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const isAuthed = !!currentUser || !!token;

  const userFromStorage = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  }, []);

  const email = currentUser?.email || userFromStorage?.email || null;

  const adminEmails = [
    "admin101@example.com",
    "admin102@example.com",
    "admin103@example.com",
    "admin104@example.com",
    "admin105@example.com",
    "admin1@example.com",
    "admin2@example.com",
    "admin3@example.com",
    "admin4@example.com",
    "admin5@example.com",
  ];
  const isUserAdmin = !!email && adminEmails.includes(email);

  useEffect(() => {
    let cancelled = false;
    const t = localStorage.getItem("token");
    if (!t) {
      localStorage.removeItem("plan_active");
      localStorage.removeItem("plan_name");
      return;
    }
    (async () => {
      try {
        const me = await api("/api/auth/me", { token: t });
        if (cancelled) return;
        const info = me?.data?.data;
        if (info?.planStatus === "active") {
          localStorage.setItem("plan_active", "true");
          if (info?.planName) localStorage.setItem("plan_name", info.planName);
        } else {
          localStorage.removeItem("plan_active");
          localStorage.removeItem("plan_name");
        }
      } catch {
        if (cancelled) return;
        localStorage.removeItem("plan_active");
        localStorage.removeItem("plan_name");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [currentUser]);

  const planActive =
    isAuthed && JSON.parse(localStorage.getItem("plan_active") || "false");
  const planNameRaw = isAuthed ? localStorage.getItem("plan_name") : null;
  const planName =
    planNameRaw === "core"
      ? "Core Group"
      : planNameRaw === "contributor"
      ? "Contributor"
      : null;

  // --- Scroll Effect ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Handlers ---
  const handleCategoryClick = (category) => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    navigate(`/blog?category=${encodeURIComponent(category)}`);
  };

  const handleLogoutClick = () => {
    setIsMenuOpen(false);
    localStorage.removeItem("plan_active");
    localStorage.removeItem("plan_name");
    onLogout();
  };

  // --- Dropdown Timing Logic ---
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  // --- Desktop Navigation Items ---
  const navLinks = (
    <>
      <button
        onClick={() => handleCategoryClick("Leadership")}
        className="text-md pr-3 font-medium font-serif text-[#0D1126] hover:text-black transition-colors"
      >
        Leadership
      </button>

      <Link
        to="/blog"
        className="text-md font-medium font-serif text-[#0D1126] hover:text-black transition-colors"
      >
        Blog
      </Link>
      <Link
        to="/horoscope"
        className="text-md font-medium font-serif text-[#0D1126] hover:text-black transition-colors"
      >
        Horoscope
      </Link>

      {/* Mega Dropdown Trigger */}
      <div
        className="relative h-full flex items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          className={`group flex items-center gap-1 text-md font-medium font-serif px-3 py-2 rounded-full transition-all duration-200
            ${
              isDropdownOpen
                ? "bg-gray-100 text-black"
                : "text-[#0D1126] hover:text-black hover:bg-gray-50"
            }`}
        >
          Categories
          {/* Animated Chevron */}
          <svg
            className={`w-2.5 h-2.5 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      <Link
        to="/donations"
        className="text-md font-medium font-serif text-[#0D1126] hover:text-black transition-colors"
      >
        Contribute to Charity
      </Link>

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`absolute left-0 top-[calc(100%+0.5rem)] w-[750px] bg-white rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden transform transition-all duration-300 ease-out origin-top-left z-50
          ${
            isDropdownOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
      >
        <div className="flex items-stretch">
          {/* Sidebar Column (Gray) */}
          <div className="w-1/3 bg-slate-50 p-8 flex flex-col justify-between border-r border-gray-100">
            <div>
              <p className="text-xs font-bold font-serif tracking-widest text-gray-400 uppercase mb-3">
                Explore
              </p>
              <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-2">
                Curated Topics
              </h3>
              <p className="text-sm font-serif text-gray-500 leading-relaxed">
                Deep dive into the subjects that matter most to modern leaders.
              </p>
            </div>
            <Link
              to="/blog"
              className="text-sm font-semibold font-serif text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900 transition-all"
            >
              View all articles &rarr;
            </Link>
          </div>

          {/* Grid Column (White) */}
          <div className="w-2/3 p-8">
            <div className="grid grid-cols-2 gap-x-2 gap-y-2">
              {categoryItems.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => handleCategoryClick(cat.label)}
                  className="group flex flex-col items-start p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="text-md font-medium font-serif text-gray-900 group-hover:text-blue-600 transition-colors">
                    {cat.label}
                  </span>
                  <span className="text-md font-serif text-gray-500 mt-0.5 line-clamp-1">
                    {cat.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const rightSideDesktop = (
    <div className="hidden lg:flex items-center gap-5">
      {isAuthed && (
        <div className="flex items-center gap-2">
          {planActive && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 rounded-md border border-emerald-100">
              Active
            </span>
          )}
          {planName && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 rounded-md border border-blue-100">
              {planName}
            </span>
          )}
          {planActive && (
            <button
              type="button"
              onClick={() => setShowRefer(true)}
              className="ml-1 px-3 py-1.5 text-[11px] font-semibold rounded-md border border-brand-teal text-brand-teal hover:bg-brand-teal  transition"
            >
              Refer a friend
            </button>
          )}
        </div>
      )}

      <div className="flex items-center gap-4 text-md font-medium font-serif">
        {/* Pricing visible to all users (logged in or not) */}
        <Link
          to="/pricing-page"
          className="text-[#0D1126] hover:text-black transition-colors"
        >
          Pricing
        </Link>
        {isUserAdmin && (
          <>
            <Link
              to="/upload-article"
              className="text-[#0D1126] hover:text-black transition-colors"
            >
              Upload
            </Link>
            <Link
              to="/rephrase"
              className="text-[#0D1126] hover:text-black transition-colors"
            >
              Rephraser
            </Link>
          </>
        )}
      </div>

      {isAuthed ? (
        <button
          onClick={handleLogoutClick}
          className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-black transition-transform active:scale-95 font-medium text-sm shadow-lg shadow-gray-900/10"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-black transition-transform active:scale-95 font-medium text-sm shadow-lg shadow-gray-900/10"
        >
          Login
        </Link>
      )}
    </div>
  );

  const authLinksMobile = isAuthed ? (
    <>
      <div className="flex items-center justify-center gap-2 pt-2">
        {planActive && (
          <span className="px-2 py-1 text-xs bg-emerald-100 text-emerald-700 rounded">
            Plan active
          </span>
        )}
        {planName && (
          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
            {planName}
          </span>
        )}
      </div>
      <button
        onClick={handleLogoutClick}
        className="bg-gray-900 text-white px-6 py-3 rounded-lg w-full mt-4 font-semibold"
      >
        Logout
      </button>
    </>
  ) : (
    <Link
      to="/login"
      onClick={() => setIsMenuOpen(false)}
      className="bg-gray-900 text-white px-6 py-3 rounded-lg w-full mt-4 block text-center font-semibold"
    >
      Login
    </Link>
  );

  return (
    <>
      {/* Main Header Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 border-b border-transparent
          ${
            isScrolled
              ? "bg-white/90 backdrop-blur-md shadow-sm border-gray-200 py-3"
              : "bg-white py-5 border-gray-100"
          }`}
      >
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex justify-between items-center relative">
            {/* Logo */}
            <Link to="/" className="shrink-0 group">
              <span className="text-xl pl-10 md:text-3xl font-serif font-semibold text-gray-900 tracking-tight group-hover:opacity-80 transition-opacity">
                Leaders First
              </span>
            </Link>
            {/* Desktop Nav - Relative for Dropdown Positioning */}
            <nav className="hidden pl-10 lg:flex items-center gap-8 relative">
              {navLinks}
            </nav>

            {/* Right Side Actions */}
            {rightSideDesktop}

            {/* Mobile Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-900 p-2"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Media & Partnership Banner */}
        <div className="pt-1">
          <div className="w-full   bg-gray-800 text-white text-center py-1 text-xs font-serif tracking-widest font-medium">
            For Media-Partnership Queries & To Get Featured,{" "}
            <Link
              to="/pricing-page"
              className="underline decoration-white/50 underline-offset-4 hover:decoration-white"
            >
              Click Here
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-90 bg-white pt-24 px-6 lg:hidden overflow-y-auto">
          <nav className="flex font-serif flex-col space-y-6 text-center">
            {categoryItems.map((cat) => (
              <button
                key={cat.label}
                onClick={() => handleCategoryClick(cat.label)}
                className="text-lg font-medium font-serif text-gray-800 hover:text-blue-600 transition-colors"
              >
                {cat.label}
              </button>
            ))}
            <hr className="border-gray-100" />
            <Link
              to="/blog"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-medium font-serif text-gray-600"
            >
              Blog
            </Link>
            <Link
              to="/pricing-page"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-medium font-serif text-gray-600"
            >
              Pricing
            </Link>
            <Link
              to="/donations"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-medium font-serif text-gray-600"
            >
              Donate for a Cause
            </Link>
            <div className="pt-4">{authLinksMobile}</div>
          </nav>
        </div>
      )}
      <div
        className={`fixed bottom-0 left-0 right-0 z-100 lg:top-[calc(100%-(--spacing(10)))] lg:bottom-auto transition-transform duration-300 ${
          isMenuOpen ? "hidden" : ""
        }`}
      ></div>
      <ReferFriendModal open={showRefer} onClose={() => setShowRefer(false)} />
    </>
  );
};

export default Header;
