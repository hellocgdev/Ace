// const adminEmail = "admin@leadersfirst.com";
//     const adminPassword = "Admin@123456";
//     const adminName = "Site Admin";

// seedAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.js";

dotenv.config();

const MONGO_URI =
  "mongodb+srv://rahul_123:rahul_123@cluster0.uqzrhnx.mongodb.net/leader-first?retryWrites=true&w=majority";

async function seedAdmins() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const admins = [
      { name: "Site Admin 1", email: "admin1@leadersfirst.com" },
      { name: "Site Admin 2", email: "admin2@leadersfirst.com" },
      { name: "Site Admin 3", email: "admin3@leadersfirst.com" },
      { name: "Site Admin 4", email: "admin4@leadersfirst.com" },
      { name: "Site Admin 5", email: "admin5@leadersfirst.com" },
      { name: "Site Admin 6", email: "admin6@leadersfirst.com" },
      { name: "Site Admin 7", email: "admin7@leadersfirst.com" },
      { name: "Site Admin 8", email: "admin8@leadersfirst.com" },
      { name: "Site Admin 9", email: "admin9@leadersfirst.com" },
      { name: "Site Admin 10", email: "admin10@leadersfirst.com" },
    ];

    const defaultPassword = "Admin@123456";

    for (const adm of admins) {
      let existing = await User.findOne({ email: adm.email });

      if (existing) {
        console.log(
          "Admin already exists:",
          existing.email,
          "role:",
          existing.role
        );
      } else {
        const created = await User.create({
          name: adm.name,
          email: adm.email,
          password: defaultPassword, // hashed by pre('save')
          role: "admin",
          planStatus: "active",
        });
        console.log("Admin user created:", created.email);
      }
    }

    process.exit(0);
  } catch (err) {
    console.error("Error seeding admins:", err);
    process.exit(1);
  }
}

seedAdmins();
