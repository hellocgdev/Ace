import User from "../models/user.js";
import Company from "../models/company.js";

// Get all leaders and companies followed by current user
export const getFollowed = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("leadersFollowed", "name email role")
      .populate("companiesFollowed", "name industry");
    res.json({
      leadersFollowed: user.leadersFollowed,
      companiesFollowed: user.companiesFollowed,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch followed items" });
  }
};

// Follow a leader
export const followLeader = async (req, res) => {
  try {
    const { leaderId } = req.body;
    if (!leaderId)
      return res.status(400).json({ message: "leaderId required" });

    const user = await User.findById(req.user.id);
    if (user.leadersFollowed.includes(leaderId))
      return res.status(400).json({ message: "Already following leader" });

    user.leadersFollowed.push(leaderId);
    await user.save();
    res.json({ message: "Leader followed!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to follow leader" });
  }
};

// Unfollow a leader
export const unfollowLeader = async (req, res) => {
  try {
    const { leaderId } = req.body;
    const user = await User.findById(req.user.id);
    user.leadersFollowed = user.leadersFollowed.filter(
      (id) => id.toString() !== leaderId
    );
    await user.save();
    res.json({ message: "Leader unfollowed!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to unfollow leader" });
  }
};

// Follow a company
export const followCompany = async (req, res) => {
  try {
    const { companyId } = req.body;
    if (!companyId)
      return res.status(400).json({ message: "companyId required" });

    const user = await User.findById(req.user.id);
    if (user.companiesFollowed.includes(companyId))
      return res.status(400).json({ message: "Already following company" });

    user.companiesFollowed.push(companyId);
    await user.save();
    res.json({ message: "Company followed!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to follow company" });
  }
};

// Unfollow a company
export const unfollowCompany = async (req, res) => {
  try {
    const { companyId } = req.body;
    const user = await User.findById(req.user.id);
    user.companiesFollowed = user.companiesFollowed.filter(
      (id) => id.toString() !== companyId
    );
    await user.save();
    res.json({ message: "Company unfollowed!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to unfollow company" });
  }
};
