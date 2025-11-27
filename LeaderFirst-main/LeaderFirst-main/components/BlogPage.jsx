import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const InsightCard = ({
  id,
  imageUrl,
  category,
  title,
  excerpt,
  author,
  date,
  onClick,
  imageError,
  onImageError,
}) => (
  <div
    className={`bg-white rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
      onClick ? "cursor-pointer" : ""
    }`}
    onClick={onClick}
    role={onClick ? "button" : "article"}
    tabIndex={onClick ? 0 : -1}
    onKeyDown={(e) => {
      if ((e.key === "Enter" || e.key === " ") && onClick) {
        e.preventDefault();
        onClick();
      }
    }}
  >
    {/* Image Container - FIXED */}
    <div
      className="relative w-full overflow-hidden"
      style={{ paddingBottom: "56.25%" }}
    >
      {imageUrl && !imageError ? (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onError={onImageError}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-linear-to-br from-gray-300 to-gray-400">
          <span className="text-gray-600 font-bold text-4xl">
            {title.substring(0, 1)}
          </span>
        </div>
      )}
    </div>

    {/* Content Container */}
    <div className="p-6">
      {/* Category */}
      <p className="text-brand-teal font-semibold uppercase tracking-wider text-xs mb-3">
        {category}
      </p>

      {/* Title */}
      <h3 className="text-2xl font-bold text-brand-dark mb-3 h-16 overflow-hidden line-clamp-2 group-hover:text-brand-teal transition-colors">
        {title}
      </h3>

      {/* Excerpt */}
      <p className="text-gray-600 text-base h-24 overflow-hidden line-clamp-3">
        {excerpt}
      </p>

      {/* Footer with Author and Date
      {(author || date) && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            {author && (
              <span className="font-medium text-gray-700">{author}</span>
            )}
            {date && <span>{date}</span>}
          </div>
        </div>
      )} */}
    </div>
  </div>
);

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  // Get category from URL query parameter
  const category = searchParams.get("category");

  // Fetch articles from API - WITH CATEGORY FILTER
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const baseUrl = import.meta.env.VITE_API_BASE;

        // ✅ Correct: use query param, not /category/...
        const apiUrl = category
          ? `${baseUrl}/api/articles?category=${encodeURIComponent(category)}`
          : `${baseUrl}/api/articles`;

        console.log("📡 Fetching from:", apiUrl);

        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error("Failed to fetch articles");
        }

        const data = await res.json();
        console.log("✅ Fetched articles:", data);

        // Backend currently returns plain array, not { data: ... }
        setPosts(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setError(err.message || "Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category]); // Re-fetch when category changes

  // Extract text excerpt from HTML content
  const getExcerpt = (htmlContent, maxLength = 150) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle image error
  const handleImageError = (postId) => {
    setImageErrors((prev) => ({ ...prev, [postId]: true }));
  };

  // Page title and subtitle
  const pageTitle = category ? `${category} Articles` : "Insights & Articles";
  const pageSubtitle = category
    ? `Exploring topics in ${category}.`
    : "Thoughts on leadership, performance, and personal growth.";

  // Navigate to post detail
  const handleNavigateToPost = (postId) => {
    navigate(`/blog/${postId}`);
  };

  // Clear category filter
  const handleClearCategory = () => {
    navigate("/blog");
  };

  // Loading state
  if (loading) {
    return (
      <div className="animate-fade-in">
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal"></div>
              <p className="mt-4 text-lg text-gray-600">Loading articles...</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="animate-fade-in">
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-md mx-auto text-center bg-white rounded-lg shadow-lg p-8">
              <div className="text-red-600 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-red-600 mb-2">
                Error Loading Articles
              </h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-brand-teal text-white px-6 py-3 rounded-lg hover:bg-brand-teal-dark transition-colors font-semibold"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <section className="py-10">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-semibold text-brand-dark mb-4 font-serif leading-tight">
              {pageTitle}
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              {pageSubtitle}
            </p>

            {/* Category Filter Badge */}
            {category && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <span className="text-gray-600 font-medium">Filtered by:</span>
                <span className="inline-flex items-center gap-2 bg-brand-teal text-black px-4 py-2 rounded-full font-semibold">
                  {category}
                  <button
                    onClick={handleClearCategory}
                    className=" transition-colors ml-1 font-bold cursor-pointer text-lg leading-none"
                    title="Clear filter"
                    aria-label="Clear category filter"
                  >
                    ✕
                  </button>
                </span>
              </div>
            )}
          </div>

          {/* Articles Grid */}
          {posts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {posts.map((post) => (
                  <InsightCard
                    key={post._id}
                    id={post._id}
                    imageUrl={
                      post.images?.[0]?.url || post.thumbnail?.url || ""
                    }
                    category={post.category}
                    title={post.title}
                    excerpt={getExcerpt(post.content)}
                    author={post.author?.name || post.author?.email}
                    date={formatDate(post.publishedAt)}
                    imageError={imageErrors[post._id]}
                    onImageError={() => handleImageError(post._id)}
                    onClick={() => handleNavigateToPost(post._id)}
                  />
                ))}
              </div>

              {/* Article Count */}
              <div className="mt-12 text-center text-gray-600">
                <p>
                  Showing{" "}
                  <span className="font-semibold text-brand-teal">
                    {posts.length}
                  </span>{" "}
                  {posts.length === 1 ? "article" : "articles"}
                </p>
              </div>
            </>
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              <h2 className="text-2xl font-bold text-brand-dark mb-2">
                {category
                  ? `No ${category} articles found`
                  : "No articles found"}
              </h2>
              <p className="text-gray-600">
                {category
                  ? `We're constantly working on new content for the "${category}" category. Please check back later!`
                  : `We're constantly working on new content. Please check back later!`}
              </p>
              {category && (
                <button
                  onClick={handleClearCategory}
                  className="mt-4 text-brand-teal hover:text-brand-teal-dark font-semibold transition-colors"
                >
                  ← View all articles
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
