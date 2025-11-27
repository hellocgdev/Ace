// controllers/articleController.js
import Article from "../models/article.js";
import User from "../models/user.js"; // needed for author methods

// Create article (author or admin)
const createArticle = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      thumbnail,
      images,
      status,
      leaderFeatured,
    } = req.body;

    if (!title || !content || !category) {
      return res
        .status(400)
        .json({ message: "Title, content and category are required" });
    }

    let initialStatus = "draft";
    const allowedForAuthor = ["draft", "pending"];
    const allowedForAdmin = ["draft", "pending", "published"];

    if (req.user.role === "author") {
      initialStatus = allowedForAuthor.includes(status) ? status : "draft";
    } else if (req.user.role === "admin") {
      initialStatus = allowedForAdmin.includes(status) ? status : "draft";
    }

    const article = await Article.create({
      title,
      content,
      category,
      thumbnail,
      images,
      author: req.user._id,
      leaderFeatured: leaderFeatured || null,
      status: initialStatus,
      publishedAt: initialStatus === "published" ? new Date() : null,
    });

    res.status(201).json(article);
  } catch (err) {
    console.error("createArticle error:", err); // add this
    res.status(500).json({ message: "Failed to create article" });
  }
};

// Update article (author/admin)
const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Not found" });

    const isAuthor = article.author.toString() === req.user._id.toString();

    if (req.user.role === "author" && !isAuthor) {
      return res.status(403).json({ message: "Not your article" });
    }
    if (req.user.role === "author" && article.status === "published") {
      return res
        .status(403)
        .json({ message: "Published article cannot be edited" });
    }

    const fields = [
      "title",
      "content",
      "category",
      "thumbnail",
      "images",
      "status",
      "leaderFeatured", // NEW: allow updating featured leader
    ];

    for (const key of fields) {
      if (req.body[key] !== undefined) {
        if (key === "status") {
          // only allow draft/pending via update; publish must go through moderation
          if (["draft", "pending"].includes(req.body.status)) {
            article.status = req.body.status;
            article.rejectionReason = undefined;
          }
        } else {
          article[key] = req.body[key];
        }
      }
    }

    await article.save();
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: "Failed to update article" });
  }
};

// Author submits for review
const submitForReview = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Not found" });

    const isAuthor = article.author.toString() === req.user._id.toString();

    if (req.user.role === "author" && !isAuthor) {
      return res.status(403).json({ message: "Not your article" });
    }
    if (article.status === "published") {
      return res.status(400).json({ message: "Already published" });
    }

    article.status = "pending";
    article.rejectionReason = undefined;
    await article.save();

    res.json(article);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit article" });
  }
};

// Admin: list all pending
const getPendingArticles = async (req, res) => {
  try {
    const articles = await Article.find({ status: "pending" })
      .sort({ createdAt: -1 })
      .populate("author", "email role name")
      .populate("leaderFeatured", "name"); // optional populate
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Failed to load pending articles" });
  }
};

// Admin: moderate (publish or reject)
const moderateArticle = async (req, res) => {
  try {
    const { action, reason } = req.body;
    const article = await Article.findById(req.params.id).populate(
      "author",
      "+password"
    );
    if (!article) return res.status(404).json({ message: "Not found" });

    // load full User doc so methods are available
    const author = await User.findById(article.author._id).select("+password");
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    if (action === "publish") {
      if (!author.canPublish()) {
        return res.status(403).json({
          message:
            "Author has reached free publish limit or does not have an active plan",
        });
      }

      article.status = "published";
      article.publishedAt = new Date();
      article.rejectionReason = undefined;
      await article.save();

      await author.incrementPublishCountIfNeeded();

      res.json(article);
    } else if (action === "reject") {
      article.status = "draft";
      article.rejectionReason = reason || "Rejected by admin";
      await article.save();
      res.json(article);
    } else {
      res.status(400).json({ message: "Invalid moderation action" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to moderate article" });
  }
};

// Author/admin dashboard: own or all articles
const getMyArticles = async (req, res) => {
  try {
    const filter = req.user.role === "author" ? { author: req.user._id } : {};
    const articles = await Article.find(filter)
      .sort({ createdAt: -1 })
      .populate("author", "email name")
      .populate("leaderFeatured", "name"); // optional populate
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Failed to load articles" });
  }
};

// Public: list published (homepage/blog)
const getPublishedArticles = async (req, res) => {
  try {
    const filter = { status: "published" };
    if (req.query.category) filter.category = req.query.category;

    const articles = await Article.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .populate("author", "email name")
      .populate("leaderFeatured", "name"); // optional populate

    res.json(articles);
  } catch (err) {
    console.error("getPublishedArticles error:", err); // add this
    res.status(500).json({ message: "Failed to load articles" });
  }
};

// Public: single published article
const getPublishedArticleById = async (req, res) => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      status: "published",
    })
      .populate("author", "email name")
      .populate("leaderFeatured", "name"); // optional populate
    if (!article) return res.status(404).json({ message: "Not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: "Failed to load article" });
  }
};

// Author/Admin: get single article (any status) for editing/preview
const getArticleSecureById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate("author", "email name")
      .populate("leaderFeatured", "name"); // optional populate
    if (!article) return res.status(404).json({ message: "Not found" });

    const isAuthor = article.author._id.toString() === req.user._id.toString();

    // authors can only access their own; admins can access any
    if (req.user.role === "author" && !isAuthor) {
      return res.status(403).json({ message: "Not your article" });
    }

    res.json(article);
  } catch (err) {
    res.status(500).json({ message: "Failed to load article" });
  }
};
// Delete article (admin or owning author)
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Not found" });
    }

    const isAuthor = article.author.toString() === req.user._id.toString();

    // authors can delete only their own; admins can delete any
    if (req.user.role === "author" && !isAuthor) {
      return res.status(403).json({ message: "Not your article" });
    }

    await article.deleteOne();

    return res.json({ message: "Article deleted successfully" });
  } catch (err) {
    console.error("deleteArticle error:", err);
    return res.status(500).json({ message: "Failed to delete article" });
  }
};

export default {
  createArticle,
  updateArticle,
  submitForReview,
  getPendingArticles,
  moderateArticle,
  getMyArticles,
  getPublishedArticles,
  getPublishedArticleById,
  getArticleSecureById,
  deleteArticle,
};
