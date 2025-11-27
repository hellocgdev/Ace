// src/components/EditorsPicks.jsx
import React from "react";
import { Link } from "react-router-dom";

const getExcerpt = (htmlContent, maxLength = 140) => {
  const temp = document.createElement("div");
  temp.innerHTML = htmlContent || "";
  const text = temp.textContent || temp.innerText || "";
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
};

const EditorsPicks = ({ articles = [] }) => {
  if (!articles.length) return null;

  const [primary, ...rest] = articles;

  return (
    <section className="py-16 bg-[#FBF9F6] ">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-2">
              Curated for you
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold font-serif text-gray-900">
              Editor's picks
            </h2>
          </div>
          <p className="hidden sm:block text-sm text-gray-500 max-w-sm text-right">
            Hand‑selected stories our editors recommend when you only have a few
            minutes.
          </p>
        </div>

        {/* Layout: hero + list */}
        <div className="grid md:grid-cols-3 gap-10 items-stretch">
          {/* Hero pick */}
          {primary && (
            <Link
              to={`/blog/${primary._id}`}
              className="group md:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-md"
            >
              {primary.thumbnail?.url && (
                <div className="md:w-1/3 w-full h-40 md:h-auto overflow-hidden">
                  <img
                    src={primary.thumbnail.url}
                    alt={primary.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6 md:p-7 flex-1 flex flex-col">
                {primary.category && (
                  <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-blue-700 mb-2">
                    {primary.category}
                  </p>
                )}
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 group-hover:text-blue-700 mb-3 leading-snug">
                  {primary.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4 flex-1">
                  {getExcerpt(primary.content, 210)}
                </p>
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-500">
                  Editor’s choice
                </p>
              </div>
            </Link>
          )}

          {/* Side list */}
          <div className="space-y-6">
            {rest.slice(0, 4).map((article) => (
              <Link
                key={article._id}
                to={`/blog/${article._id}`}
                className="group block border-b border-gray-200 pb-4 last:border-b-0 transition-transform duration-200 ease-out hover:-translate-y-0.5"
              >
                {article.category && (
                  <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-blue-700 mb-1">
                    {article.category}
                  </p>
                )}
                <h4 className="text-base font-semibold text-gray-900 leading-snug mb-1">
                  <span className="relative inline-block transition-colors group-hover:text-blue-700">
                    {article.title}
                    <span
                      className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-blue-700
                   transition-all duration-200 group-hover:w-full"
                    />
                  </span>
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {getExcerpt(article.content, 110)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorsPicks;
