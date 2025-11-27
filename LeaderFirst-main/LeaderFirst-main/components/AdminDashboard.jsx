import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
  const [pendingArticles, setPendingArticles] = useState([]);
  const [loadingPending, setLoadingPending] = useState(true);
  const [moderatingId, setModeratingId] = useState(null);

  const [pendingPayments, setPendingPayments] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(true);
  const [reviewingPaymentId, setReviewingPaymentId] = useState(null);

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(localStorage.getItem("user") || "{}") : null;
  const baseUrl = import.meta.env.VITE_API_BASE;

  // === Articles ===
  const fetchPendingArticles = async () => {
    if (!token) return;
    setLoadingPending(true);
    setError("");
    try {
      const res = await fetch(`${baseUrl}/api/articles/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load pending");
      setPendingArticles(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError(err.message || "Failed to load pending articles");
    } finally {
      setLoadingPending(false);
    }
  };

  const handleModerate = async (articleId, action) => {
    if (!token) return;

    let reason;
    if (action === "reject") {
      reason = window.prompt("Enter rejection reason (optional):") || "";
    }

    setModeratingId(articleId);
    setError("");
    setInfo("");

    try {
      const res = await fetch(`${baseUrl}/api/articles/${articleId}/moderate`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(
          action === "reject" ? { action, reason } : { action }
        ),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Moderation failed");

      setInfo(
        action === "publish"
          ? "Article published successfully."
          : "Article moved back to draft with rejection reason."
      );
      setPendingArticles((prev) =>
        prev.filter((article) => article._id !== articleId)
      );
    } catch (err) {
      setError(err.message || "Failed to moderate article");
    } finally {
      setModeratingId(null);
    }
  };

  // === Offline payments ===
  const fetchPendingPayments = async () => {
    if (!token) return;
    setLoadingPayments(true);
    try {
      const res = await fetch(`${baseUrl}/api/offline-payments/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load payments");
      setPendingPayments(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError(
        (prev) => prev || err.message || "Failed to load pending payments"
      );
    } finally {
      setLoadingPayments(false);
    }
  };

  const handleReviewPayment = async (paymentId, action) => {
    if (!token) return;

    let adminComment = "";
    if (action === "reject") {
      adminComment = window.prompt("Enter rejection reason (optional):") || "";
    }

    setReviewingPaymentId(paymentId);
    setError("");
    setInfo("");

    try {
      const res = await fetch(
        `${baseUrl}/api/offline-payments/${paymentId}/review`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(
            action === "reject"
              ? { action, adminComment }
              : { action, adminComment }
          ),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to review payment");

      setInfo(
        action === "approve"
          ? "Payment approved and plan activated."
          : "Payment rejected."
      );
      setPendingPayments((prev) => prev.filter((p) => p._id !== paymentId));
    } catch (err) {
      setError(err.message || "Failed to review payment");
    } finally {
      setReviewingPaymentId(null);
    }
  };

  useEffect(() => {
    fetchPendingArticles();
    fetchPendingPayments();
  }, [token]);

  const handleGoToUpload = () => {
    navigate("/upload-article");
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-red-100 rounded text-center text-red-700">
        <p className="font-bold">Access Denied</p>
        <p>Only admins can access this dashboard.</p>
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
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Review articles and offline payments
            </p>
            <p className="text-sm text-gray-500">
              Signed in as:{" "}
              <span className="font-medium">{user.email || "Admin"}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleGoToUpload}
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
        {info && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded text-sm">
            {info}
          </div>
        )}

        {/* Pending articles */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Pending Articles for Review
            </h2>
            <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
              {pendingArticles.length} pending
            </span>
          </div>

          {loadingPending ? (
            <div className="p-6 text-gray-500 text-sm">Loading...</div>
          ) : pendingArticles.length === 0 ? (
            <div className="p-6 text-gray-500 text-sm">
              No articles waiting for review.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {pendingArticles.map((article) => (
                <div
                  key={article._id}
                  className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:bg-gray-50"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {article.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {article.category} ·{" "}
                      {article.author?.name ||
                        article.author?.email ||
                        "Author"}
                    </p>
                    {article.leaderFeatured && (
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        Featured Leader:{" "}
                        <span className="font-medium">
                          {article.leaderFeatured}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => navigate(`/admin/article/${article._id}`)}
                      className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleModerate(article._id, "reject")}
                      disabled={moderatingId === article._id}
                      className="px-3 py-1 text-xs font-semibold rounded-md border border-red-300 text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      {moderatingId === article._id ? "Rejecting..." : "Reject"}
                    </button>
                    <button
                      onClick={() => handleModerate(article._id, "publish")}
                      disabled={moderatingId === article._id}
                      className="px-3 py-1 text-xs font-semibold rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                    >
                      {moderatingId === article._id
                        ? "Publishing..."
                        : "Publish"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Pending offline payments */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Pending Offline Payments
            </h2>
            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
              {pendingPayments.length} pending
            </span>
          </div>

          {loadingPayments ? (
            <div className="p-6 text-gray-500 text-sm">Loading...</div>
          ) : pendingPayments.length === 0 ? (
            <div className="p-6 text-gray-500 text-sm">
              No offline payments waiting for review.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {pendingPayments.map((p) => (
                <div
                  key={p._id}
                  className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:bg-gray-50"
                >
                  <div className="min-w-0 text-xs">
                    <p className="font-semibold text-gray-900 truncate">
                      {p.name} · {p.email}
                    </p>
                    <p className="text-gray-600">
                      Plan:{" "}
                      <span className="font-medium">
                        {p.planKey === "core"
                          ? "Core Group"
                          : p.planKey.charAt(0).toUpperCase() +
                            p.planKey.slice(1)}
                      </span>{" "}
                      · Amount: ₹{p.amount}
                    </p>
                    <p className="text-gray-600">
                      Txn ID: <span className="font-mono">{p.txId}</span>
                    </p>
                    {p.bankName && (
                      <p className="text-gray-500">Bank / UPI: {p.bankName}</p>
                    )}
                    {p.paymentDate && (
                      <p className="text-gray-500">
                        Date:{" "}
                        {new Date(p.paymentDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    )}
                    {p.note && <p className="text-gray-500">Note: {p.note}</p>}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleReviewPayment(p._id, "reject")}
                      disabled={reviewingPaymentId === p._id}
                      className="px-3 py-1 text-xs font-semibold rounded-md border border-red-300 text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      {reviewingPaymentId === p._id ? "Rejecting..." : "Reject"}
                    </button>
                    <button
                      onClick={() => handleReviewPayment(p._id, "approve")}
                      disabled={reviewingPaymentId === p._id}
                      className="px-3 py-1 text-xs font-semibold rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                    >
                      {reviewingPaymentId === p._id
                        ? "Approving..."
                        : "Approve"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
