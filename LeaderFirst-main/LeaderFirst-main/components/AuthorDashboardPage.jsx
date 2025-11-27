import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthorDashboardPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(localStorage.getItem("user") || "{}") : null;
  const role = user?.role;
  const isAuthor = role === "author";

  const baseUrl = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    if (!token || !isAuthor) return;

    const fetchMyArticles = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${baseUrl}/api/articles/mine`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load articles");
        const list = Array.isArray(data) ? data : data.data || [];
        setArticles(list);
      } catch (err) {
        setError(err.message || "Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchMyArticles();
  }, [token, isAuthor, baseUrl]);

  const drafts = articles.filter((a) => a.status === "draft");
  const pending = articles.filter((a) => a.status === "pending");
  const published = articles.filter((a) => a.status === "published");

  const handleEdit = (id) => {
    navigate(`/upload-article?edit=${id}`);
  };

  const handleView = (id) => {
    navigate(`/blog/${id}`);
  };

  const handleCreateNew = () => {
    navigate("/upload-article");
  };

  if (!isAuthor && role !== "admin") {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-red-100 rounded text-center text-red-700">
        <p className="font-bold">Access Denied</p>
        <p>Only authors (or admins) can access this dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Author Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Signed in as:{" "}
              <span className="font-medium">{user?.email || "Author"}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCreateNew}
              className="px-4 py-2 text-sm font-semibold rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              + New Article
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="p-6 text-gray-500 text-sm">
            Loading your articles...
          </div>
        ) : (
          <>
            {/* Published */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Published Articles
                </h2>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                  {published.length} published
                </span>
              </div>
              <div className="divide-y divide-gray-100">
                {published.length === 0 ? (
                  <div className="p-4 text-sm text-gray-500">
                    No published articles yet.
                  </div>
                ) : (
                  published.map((article) => (
                    <div
                      key={article._id}
                      className="p-4 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {article.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {article.category} ·{" "}
                          {article.publishedAt
                            ? new Date(article.publishedAt).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "Not dated"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleView(article._id)}
                          className="text-xs font-semibold text-brand-teal hover:text-brand-teal-dark"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Pending */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Pending Review
                </h2>
                <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                  {pending.length} pending
                </span>
              </div>
              <div className="divide-y divide-gray-100">
                {pending.length === 0 ? (
                  <div className="p-4 text-sm text-gray-500">
                    No articles under review.
                  </div>
                ) : (
                  pending.map((article) => (
                    <div
                      key={article._id}
                      className="p-4 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {article.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {article.category}
                          {article.rejectionReason && (
                            <>
                              {" "}
                              ·{" "}
                              <span className="text-red-500">
                                Rejected before: {article.rejectionReason}
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(article._id)}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Drafts */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Drafts</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-semibold">
                  {drafts.length} drafts
                </span>
              </div>
              <div className="divide-y divide-gray-100">
                {drafts.length === 0 ? (
                  <div className="p-4 text-sm text-gray-500">
                    No drafts yet. Start a new article!
                  </div>
                ) : (
                  drafts.map((article) => (
                    <div
                      key={article._id}
                      className="p-4 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {article.title || "(Untitled)"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {article.category || "No category"} · Last updated{" "}
                          {article.updatedAt
                            ? new Date(article.updatedAt).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "—"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(article._id)}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default AuthorDashboardPage;
