import EnterpriseInquiry from "../models/enterpriseInquiry.js";
import { sendEmail } from "../utils/mail.js";

export const createEnterpriseInquiry = async (req, res) => {
  try {
    const { companyName, companyLink, numberOfEmployees, email, notes } =
      req.body;

    if (!companyName || !companyLink || !numberOfEmployees) {
      return res.status(400).json({
        message: "Company name, website and number of employees are required",
      });
    }

    const inquiry = await EnterpriseInquiry.create({
      companyName,
      companyLink,
      numberOfEmployees,
      email: email || null,
      notes: notes || "",
    });

    const html = `
      <h2>New Enterprise Plan Inquiry</h2>
      <p><b>Company:</b> ${companyName}</p>
      <p><b>Website:</b> ${companyLink}</p>
      <p><b>Employees:</b> ${numberOfEmployees}</p>
      ${email ? `<p><b>Contact Email:</b> ${email}</p>` : ""}
      ${notes ? `<p><b>Notes:</b> ${notes}</p>` : ""}
      <p>Submitted at: ${inquiry.createdAt.toISOString()}</p>
    `;

    await sendEmail(
      process.env.ENTERPRISE_INBOX || "cr@theleadersfirst.com",
      "New Enterprise Plan Inquiry",
      html
    );

    return res.status(201).json({ success: true, data: inquiry });
  } catch (err) {
    console.error("Enterprise inquiry error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to submit inquiry" });
  }
};
