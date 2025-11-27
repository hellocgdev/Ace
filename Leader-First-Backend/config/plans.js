// config/plans.js (or at top of payments route)
export const PLAN_CONFIG = {
  core: {
    planName: "Core Group",
    price: 354, // ₹354 per quarter (or 106 if you’re in discount mode)
    currency: "INR",
    billingInterval: "quarterly",
    allowedArticles: 9,
    bonusArticles: 0,
    description:
      "7+2 articles per quarter. For dedicated founders seeking peer advisory.",
    features: [
      "Placement in a curated Core Group",
      "Monthly facilitated peer group sessions",
      "Private communication channels",
      "Direct access to an executive facilitator",
      "Annual in-person retreat",
    ],
  },
};
