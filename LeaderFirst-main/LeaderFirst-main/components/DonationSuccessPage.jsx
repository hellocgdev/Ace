// src/pages/DonationSuccessPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DonationSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, transactionId, donorName } = location.state || {};

  if (!amount || !transactionId) {
    navigate("/donate");
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center py-20">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 font-serif">
          Thank You{donorName ? `, ${donorName}` : ""}!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your generous donation of{" "}
          <span className="font-semibold text-gray-900">₹{amount}</span> will
          help us create impactful content and support meaningful causes.
        </p>
        <div className="bg-gray-50 rounded-lg p-6 mb-8 inline-block">
          <p className="text-sm text-gray-500 mb-2">Transaction ID</p>
          <p className="text-sm font-mono text-gray-800">{transactionId}</p>
        </div>
        <p className="text-gray-500 mb-8">
          A receipt has been sent to your email
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/blog")}
            className="inline-block bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition font-medium"
          >
            Return to Blog
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-block bg-white border-2 border-gray-300 text-gray-700 px-8 py-3 rounded hover:bg-gray-50 transition font-medium"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccessPage;
