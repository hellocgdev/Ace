// src/components/Featured.jsx
import React from "react";
import { Link } from "react-router-dom";

const getExcerpt = (htmlContent, maxLength = 120) => {
    const temp = document.createElement("div");
    temp.innerHTML = htmlContent || "";
    const text = temp.textContent || temp.innerText || "";
    return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
};

const Featured = ({ articles = [] }) => {
    if (!articles || articles.length < 2) return null;

    const featuredArticle = articles[0];
    const sideArticles = articles.slice(1, 3); // Only 2 articles

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex items-baseline justify-between mb-10">
                    <h2 className="text-3xl md:text-4xl font-semibold font-serif text-gray-900">
                        Featured Articles
                    </h2>
                </div>

                {/* Main grid layout */}
                <div className="grid md:grid-cols-3 gap-10 items-stretch">
                    {/* Left - Main Featured Article */}
                    {featuredArticle && (
                        <Link
                            to={`/blog/${featuredArticle._id}`}
                            className="md:col-span-1 group cursor-pointer"
                        >
                            {/* Image */}
                            <div className="mb-6 overflow-hidden rounded-lg aspect-square">
                                {featuredArticle.thumbnail?.url ? (
                                    <img
                                        src={featuredArticle.thumbnail.url}
                                        alt={featuredArticle.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                                        <span className="text-gray-600 text-sm font-medium">No Image</span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div>
                                {featuredArticle.category && (
                                    <p className="text-xs font-semibold uppercase tracking-wide mb-2 text-blue-700">
                                        {featuredArticle.category}
                                    </p>
                                )}
                                <h3 className="text-xl font-semibold font-serif text-gray-900 mb-3 leading-snug group-hover:text-blue-700 line-clamp-3">
                                    {featuredArticle.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    {getExcerpt(featuredArticle.content, 100)}
                                </p>
                                <p className="text-xs font-semibold text-gray-500">
                                    By{" "}
                                    {featuredArticle.author?.name ||
                                        featuredArticle.author?.email ||
                                        "Anonymous"}
                                </p>
                            </div>
                        </Link>
                    )}

                    {/* Right - Side Articles (2 only, same height as left) */}
                    <div className="md:col-span-2 flex flex-col">
                        {sideArticles.map((article, index) => (
                            <Link
                                key={article._id}
                                to={`/blog/${article._id}`}
                                className={`group grid grid-cols-3 gap-6 items-start cursor-pointer flex-1 py-6 ${index !== sideArticles.length - 1 ? "border-b border-gray-200" : ""
                                    }`}
                            >
                                {/* Article Image */}
                                <div className="col-span-1 overflow-hidden rounded-lg aspect-square">
                                    {article.thumbnail?.url ? (
                                        <img
                                            src={article.thumbnail.url}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                                            <span className="text-gray-600 text-xs font-medium">
                                                No Image
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Article Content */}
                                <div className="col-span-2">
                                    {article.category && (
                                        <p className="text-xs font-semibold uppercase tracking-wide mb-1 text-blue-700">
                                            {article.category}
                                        </p>
                                    )}
                                    <h4 className="text-base font-semibold font-serif text-gray-900 mb-2 leading-snug group-hover:text-blue-700 line-clamp-3">
                                        {article.title}
                                    </h4>
                                    <p className="text-sm text-gray-900 mb-4">
                                        {getExcerpt(featuredArticle.content, 400)}
                                    </p>
                                    <p className="text-xs font-semibold text-gray-500">
                                        By{" "}
                                        {article.author?.name ||
                                            article.author?.email ||
                                            "Anonymous"}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;
