// controllers/authController.js
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { sendEmail } from "../utils/mail.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRE || "7d";

const otpStore = new Map();

const signToken = (id) =>
  jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// ---------- EMAIL OTP (unchanged except using sendEmail) ----------
const sendOtpEmail = async (email, otp) => {
  const html = `
    <h2>Your OTP Code</h2>
    <p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>
  `;
  await sendEmail(email, "Your OTP Code", html);
};

const requestOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const otp = generateOTP();
    otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 });

    await sendOtpEmail(email, otp);

    return res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// verify OTP but delegate actual user creation to signup endpoint
const verifyOtpAndRegister = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const record = otpStore.get(email);
    if (!record) {
      return res.status(400).json({ message: "OTP expired or not requested" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (Date.now() > record.expires) {
      otpStore.delete(email);
      return res.status(400).json({ message: "OTP expired" });
    }

    otpStore.delete(email);

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // client can now call /auth/signup with the same email and extra details
    return res.status(200).json({
      message: "OTP verified. You can proceed to complete signup.",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// ---------- NEW: signup for Individual / Company / Agency / others ----------
const signup = async (req, res) => {
  try {
    const { role, email, password } = req.body;

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Role, email and password are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    let individualProfile = null;
    let orgProfile = null;

    if (role === "individual") {
      const { firstName, lastName, location, phone, twitter, linkedin } =
        req.body;

      if (!firstName || !lastName || !location || !phone) {
        return res.status(400).json({
          message:
            "First name, last name, location and phone are required for Individual signup",
        });
      }

      individualProfile = {
        firstName,
        lastName,
        location,
        phone,
        twitter: twitter || "",
        linkedin: linkedin || "",
      };
    } else if (role === "company" || role === "agency") {
      const {
        providerName,
        companyName,
        companyLink,
        location,
        revenue,
        employees,
      } = req.body;

      if (!providerName || !companyName || !companyLink || !location) {
        return res.status(400).json({
          message:
            "Provider name, company name, company link and location are required for Company/Agency signup",
        });
      }

      orgProfile = {
        providerName,
        companyName,
        companyLink,
        location,
        revenue: revenue || "",
        employees: employees || "",
      };
    } else if (!["user", "author", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // block self‑assigned admin
    const safeRole = role === "admin" ? "user" : role;

    const user = await User.create({
      email,
      password,
      role: safeRole,
      individualProfile,
      orgProfile,
    });

    const token = signToken(user._id);
    return res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// ---------- Login + Me unchanged ----------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email and password required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const ok = await user.comparePassword(password);
    if (!ok) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const token = signToken(user._id);
    return res.status(200).json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const me = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  user.ensurePeriodWindow?.();
  await user.save?.();

  res.json({
    success: true,
    data: {
      email: user.email,
      role: user.role,
      planStatus: user.planStatus,
      planName: user.stripeSubscriptionId ? user.planName || null : null,
      publishedCountPeriod: user.publishedCountPeriod,
      periodStart: user.periodStart,
      planRenewsAt: user.planRenewsAt,
    },
  });
};

export default {
  requestOtp,
  verifyOtpAndRegister,
  signup,
  login,
  me,
};
