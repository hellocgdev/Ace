import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(localStorage.getItem("user") || "{}") : null;

  useEffect(() => {
    // Check if user is authenticated
    if (!token || !user) {
      navigate("/login");
      return;
    }
    const baseUrl = import.meta.env.VITE_API_BASE;

    // Fetch articles with auth token
    fetch(`${baseUrl}/api/articles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          throw new Error("Session expired");
        }
        if (!res.ok) throw new Error("Failed to fetch articles");
        return res.json();
      })
      .then((data) => {
        setArticles(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load articles");
        setLoading(false);
      });
  }, [token, navigate]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeleteError("");
    setDeleteSuccess("");

    try {
      const baseUrl = import.meta.env.VITE_API_BASE;

      const res = await fetch(`${baseUrl}/api/articles/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        setDeleteError("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      if (res.status === 403) {
        setDeleteError("You do not have permission to delete this article.");
        return;
      }

      if (res.ok) {
        setArticles((prev) => prev.filter((art) => art._id !== id));
        setDeleteSuccess("Article deleted successfully!");
        setTimeout(() => setDeleteSuccess(""), 3000);
      } else {
        const data = await res.json();
        setDeleteError(`Delete failed: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      setDeleteError(`Delete failed: ${err.message}`);
    }
  };

  const handleEdit = (id) => {
    navigate(`/blog/${id}`);
  };

  const handleView = (id) => {
    navigate(`/blog/${id}`);
  };

  const handleNewArticle = () => {
    navigate("/upload-article");
  };

  // Check if user is admin
  const isAdmin = user?.role === "admin";

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Access Denied</p>
          <p>Only admins can access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-dark">
          Articles Dashboard
        </h1>
        <button
          onClick={handleNewArticle}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 font-semibold text-base transition-colors"
        >
          + New Article
        </button>
      </div>

      {/* Global Error Messages */}
      {deleteError && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {deleteError}
        </div>
      )}
      {deleteSuccess && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {deleteSuccess}
        </div>
      )}

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-dark"></div>
          <p className="text-gray-500 mt-2">Loading articles...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
            {error}
          </div>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-10">
          <div className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-3 rounded max-w-md mx-auto">
            <p className="font-semibold">No articles found</p>
            <p className="text-sm mt-1">
              Start by creating your first article!
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded shadow-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-700 uppercase text-sm">
                  Title
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700 uppercase text-sm">
                  Category
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700 uppercase text-sm">
                  Date
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700 uppercase text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {articles.map((article) => (
                <tr
                  key={article._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {article.thumbnail?.url && (
                        <img
                          src={article.thumbnail.url}
                          alt={article.title}
                          className="w-12 h-12 rounded object-cover mr-3"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 line-clamp-2">
                          {article.title}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {article.category || "Uncategorized"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {article.createdAt
                      ? new Date(article.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(article._id)}
                        className="bg-gray-600 text-white px-3 py-1.5 rounded hover:bg-gray-700 text-xs font-semibold transition-colors"
                        title="View Article"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(article._id)}
                        className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 text-xs font-semibold transition-colors"
                        title="Edit Article"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(article._id, article.title)}
                        className="bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 text-xs font-semibold transition-colors"
                        title="Delete Article"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary Stats */}
      {articles.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600 text-sm">Total Articles</p>
            <p className="text-2xl font-bold text-brand-dark">
              {articles.length}
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600 text-sm">Last Updated</p>
            <p className="text-sm font-semibold text-gray-700">
              {articles.length > 0
                ? new Date(
                    articles[0].updatedAt || articles[0].createdAt
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "N/A"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
