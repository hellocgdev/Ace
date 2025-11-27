import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import mammoth from "mammoth";
import ArticlePreviewModal from "./ArticlePreviewModal";

const PaywallModal = ({ open, onClose, onUpgrade }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-sm w-full p-6 relative">
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        <h3 className="text-xl font-bold mb-2">Upgrade required</h3>
        <p className="text-sm text-gray-600 mb-6">
          You’ve reached your free publish limit. Upgrade to continue.
        </p>
        <div className="flex gap-3">
          <button
            className="flex-1 bg-black text-white rounded-lg py-2 font-semibold hover:bg-gray-800"
            onClick={onUpgrade}
          >
            Upgrade
          </button>
          <button
            className="flex-1 bg-white border border-gray-300 rounded-lg py-2 font-semibold hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const MenuBar = React.memo(({ editor, onImageSelect }) => {
  if (!editor) return null;
  return (
    <div className="flex flex-wrap gap-0.5 px-3 py-2.5 bg-white border-b border-gray-200 items-center">
      <button
        className="p-1.5 hover:bg-gray-100 rounded text-sm font-semibold"
        title="Bold"
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
      >
        <b>B</b>
      </button>
      <button
        className="p-1.5 hover:bg-gray-100 rounded text-sm font-semibold"
        title="Italic"
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <i>I</i>
      </button>
      <button
        className="p-1.5 hover:bg-gray-100 rounded text-sm font-semibold"
        title="Underline"
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleUnderline().run();
        }}
      >
        <u>U</u>
      </button>
      <button
        className="p-1.5 hover:bg-gray-100 rounded text-sm font-semibold"
        title="Strikethrough"
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
      >
        S
      </button>

      <div className="w-px bg-gray-300 h-5 mx-1"></div>

      <button
        className="p-1.5 hover:bg-gray-100 rounded text-xs font-bold"
        title="Normal"
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().setParagraph().run();
        }}
      >
        Normal
      </button>
      <button
        className="p-1.5 hover:bg-gray-100 rounded text-xs font-bold"
        title="H1"
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().setHeading({ level: 1 }).run();
        }}
      >
        H1
      </button>
      <button
        className="p-1.5 hover:bg-gray-100 rounded text-xs font-bold"
        title="H2"
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().setHeading({ level: 2 }).run();
        }}
      >
        H2
      </button>
      <button
        className="p-1.5 hover:bg-gray-100 rounded text-xs font-bold"
        title="H3"
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().setHeading({ level: 3 }).run();
        }}
      >
        H3
      </button>

      <div className="w-px bg-gray-300 h-5 mx-1"></div>

      <button
        className="p-1.5 hover:bg-gray-100 rounded"
        title="Bullet List"
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        •
      </button>
      <button
        className="p-1.5 hover:bg-gray-100 rounded"
        title="Ordered List"
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
      >
        1.
      </button>

      <div className="w-px bg-gray-300 h-5 mx-1"></div>

      <label
        className="p-1.5 hover:bg-gray-100 rounded cursor-pointer"
        title="Image"
      >
        🖼️
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={onImageSelect}
        />
      </label>
      <button
        className="p-1.5 hover:bg-gray-100 rounded"
        title="Link"
        onMouseDown={(e) => {
          e.preventDefault();
          const url = prompt("Enter URL:");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
      >
        🔗
      </button>

      <div className="w-px bg-gray-300 h-5 mx-1"></div>

      <button
        className="p-1.5 hover:bg-gray-100 rounded text-xs text-gray-600"
        title="Clear"
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().unsetAllMarks().clearNodes().run();
        }}
      >
        Clear
      </button>
    </div>
  );
});

const UploadArticlePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(localStorage.getItem("user") || "{}") : null;
  const role = user?.role;
  const isAdmin = role === "admin";
  const isAuthor = role === "author";

  const searchParams = new URLSearchParams(location.search);
  const editId = searchParams.get("edit");

  const [title, setTitle] = useState("");
  const [labels, setLabels] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [additionalImages, setAdditionalImages] = useState([]);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [processingDocx, setProcessingDocx] = useState(false);
  const [allArticles, setAllArticles] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  // Featured leader (optional)
  const [selectedLeader, setSelectedLeader] = useState(""); // manual text or ID

  const [publishedAt] = useState(() => {
    const now = new Date();
    return now.toLocaleString("en-GB", { hour12: false }).replace(",", "");
  });

  const contentImageInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const additionalImagesInputRef = useRef(null);
  const docxInputRef = useRef(null);
  const hasLoadedArticles = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg my-4",
        },
      }),
    ],
    content: "",
  });

  // Fetch own / all articles for sidebar
  useEffect(() => {
    if ((!isAdmin && !isAuthor) || !token || hasLoadedArticles.current) return;

    hasLoadedArticles.current = true;
    (async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE;
        const res = await fetch(`${baseUrl}/api/articles/mine`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setAllArticles(Array.isArray(data) ? data : data.data || []);
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
      }
    })();
  }, [isAdmin, isAuthor, token]);

  // Load article for editing
  useEffect(() => {
    if (!editId || !token) return;

    (async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE;
        const res = await fetch(`${baseUrl}/api/articles/secure/${editId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Failed to load article for editing.");
          return;
        }

        setTitle(data.title || "");
        setLabels(data.category || "");
        editor?.commands.setContent(data.content || "");
        if (data.thumbnail?.url) {
          setThumbnailPreview(data.thumbnail.url);
        }
        if (data.leaderFeatured) {
          setSelectedLeader(
            typeof data.leaderFeatured === "string"
              ? data.leaderFeatured
              : data.leaderFeatured._id || ""
          );
        }
      } catch (err) {
        setError("Failed to load article for editing.");
      }
    })();
  }, [editId, token, editor]);

  const uploadImageToServer = async (blobOrFile, name) => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE;
      const formData = new FormData();
      const file =
        blobOrFile instanceof File
          ? blobOrFile
          : new File([blobOrFile], name, {
              type: blobOrFile.type || "image/png",
            });

      formData.append("thumbnail", file);

      const res = await fetch(`${baseUrl}/api/upload/thumbnail`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || `Upload failed (${res.status})`);
      }

      const data = await res.json();
      return data.url || "";
    } catch (err) {
      console.error("Upload error:", err);
      return "";
    }
  };

  const dataUrlToBlob = async (dataUrl) => {
    const res = await fetch(dataUrl);
    return await res.blob();
  };

  const replaceAllSafe = (html, needle, replacement) =>
    html.split(needle).join(replacement);

  const processDocxWithImages = async (arrayBuffer) => {
    let index = 0;
    const jobs = [];
    const placeholderToUrl = new Map();

    const result = await mammoth.convertToHtml(
      { arrayBuffer },
      {
        convertImage: mammoth.images.imgElement(async (image) => {
          index += 1;
          const placeholder = `__IMAGE_${index}__`;

          try {
            const base64 = await image.read("base64");
            const mime = image.contentType || "image/png";
            const dataUrl = `data:${mime};base64,${base64}`;

            const job = (async () => {
              try {
                const blob = await dataUrlToBlob(dataUrl);
                const ext = (mime.split("/")[1] || "png").toLowerCase();
                const name = `docx-img-${Date.now()}-${index}.${ext}`;
                const url = await uploadImageToServer(blob, name);
                placeholderToUrl.set(placeholder, url || dataUrl);
              } catch (e) {
                console.error("Upload job error:", e);
                placeholderToUrl.set(placeholder, dataUrl);
              }
            })();

            jobs.push(job);
            return { src: placeholder, alt: `Image ${index}` };
          } catch (e) {
            console.error(`❌ Failed to process ${placeholder}:`, e);
            return {
              src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
              alt: `Image ${index}`,
            };
          }
        }),
      }
    );

    await Promise.all(jobs);

    let finalHtml = result.value || "";
    placeholderToUrl.forEach((url, ph) => {
      finalHtml = replaceAllSafe(finalHtml, ph, url);
    });

    return { html: finalHtml, imageCount: placeholderToUrl.size };
  };

  const handleDocxFile = async (file) => {
    if (!file || !file.name.endsWith(".docx")) {
      setError("❌ Please select a .docx file");
      return;
    }

    setProcessingDocx(true);
    setError("");
    setSuccess("📄 Processing DOCX and uploading images...");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const { html, imageCount } = await processDocxWithImages(arrayBuffer);
      if (!html) throw new Error("Could not extract content from DOCX");

      editor?.commands.setContent(html);

      setSuccess(
        imageCount > 0
          ? `✅ DOCX loaded! ${imageCount} image(s) uploaded and displayed.`
          : "✅ DOCX loaded! No images found in document."
      );
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      console.error("❌ DOCX processing error:", err);
      setError(`❌ Error: ${err.message}`);
    } finally {
      setProcessingDocx(false);
    }
  };

  const handleContentImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadImageToServer(file, file.name);
    if (url) editor?.chain().focus().setImage({ src: url }).run();
    else setError("❌ Failed to upload image");

    if (contentImageInputRef.current) contentImageInputRef.current.value = "";
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setThumbnailPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const limitedFiles = files.slice(0, 5);
    setAdditionalImages((prev) => [...prev, ...limitedFiles].slice(0, 5));

    limitedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdditionalImagePreviews((prev) =>
          [...prev, reader.result].slice(0, 5)
        );
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveAdditionalImage = (index) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
    setAdditionalImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    const docxFile = Array.from(files).find((f) => f.name.endsWith(".docx"));

    if (docxFile) {
      handleDocxFile(docxFile);
    } else {
      setError("❌ Please drag a .docx file");
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragOver(false), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const content = editor?.getHTML() || "";
    const plainTextContent = editor?.getText().trim() || "";
    const titleValue = title.trim();
    const labelsValue = labels.trim();

    if (!titleValue || !labelsValue || !plainTextContent) {
      setError("❌ Please fill: Title, Labels, and Content");
      return;
    }

    setIsUploading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE;

      let thumbnailData = {};
      if (thumbnailFile) {
        const thumbFormData = new FormData();
        thumbFormData.append("thumbnail", thumbnailFile);
        const thumbRes = await fetch(`${baseUrl}/api/upload/thumbnail`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: thumbFormData,
        });
        if (thumbRes.ok) {
          thumbnailData = await thumbRes.json();
        }
      }

      const uploadedImages = [];
      for (const imageFile of additionalImages) {
        const imgFormData = new FormData();
        imgFormData.append("thumbnail", imageFile);
        const imgRes = await fetch(`${baseUrl}/api/upload/thumbnail`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: imgFormData,
        });
        if (imgRes.ok) {
          const imgData = await imgRes.json();
          uploadedImages.push({
            url: imgData.url,
            publicId: imgData.publicId,
            alt: titleValue,
          });
        }
      }

      const baseBody = {
        title: titleValue,
        content,
        category: labelsValue,
        thumbnail: thumbnailData.url
          ? {
              url: thumbnailData.url,
              publicId: thumbnailData.publicId,
              alt: titleValue,
            }
          : undefined,
        images: uploadedImages,
        status: isAdmin ? "published" : "pending",
        leaderFeatured: selectedLeader || undefined,
      };

      const url = editId
        ? `${baseUrl}/api/articles/${editId}`
        : `${baseUrl}/api/articles`;
      const method = editId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(baseBody),
      });

      const data = await res.json();

      if (res.status === 402 && data?.code === "PAYMENT_REQUIRED") {
        setError("You have reached your free publish limit.");
        setShowPaywall(true);
        setTimeout(() => {
          setShowPaywall((open) => {
            if (open) navigate("/pay");
            return open;
          });
        }, 5000);
        setIsUploading(false);
        return;
      }

      if (res.ok) {
        setSuccess(
          isAdmin
            ? "✅ Article published successfully!"
            : "✅ Article sent for review!"
        );
        setTitle("");
        setLabels("");
        setThumbnailFile(null);
        setThumbnailPreview("");
        setAdditionalImages([]);
        setAdditionalImagePreviews([]);
        setSelectedLeader("");
        editor?.commands.setContent("");
        const created = data.data || data;
        setAllArticles((prev) => (created ? [created, ...prev] : prev));
        setTimeout(
          () => navigate(isAdmin ? "/dashboard/admin" : "/dashboard/author"),
          1500
        );
      } else {
        setError(`${data.message || "Failed to publish"}`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveDraft = async () => {
    setError("");
    setSuccess("");

    const content = editor?.getHTML() || "";
    const plainTextContent = editor?.getText().trim() || "";
    const titleValue = title.trim();
    const labelsValue = labels.trim();

    if (!titleValue || !labelsValue || !plainTextContent) {
      setError("❌ Please fill: Title, Labels, and Content");
      return;
    }

    setIsUploading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE;

      let thumbnailData = {};
      if (thumbnailFile) {
        const thumbFormData = new FormData();
        thumbFormData.append("thumbnail", thumbnailFile);
        const thumbRes = await fetch(`${baseUrl}/api/upload/thumbnail`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: thumbFormData,
        });
        if (thumbRes.ok) {
          thumbnailData = await thumbRes.json();
        }
      }

      const uploadedImages = [];
      for (const imageFile of additionalImages) {
        const imgFormData = new FormData();
        imgFormData.append("thumbnail", imageFile);
        const imgRes = await fetch(`${baseUrl}/api/upload/thumbnail`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: imgFormData,
        });
        if (imgRes.ok) {
          const imgData = await imgRes.json();
          uploadedImages.push({
            url: imgData.url,
            publicId: imgData.publicId,
            alt: titleValue,
          });
        }
      }

      const baseBody = {
        title: titleValue,
        content,
        category: labelsValue,
        thumbnail: thumbnailData.url
          ? {
              url: thumbnailData.url,
              publicId: thumbnailData.publicId,
              alt: titleValue,
            }
          : undefined,
        images: uploadedImages,
        status: "draft",
        leaderFeatured: selectedLeader || undefined,
      };

      const url = editId
        ? `${baseUrl}/api/articles/${editId}`
        : `${baseUrl}/api/articles`;
      const method = editId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(baseBody),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("✅ Draft saved successfully!");
        const created = data.data || data;
        setAllArticles((prev) => (created ? [created, ...prev] : prev));
      } else {
        setError(data.message || "Failed to save draft");
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isAdmin && !isAuthor) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-red-100 rounded text-center text-red-700">
        <p className="font-bold">Access Denied</p>
        <p>Only authors and admins can upload articles.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4 border-b bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                navigate(isAdmin ? "/dashboard/admin" : "/dashboard/author")
              }
              className="text-gray-600 hover:text-gray-900 text-2xl transition"
              title="Back"
            >
              ←
            </button>
            <span className="text-lg font-semibold text-gray-800">
              The Leaders First
            </span>
          </div>
          <div className="flex items-center gap-3">
            {isAuthor && (
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isUploading || processingDocx}
                className="px-4 py-1.5 text-gray-700 hover:bg-gray-100 rounded text-sm font-medium transition"
              >
                💾 Save draft
              </button>
            )}
            <button
              onClick={() => setShowPreview(true)}
              className="px-4 py-1.5 text-gray-700 hover:bg-gray-100 rounded text-sm font-medium transition"
            >
              👁️ Preview
            </button>
            <button
              onClick={handleSubmit}
              disabled={isUploading || processingDocx}
              className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded px-6 py-1.5 font-semibold text-sm shadow-md transition"
            >
              {isAdmin
                ? isUploading
                  ? "Publishing..."
                  : "Publish"
                : isUploading
                ? "Sending..."
                : "Send for review"}
            </button>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto px-12 py-10">
          <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
            {/* Title */}
            <input
              type="text"
              className="bg-transparent outline-none border-0 border-b-2 border-[#f05c56] text-5xl font-serif mb-8 w-full placeholder:text-gray-300 focus:border-[#f05c56] transition py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />

            {/* Toolbar + Editor */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm mb-6">
              <MenuBar
                editor={editor}
                onImageSelect={() => contentImageInputRef.current?.click()}
              />
              <input
                ref={contentImageInputRef}
                type="file"
                accept="image/*"
                onChange={handleContentImageSelect}
                className="hidden"
              />
              <div
                className={`bg-white min-h-[450px] border-t border-gray-200 transition ${
                  isDragOver ? "ring-2 ring-blue-300 bg-blue-50" : ""
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <EditorContent
                  editor={editor}
                  className="prose prose-sm max-w-none p-6"
                />
              </div>
            </div>

            {/* DOCX Drop Area */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition ${
                isDragOver
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <input
                ref={docxInputRef}
                type="file"
                accept=".docx"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleDocxFile(f);
                }}
                className="hidden"
                disabled={processingDocx}
              />
              <div className="space-y-2">
                <div className="text-3xl">📄</div>
                <button
                  type="button"
                  onClick={() => docxInputRef.current?.click()}
                  disabled={processingDocx}
                  className="text-blue-600 hover:text-blue-700 font-semibold text-base disabled:opacity-50"
                >
                  {processingDocx
                    ? "⏳ Processing DOCX..."
                    : "Click to select DOCX file"}
                </button>
                <p className="text-sm text-gray-600">
                  or drag and drop your DOCX file here
                </p>
              </div>
            </div>

            {/* Messages */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-300 text-red-700 rounded-lg text-sm mb-6 font-medium">
                {error}
              </div>
            )}
            {success && (
              <div className="p-4 bg-green-50 border border-green-300 text-green-700 rounded-lg text-sm mb-6 font-medium">
                {success}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-80 border-l border-gray-200 bg-white flex flex-col overflow-hidden shadow-sm">
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-1.5 flex-1 bg-gray-100 border border-gray-300 px-3 py-2 rounded hover:bg-gray-200 text-gray-700 font-medium text-sm transition"
            >
              Preview
            </button>
            <button
              onClick={handleSubmit}
              disabled={isUploading || processingDocx}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-3 py-2 rounded font-semibold text-sm shadow-md transition"
            >
              {isAdmin
                ? isUploading
                  ? "Publishing..."
                  : "Publish"
                : isUploading
                ? "Sending..."
                : "Send for review"}
            </button>
          </div>

          {/* Thumbnail */}
          <div className="space-y-2">
            <label className="block font-bold text-xs text-gray-700 uppercase tracking-wider">
              Thumbnail Image
            </label>
            <input
              ref={thumbnailInputRef}
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => thumbnailInputRef.current?.click()}
              className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded font-medium text-sm transition"
            >
              Choose Image
            </button>
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Thumbnail"
                className="w-full h-32 object-cover rounded-lg shadow-sm border border-gray-200"
              />
            )}
          </div>

          {/* Additional Images */}
          <div className="space-y-2">
            <label className="block font-bold text-xs text-gray-700 uppercase tracking-wider">
              Additional Images (Optional)
            </label>
            <p className="text-xs text-gray-500 mb-2">
              First image = cover. Second image appears after scrolling 1.5x
              screen height. Max 5 images.
            </p>
            <input
              ref={additionalImagesInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleAdditionalImagesChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => additionalImagesInputRef.current?.click()}
              disabled={additionalImages.length >= 5}
              className="w-full px-4 py-2 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-200 disabled:text-gray-400 text-blue-800 rounded font-medium text-sm transition"
            >
              {additionalImages.length >= 5
                ? "Max 5 Images"
                : `Add Images (${additionalImages.length}/5)`}
            </button>
            {additionalImagePreviews.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {additionalImagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Additional ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg shadow-sm border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveAdditionalImage(index)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ✕
                    </button>
                    <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                      {index === 0
                        ? "Cover"
                        : index === 1
                        ? "Scroll"
                        : `#${index + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block font-bold text-xs text-gray-700 uppercase tracking-wider">
              Category
            </label>
            <select
              value={labels}
              onChange={(e) => setLabels(e.target.value)}
              className="w-full border-2 border-gray-300 bg-white focus:ring-2 focus:ring-brand-teal focus:border-brand-teal px-3 py-2 text-sm rounded-md transition"
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Politics">Politics</option>
              <option value="Environment">Environment</option>
              <option value="Business">Business</option>
              <option value="Health">Health</option>
              <option value="Science">Science</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Sports">Sports</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Fashion">Fashion</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Leadership">Leadership</option>
            </select>
          </div>

          {/* Featured Leader (optional, manual entry) */}
          <div className="space-y-2">
            <label className="block font-bold text-xs text-gray-700 uppercase tracking-wider">
              Featured Leader (optional)
            </label>
            <input
              type="text"
              value={selectedLeader}
              onChange={(e) => setSelectedLeader(e.target.value)}
              placeholder="Enter Leader ID (User _id)"
              className="w-full border-2 border-gray-300 bg-white focus:ring-2 focus:ring-brand-teal focus:border-brand-teal px-3 py-2 text-sm rounded-md transition"
            />
          </div>

          {/* Published on */}
          <div className="space-y-1">
            <label className="block font-bold text-xs text-gray-700 uppercase tracking-wider">
              Published on
            </label>
            <p className="text-sm text-gray-700 font-medium">{publishedAt}</p>
          </div>

          {/* Uploaded Articles */}
          <div className="space-y-2">
            <label className="block font-bold text-xs text-gray-700 uppercase tracking-wider">
              Uploaded Articles ({allArticles.length})
            </label>
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {allArticles.length > 0 ? (
                allArticles.map((article) => (
                  <button
                    key={article._id}
                    type="button"
                    onClick={() =>
                      article.status === "published"
                        ? navigate(`/blog/${article._id}`)
                        : navigate(`/upload-article?edit=${article._id}`)
                    }
                    className="w-full text-left p-2.5 hover:bg-gray-100 rounded transition group"
                  >
                    <p className="text-xs font-semibold text-gray-800 group-hover:text-brand-teal truncate">
                      {article.title}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {article.status === "published"
                        ? `/blog-post-${article._id.slice(0, 8)}`
                        : `Draft • ${article._id.slice(0, 8)}`}
                    </p>
                  </button>
                ))
              ) : (
                <p className="text-xs text-gray-400 text-center py-6">
                  No articles yet
                </p>
              )}
            </div>
          </div>
        </div>
      </aside>

      <ArticlePreviewModal
        open={showPreview}
        onClose={() => setShowPreview(false)}
        title={title}
        content={editor?.getHTML() || ""}
        thumbnail={thumbnailPreview}
        labels={labels}
        publishedAt={publishedAt}
        author={user?.email || "Anonymous"}
        images={additionalImagePreviews}
      />
      <PaywallModal
        open={showPaywall}
        onClose={() => setShowPaywall(false)}
        onUpgrade={() => {
          setShowPaywall(false);
          navigate("/pay");
        }}
      />
    </div>
  );
};

export default UploadArticlePage;
