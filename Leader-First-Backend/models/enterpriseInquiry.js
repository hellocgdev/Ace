import mongoose from "mongoose";

const enterpriseInquirySchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true },
    companyLink: { type: String, required: true, trim: true },
    numberOfEmployees: { type: String, required: true, trim: true },
    email: { type: String, trim: true }, // optional: who submitted
    notes: { type: String, trim: true }, // optional extra info
  },
  { timestamps: true }
);

const EnterpriseInquiry =
  mongoose.models.EnterpriseInquiry ||
  mongoose.model("EnterpriseInquiry", enterpriseInquirySchema);

export default EnterpriseInquiry;
