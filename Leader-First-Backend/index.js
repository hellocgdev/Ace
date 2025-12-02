import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.js";
import articleRoute from "./routes/article.js";
import uploadRoute from "./routes/upload.js";
import billingRoute from "./routes/billing.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import donationRoutes from "./routes/donation.js";
import adminRoute from "./routes/adminRoutes.js";
import stripeWebhookRouter from "./routes/stripeWebhook.js";
import paymentRequestRoutes from "./routes/paymentRequestRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import enterpriseRoutes from "./routes/enterpriseRoutes.js";
import referralRoutes from "./routes/referralRoutes.js";

dotenv.config();

const port = process.env.PORT || 8080;

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "https://leadersfirst-frontend.onrender.com",
      "https://ace-frontend-ta0j.onrender.com",
      "https://www.theleadersfirst.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// 5. Body parsers with increased limits for images
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// 6. Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// 7. Health check route
app.get("/", (req, res) => {
  res.json({
    message: "Blog API is running",
    timestamp: new Date().toISOString(),
  });
});

// 8. API Routes
app.use("/api/auth", authRoute);
app.use("/api/articles", articleRoute);
app.use("/api/upload", uploadRoute);
// Billing and app routes
app.use("/billing", billingRoute);
app.use("/api/payments", paymentRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/stripe", stripeWebhookRouter);
app.use("/api/offline-payments", paymentRequestRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/enterprise", enterpriseRoutes);
app.use("/api/referrals", referralRoutes);

// 9. 404 handler
app.use((req, res) => {
  console.log(` 404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.path}`,
  });
});

// 10. Global error handler
app.use((err, req, res, next) => {
  console.error(" Global error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// 11. Connect to database and start server
connectDB()
  .then(() => {
    console.log(" MongoDB connected");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);

      console.log(
        "CORS enabled for: http://localhost:3000, http://localhost:5173"
      );
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection failed:", err.message);
    process.exit(1);
  });
