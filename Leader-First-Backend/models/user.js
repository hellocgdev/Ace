import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const planDetailsSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      enum: ["Contributor", "Core Group", "Enterprise"],
      required: true,
      trim: true,
    },
    price: { type: Number, min: 0, required: true },
    currency: { type: String, default: "INR", trim: true },
    billingInterval: {
      type: String,
      enum: ["quarterly"],
      default: "quarterly",
    },
    allowedArticles: { type: Number, required: true, min: 1 },
    bonusArticles: { type: Number, default: 0, min: 0 },
    description: String,
    features: [String],
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const profileIndividualSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    twitter: { type: String, trim: true },
    linkedin: { type: String, trim: true },
  },
  { _id: false }
);

const profileOrgSchema = new mongoose.Schema(
  {
    providerName: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    companyLink: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    revenue: { type: String, trim: true },
    employees: { type: String, trim: true },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    // single field covers all: user, author, Individual, Company, Agency, admin
    role: {
      type: String,
      enum: ["user", "author", "individual", "company", "agency", "admin"],
      default: "user",
      index: true,
    },

    individualProfile: { type: profileIndividualSchema, default: null },
    orgProfile: { type: profileOrgSchema, default: null },

    leadersFollowed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    companiesFollowed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
    ],

    planStatus: {
      type: String,
      enum: ["inactive", "active"],
      default: "inactive",
      index: true,
    },
    planRenewsAt: { type: Date, default: null },
    publishedCountPeriod: { type: Number, default: 0 },
    periodStart: { type: Date, default: () => new Date() },

    planDetails: { type: planDetailsSchema, default: null },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.ensurePeriodWindow = function () {
  const now = new Date();
  const msInDay = 24 * 60 * 60 * 1000;
  const windowDays = 30;
  if (!this.periodStart || (now - this.periodStart) / msInDay >= windowDays) {
    this.periodStart = now;
    this.publishedCountPeriod = 0;
  }
};

userSchema.methods.canPublish = function () {
  if (this.role === "admin") return true;
  if (this.role !== "author") return false;

  this.ensurePeriodWindow();

  if (this.planStatus === "active") return true;
  return this.publishedCountPeriod < 1;
};

userSchema.methods.incrementPublishCountIfNeeded = async function () {
  if (this.role !== "author") return;
  this.ensurePeriodWindow();
  if (this.planStatus !== "active") {
    this.publishedCountPeriod += 1;
  }
  await this.save();
};

userSchema.methods.setAuthorPlan = async function (plan) {
  if (this.role !== "author") return;

  this.planStatus = "active";
  this.planDetails = plan;
  this.planRenewsAt = plan.validUntil || null;
  await this.save();
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
