// src/components/TrendingStrip.jsx
import React from "react";
import { Link } from "react-router-dom";

// expects: articles = [{ _id, title, category, publishedAt }]
const TrendingStrip = ({ articles = [] }) => {
  if (!articles.length) return null;

  return (
    <section className="py-16 bg-[#FBF9F6] ">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-2">
              What readers are into
            </p>
            <h2 className="text-xl md:text-2xl font-semibold font-serif text-gray-900">
              Trending this week
            </h2>
          </div>
          <Link
            to="/blog"
            className="text-sm font-medium text-blue-700 hover:underline"
          >
            See all
          </Link>
        </div>

        {/* Ranked list */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-4 md:px-6 py-4 md:py-6">
          {articles.map((a, index) => (
            <Link
              key={a._id}
              to={`/blog/${a._id}`}
              className="group flex items-start gap-4 py-3 border-b border-gray-100 last:border-b-0 transition-transform duration-150 ease-out hover:-translate-y-0.5"
            >
              {/* Rank pill */}
              <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-[13px] font-semibold text-gray-600">
                {index + 1}
              </div>

              {/* Title + meta */}
              <div className="flex-1 min-w-0">
                {a.category && (
                  <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-blue-700 mb-1">
                    {a.category}
                  </p>
                )}
                <p className="text-sm md:text-[15px] font-medium font-serif text-gray-900 leading-snug group-hover:text-blue-700 line-clamp-2">
                  {a.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingStrip;
