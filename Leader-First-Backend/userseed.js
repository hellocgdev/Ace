import mongoose from "mongoose";
import User from "./models/user.js"; // adjust path as needed

const mongoURI =
  "mongodb+srv://rahul_123:rahul_123@cluster0.uqzrhnx.mongodb.net/leader-first?retryWrites=true&w=majority";

async function seedUsers() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    // Clear existing users (optional)
    await User.deleteMany({});

    // Passwords
    const adminPassword = "admin123";
    const userPassword = "user123";

    // Admin users
    const admins = [
      { email: "admin101@example.com", password: adminPassword, role: "admin" },
      { email: "admin102@example.com", password: adminPassword, role: "admin" },
      { email: "admin103@example.com", password: adminPassword, role: "admin" },
      { email: "admin104@example.com", password: adminPassword, role: "admin" },
      { email: "admin105@example.com", password: adminPassword, role: "admin" },
    ];

    // Regular users
    const users = [
      { email: "user101@example.com", password: userPassword, role: "user" },
      { email: "user102@example.com", password: userPassword, role: "user" },
      { email: "user103@example.com", password: userPassword, role: "user" },
      { email: "user104@example.com", password: userPassword, role: "user" },
      { email: "user105@example.com", password: userPassword, role: "user" },
    ];

    // Save all users (password will be hashed by your pre-save middleware)
    for (const u of [...admins, ...users]) {
      const user = new User(u);
      await user.save();
      console.log(`Created user: ${u.email} with role: ${u.role}`);
    }

    console.log("Seeding done.");
    mongoose.disconnect();
  } catch (error) {
    console.error("Seeding error:", error);
  }
}

seedUsers();
