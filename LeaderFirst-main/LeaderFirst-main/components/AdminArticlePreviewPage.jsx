// AdminArticlePreviewPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogPostLayout from "./BlogPostLayout";

const AdminArticlePreviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const baseUrl = import.meta.env.VITE_API_BASE;
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(localStorage.getItem("user") || "{}") : null;

  useEffect(() => {
    if (!token || user?.role !== "admin") {
      setError("Admins only");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${baseUrl}/api/articles/secure/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load article");
        setArticle(data);
      } catch (err) {
        setError(err.message || "Failed to load article");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, token, baseUrl, user]);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        {error}{" "}
        <button
          onClick={() => navigate(-1)}
          className="underline text-sm text-blue-600"
        >
          Go back
        </button>
      </div>
    );
  }

  if (!article) return null;

  return (
    <BlogPostLayout
      category={article.category}
      title={article.title}
      metaTitle={article.title}
      thumbnail={article.thumbnail}
      content={article.content}
      author={article.author}
      publishedAt={article.publishedAt || article.createdAt}
      currentUser={{ role: "admin" }} // so BlogPostLayout won't allow edit/delete
      articleId={article._id}
      images={article.images || []}
    />
  );
};

export default AdminArticlePreviewPage;
