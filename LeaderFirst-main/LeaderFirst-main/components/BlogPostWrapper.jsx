import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogPostLayout from "./BlogPostLayout";

const BlogPostWrapper = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get current user from localStorage
  const currentUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError("");

      try {
        const baseUrl = import.meta.env.VITE_API_BASE;

        const res = await fetch(`${baseUrl}/api/articles/${id}`);

        if (!res.ok) {
          if (res.status === 404) {
            setError("Article not found");
          } else {
            setError("Failed to load article");
          }
          setLoading(false);
          return;
        }

        const data = await res.json();
        console.log("Fetched article:", data);

        // API returns the article directly (with populated author)
        setPost(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-2xl font-semibold text-gray-600">
            Loading article...
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xl text-red-600 mb-4">{error}</div>
          <a href="/blog" className="text-brand-teal hover:underline">
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

  // Not found state
  if (!post) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xl text-gray-600 mb-4">Article not found</div>
          <a href="/blog" className="text-brand-teal hover:underline">
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <BlogPostLayout
      title={post.title}
      category={post.category}
      metaTitle={null} // You can add this field to schema if needed
      thumbnail={post.thumbnail}
      content={post.content}
      author={post.author}
      publishedAt={post.publishedAt}
      currentUser={currentUser}
      articleId={post._id}
      images={post.images || []} // Pass images array
    />
  );
};

export default BlogPostWrapper;
