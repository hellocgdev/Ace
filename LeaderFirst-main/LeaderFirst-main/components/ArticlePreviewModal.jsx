import React from "react";

const ArticlePreviewModal = ({
  open,
  onClose,
  title,
  content,
  thumbnail,
  labels,
  publishedAt,
  author,
  images = [], // Support additional images in preview
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-gray-800">
            Article Preview
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl font-bold transition"
            aria-label="Close preview"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          <article className="max-w-3xl mx-auto px-8 py-12">
            {/* Thumbnail / Cover Image */}
            {images && images.length > 0 ? (
              <img
                src={images[0].url || images[0]} // Handle object or string (preview might pass strings)
                alt={title || "Article Cover"}
                className="w-full h-96 object-cover rounded-lg shadow-lg mb-8"
              />
            ) : thumbnail ? (
              <img
                src={thumbnail}
                alt={title || "Article"}
                className="w-full h-96 object-cover rounded-lg shadow-lg mb-8"
              />
            ) : null}

            {/* Title */}
            <h1 className="text-5xl font-serif font-semibold text-gray-900 mb-4 leading-tight">
              {title || "Untitled Article"}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-200">
              {author && <span className="font-medium">{author}</span>}
              {publishedAt && (
                <>
                  {author && <span>•</span>}
                  <span>{publishedAt}</span>
                </>
              )}
              {labels && (
                <>
                  {(author || publishedAt) && <span>•</span>}
                  <span className="font-medium text-brand-teal">{labels}</span>
                </>
              )}
            </div>

            {/* Content with proper image rendering */}
            <div
              className="prose prose-lg prose-gray max-w-none prose-headings:font-serif prose-headings:font-semibold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-brand-teal prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:list-disc prose-ol:list-decimal prose-li:text-gray-700"
              style={{
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              {content ? (
                <div
                  dangerouslySetInnerHTML={{ __html: content }}
                  className="article-content"
                />
              ) : (
                <p className="text-gray-500 italic">No content yet...</p>
              )}
            </div>

            {/* Additional Images Preview */}
            {images && images.length > 1 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-6">
                  Gallery
                </h3>
                <div className="space-y-8">
                  {/* Second Image (Scroll Image) */}
                  {images[1] && (
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Scroll Image:</p>
                      <img
                        src={images[1].url || images[1]}
                        alt="Scroll View"
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                    </div>
                  )}
                  
                  {/* Gallery Grid */}
                  {images.length > 2 && (
                    <div className="grid grid-cols-2 gap-4">
                      {images.slice(2).map((img, idx) => (
                        <img
                          key={idx}
                          src={img.url || img}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-48 object-cover rounded-lg shadow-sm"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </article>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-8 py-4 bg-gray-50 flex justify-end sticky bottom-0 z-10">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold text-sm transition"
          >
            Close Preview
          </button>
        </div>
      </div>

      {/* Add this style tag to ensure images display properly */}
      <style jsx>{`
        .article-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1.5rem auto;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .article-content p {
          margin-bottom: 1rem;
        }

        .article-content h1,
        .article-content h2,
        .article-content h3 {
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .article-content ul,
        .article-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .article-content li {
          margin-bottom: 0.5rem;
        }

        .article-content a {
          color: #14b8a6;
          text-decoration: none;
        }

        .article-content a:hover {
          text-decoration: underline;
        }

        .article-content strong {
          font-weight: 600;
          color: #111827;
        }
      `}</style>
    </div>
  );
};

export default ArticlePreviewModal;
