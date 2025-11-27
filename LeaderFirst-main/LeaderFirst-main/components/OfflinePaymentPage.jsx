import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const PLAN_AMOUNT = {
  contributor: 52,
  core: 160,
  enterprise: 106,
};

const OfflinePaymentPage = () => {
  const location = useLocation();
  const planKey =
    location.state?.planKey ||
    new URLSearchParams(location.search).get("plan") ||
    "core";

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [name, setName] = useState(storedUser.name || "");
  const [txId, setTxId] = useState("");
  const [bankName, setBankName] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);

  const amount = PLAN_AMOUNT[planKey] || PLAN_AMOUNT.core;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in first to submit a payment request.");
      return;
    }

    try {
      setSubmitting(true);
      const baseUrl = import.meta.env.VITE_API_BASE;
      const res = await fetch(`${baseUrl}/api/offline-payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          planKey,
          amount,
          txId,
          bankName,
          paymentDate,
          note,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit payment");

      setMessage(
        "Payment request submitted. Admin will verify your transaction and activate your plan."
      );
      setTxId("");
      setBankName("");
      setPaymentDate("");
      setNote("");
      setShowReviewModal(true);
    } catch (err) {
      setError(err.message || "Failed to submit payment");
    } finally {
      setSubmitting(false);
    }
  };

  // Prevent Enter from submitting the form
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const tag = e.target.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea") {
        e.preventDefault();
      }
    }
  };

  const displayPlanName =
    planKey === "core"
      ? "Core Group"
      : planKey.charAt(0).toUpperCase() + planKey.slice(1);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full grid md:grid-cols-2 gap-8 p-8">
        {/* Left: bank details + QR */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Bank Transfer Details
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Please pay <b>₹{amount}</b> for the <b>{displayPlanName} plan</b>{" "}
            using the bank details or QR code below, then submit the form with
            your transaction reference so our team can verify it.
          </p>
          <div className="border rounded-lg p-4 text-sm space-y-1 bg-gray-50">
            <p>
              <b>Account Name:</b> CG Group
            </p>
            <p>
              <b>Account Number:</b> 0549231538
            </p>
            <p>
              <b>Bank Name:</b> Kotak Mahindra Bank
            </p>
            <p>
              <b>IFSC:</b> KKBK0000656
            </p>
            <p>
              <b>UPI ID:</b> cggroup@kotak
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Scan to pay:</p>
            <img
              src="/public/CG_GROUP_PAYMENT_QR.jpg"
              alt="Company payment QR"
              className="w-40 h-40 border rounded-md"
            />
          </div>
        </div>

        {/* Right: form */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Payment Details Form
          </h2>
          <form
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
            className="space-y-3 text-sm"
          >
            <div>
              <label className="block mb-1 font-medium text-gray-800">
                Name
              </label>
              <input
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/70"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-800">
                Email
              </label>
              <input
                className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700"
                value={storedUser.email || ""}
                disabled
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-800">
                Amount Paid (INR)
              </label>
              <input
                className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700"
                value={amount}
                readOnly
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-800">
                Selected Plan
              </label>
              <input
                className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700"
                value={displayPlanName}
                readOnly
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-800">
                Bank / UPI Reference (Txn ID / UTR)
              </label>
              <input
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/70"
                value={txId}
                onChange={(e) => setTxId(e.target.value)}
                placeholder="e.g. UTR12345..., UPI Ref..."
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-800">
                Payment Date
              </label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/70"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-800">
                Notes (optional)
              </label>
              <textarea
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/70"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Any additional information that helps us verify your payment."
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                {error}
              </p>
            )}
            {message && (
              <p className="text-xs text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-black text-white py-2 rounded-md font-semibold disabled:bg-gray-400 mt-2"
            >
              {submitting ? "Submitting..." : "Submit payment details"}
            </button>
          </form>
        </div>
      </div>

      {/* Payment under review modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl relative">
            <button
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
              onClick={() => setShowReviewModal(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              Payment Under Review
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Your payment details have been submitted. Our team will verify the
              transaction and activate your {displayPlanName} plan once the
              payment is confirmed.
            </p>
            <button
              onClick={() => setShowReviewModal(false)}
              className="w-full bg-black text-white py-2 rounded-md font-semibold"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfflinePaymentPage;
