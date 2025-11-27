// seedAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function seedAdmin() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const adminEmail = "admin@leadersfirst.com";
    const adminPassword = "Admin@123456";
    const adminName = "Site Admin";

    // check if admin already exists
    let admin = await User.findOne({ email: adminEmail });

    if (admin) {
      console.log(
        "Admin user already exists:",
        admin.email,
        "role:",
        admin.role
      );
    } else {
      admin = await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword, // will be hashed by pre('save')
        role: "admin",
        planStatus: "inactive",
      });
      console.log("Admin user created:", admin.email);
    }

    process.exit(0);
  } catch (err) {
    console.error("Error seeding admin:", err);
    process.exit(1);
  }
}

seedAdmin();
