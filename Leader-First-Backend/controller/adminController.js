import User from "../models/user.js";

// Controller to get all users/authors for admin user management
export const getAllUsers = async (req, res) => {
  try {
    // Only allow admin role to access this endpoint
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Fetch users with selected fields, optionally paginate if needed
    // Add articlesCount virtual or aggregate if you have it
    const users = await User.find({})
      .select("name email role planStatus createdAt articlesCount")
      .lean();

    return res.status(200).json({ data: users });
  } catch (err) {
    console.error("Error fetching users for admin:", err);
    return res.status(500).json({ message: "Failed to fetch users" });
  }
};
