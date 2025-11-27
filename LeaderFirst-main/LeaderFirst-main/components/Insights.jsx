// src/components/Insights.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ACCENT = "#0F766E"; // hover color for titles

// Shuffle helper for array
const shuffleArray = (array = []) => {
  if (!Array.isArray(array)) return [];
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Helper to format relative time
const getRelativeTime = (date) => {
  const now = new Date();
  const published = new Date(date);
  const diffMs = now - published;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "JUST NOW";
  if (diffHours < 24)
    return `ABOUT ${diffHours} HOUR${diffHours > 1 ? "S" : ""} AGO`;
  if (diffDays === 1) return "ABOUT 1 DAY AGO";
  return `ABOUT ${diffDays} DAYS AGO`;
};

// Helper to extract text excerpt from HTML
const getExcerpt = (htmlContent, maxLength = 150) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;
  const text = tempDiv.textContent || tempDiv.innerText || "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const Insights = ({ posts: propPosts = null }) => {
  const [articles, setArticles] = useState([]);
  const [shuffledArticles, setShuffledArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageErrors, setImageErrors] = useState({});
  const [followedArticles, setFollowedArticles] = useState(new Set());

  // Use posts provided by parent when available, otherwise fetch from API
  useEffect(() => {
    let cancelled = false;

    const applyArticles = (src) => {
      if (cancelled) return;
      setArticles(src);
      if (src.length >= 7) setShuffledArticles(shuffleArray(src));
      else setShuffledArticles(src);
      setLoading(false);
    };

    if (propPosts && Array.isArray(propPosts)) {
      // parent provided posts — use them and skip fetching
      applyArticles(propPosts);
      return () => {
        cancelled = true;
      };
    }

    const fetchArticles = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE;

        const res = await fetch(`${baseUrl}/api/articles`);
        const data = await res.json();
        console.log("Fetched articles:", data);

        // Accept either array or { data: [...] }
        const src = Array.isArray(data) ? data : data?.data || [];
        applyArticles(src);
      } catch (error) {
        console.error("Error fetching articles:", error);
        if (!cancelled) setError("Failed to load articles");
      } finally {
        // loading flag handled in applyArticles for success; ensure false on error
        if (!cancelled && error) setLoading(false);
      }
    };

    fetchArticles();

    return () => {
      cancelled = true;
    };
  }, [propPosts]);

  // Handle image error
  const handleImageError = (articleId) => {
    setImageErrors((prev) => ({ ...prev, [articleId]: true }));
  };

  // Handle follow button click
  const handleFollowClick = (e, articleId) => {
    e.preventDefault();
    e.stopPropagation();
    setFollowedArticles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-20 bg-[#FBF9F6]">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <div className="text-2xl font-semibold text-gray-600">
            Loading insights...
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 bg-[#FBF9F6]">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </section>
    );
  }

  // Not enough articles
  if (!shuffledArticles || shuffledArticles.length < 4) {
    return (
      <section className="py-20 bg-[#FBF9F6]">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <div className="text-xl text-gray-600">
            {shuffledArticles.length === 0
              ? "No articles published yet."
              : `Only ${shuffledArticles.length} article${
                  shuffledArticles.length > 1 ? "s" : ""
                } available. Need at least 4 for the full layout.`}
          </div>
        </div>
      </section>
    );
  }

  // Destructure shuffled articles for new layout
  const mainArticle = shuffledArticles[1]; // Center featured article
  
  const latestArticles = shuffledArticles.slice(2, 6).map((article) => ({
    time: getRelativeTime(article.publishedAt),
    title: article.title,
    _id: article._id,
  }));

  // Left column articles
  const leftArticles = [shuffledArticles[0], shuffledArticles[4]];
  
  // Bottom articles (surrounding the main featured)
  const bottomArticles = shuffledArticles.slice(5, Math.min(9, shuffledArticles.length));

  return (
    <section className="py-12" style={{ backgroundColor: "#FBF9F6" }}>
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Top Section: Left + Center Featured + Right Latest */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Left Column - 2 Articles */}
          <div className="lg:col-span-1 space-y-6">
            {leftArticles.map((article) => (
              <Link
                key={article._id}
                to={`/blog/${article._id}`}
                className="group cursor-pointer block"
              >
                <div className="rounded-lg overflow-hidden mb-3">
                  {article.thumbnail?.url && !imageErrors[article._id] ? (
                    <img
                      src={article.thumbnail.url}
                      alt={article.title}
                      onError={() => handleImageError(article._id)}
                      className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-linear-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 text-sm font-medium">
                        No Image
                      </span>
                    </div>
                  )}
                </div>
                <p
                  className="text-xs font-semibold uppercase mb-2"
                  style={{ color: "#0F766E" }}
                >
                  {article.category}
                </p>
                <h4
                  className="font-semibold font-serif text-sm mb-2 line-clamp-2 group-hover:opacity-80 transition-opacity"
                  style={{ color: "#00002F" }}
                >
                  {article.title}
                </h4>
              </Link>
            ))}
          </div>

          {/* Center Column - Large Featured Article */}
          <div className="lg:col-span-2">
            <Link
              to={`/blog/${mainArticle._id}`}
              className="block group cursor-pointer"
            >
              <div className="mb-6 rounded-lg overflow-hidden">
                {mainArticle.thumbnail?.url && !imageErrors[mainArticle._id] ? (
                  <img
                    src={mainArticle.thumbnail.url}
                    alt={mainArticle.title}
                    onError={() => handleImageError(mainArticle._id)}
                    className="w-full h-96 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-96 bg-linear-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 text-sm font-medium">
                      No Image
                    </span>
                  </div>
                )}
              </div>
              <p
                className="text-xs font-semibold uppercase mb-2"
                style={{ color: "#0F766E" }}
              >
                {mainArticle.category}
              </p>
              <h2
                className="text-2xl md:text-3xl font-bold font-serif mb-4 line-clamp-3 group-hover:opacity-80 transition-opacity"
                style={{ color: "#00002F" }}
              >
                {mainArticle.title}
              </h2>
              <p className="text-gray-700 line-clamp-3 mb-4 text-sm">
                {getExcerpt(mainArticle.content, 250)}
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: "#666" }}
              >
                BY {mainArticle.author?.name?.toUpperCase() || "THE LEADERS FIRST"}
              </p>
            </Link>
          </div>

          {/* Right Column - Latest */}
          <div className="lg:col-span-1">
            <div className="flex pt-5 justify-between items-center mb-6">
              <h3
                className="text-xl font-semibold font-serif"
                style={{ color: "#00002F" }}
              >
                Latest
              </h3>
              <Link
                to="/blog"
                className="text-sm font-semibold"
                style={{ color: "#0F766E" }}
              >
                See All
              </Link>
            </div>
            <div className="space-y-5">
              {latestArticles.map((article) => (
                <Link
                  key={article._id}
                  to={`/blog/${article._id}`}
                  className="block group cursor-pointer pb-5 border-b border-gray-200 last:border-b-0 last:pb-0"
                >
                  <p
                    className="text-xs font-medium uppercase mb-2"
                    style={{ color: "#999" }}
                  >
                    {article.time}
                  </p>
                  <h4
                    className="font-semibold font-serif text-sm line-clamp-2 group-hover:opacity-80 transition-opacity"
                    style={{ color: "#00002F" }}
                  >
                    {article.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Surrounding Articles Grid (no heading) */}
        {bottomArticles && bottomArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bottomArticles.map((article) => (
              <Link
                key={article._id}
                to={`/blog/${article._id}`}
                className="group cursor-pointer block"
              >
                <div className="rounded-lg overflow-hidden mb-3 h-40">
                  {article.thumbnail?.url && !imageErrors[article._id] ? (
                    <img
                      src={article.thumbnail.url}
                      alt={article.title}
                      onError={() => handleImageError(article._id)}
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 text-xs font-medium">
                        No Image
                      </span>
                    </div>
                  )}
                </div>
                <p
                  className="text-xs font-semibold uppercase mb-2"
                  style={{ color: "#0F766E" }}
                >
                  {article.category}
                </p>
                <h4
                  className="font-semibold font-serif text-sm line-clamp-2 group-hover:opacity-80 transition-opacity"
                  style={{ color: "#00002F" }}
                >
                  {article.title}
                </h4>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Insights;
