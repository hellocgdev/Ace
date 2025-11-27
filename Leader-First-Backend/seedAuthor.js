// seedUsers.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.DATABASE_URL;

async function seedAuthorAndUser() {
  try {
    if (!MONGO_URI) throw new Error("MONGO_URI / DATABASE_URL not set in .env");

    await mongoose.connect(MONGO_URI);

    // Define an "author" and a "user" (reader)
    const users = [
      {
        name: "Author2",
        email: "author2@leadersfirst.com",
        password: "Author2@123456",
        role: "author",
        planStatus: "inactive",
      },
      {
        name: "Author3",
        email: "author3@leadersfirst.com",
        password: "Author@123456",
        role: "author",
        planStatus: "inactive",
      },
      {
        name: "Author4",
        email: "author4@leadersfirst.com",
        password: "Author@123456",
        role: "author",
        planStatus: "inactive",
      },
    ];

    for (const user of users) {
      let found = await User.findOne({ email: user.email });
      if (found) {
        console.log(
          `User ${user.email} already exists with role: ${found.role}`
        );
        continue;
      }
      await User.create(user);
      console.log(`Created ${user.role}: ${user.email}`);
    }

    console.log("Seeding finished.");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding users:", err);
    process.exit(1);
  }
}

seedAuthorAndUser();


//     const users = [
//       {
//         name: "Author PlanActive",
//         email: "activeauthor@leadersfirst.com",
//         password: "Author@123456",
//         role: "author",
//         planStatus: "active", // THIS author can upload!
//       },
//       {
//         name: "Reader NoPlan",
//         email: "user@leadersfirst.com",
//         password: "User@123456",
//         role: "user",
//         planStatus: "inactive", // Cannot upload
//       },
//     ];
