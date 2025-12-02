// components/ReferFriendModal.jsx
import React, { useState, useEffect } from "react";

const ReferFriendModal = ({ open, onClose }) => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const baseUrl = import.meta.env.VITE_API_BASE;

  // When modal opens, auto fetch/create referral code
  useEffect(() => {
    if (!open) {
      setCode("");
      setDiscount(null);
      setCopied(false);
      setError("");
      return;
    }

    const fetchCode = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please log in again.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${baseUrl}/api/referrals/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok && data.code) {
          setCode(data.code);
          setDiscount(data.discountPercent);
        } else {
          setError(data.message || "Failed to load referral code");
        }
      } catch {
        setError("Network error. Please try again.");
      }
      setLoading(false);
    };

    fetchCode();
  }, [open, baseUrl]);

  if (!open) return null;

  const handleCopy = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl relative">
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-2 text-gray-900">
          Refer a friend
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Share this referral code with your friends. They can enter it on the
          payment page to get a discount.
        </p>

        {loading ? (
          <p className="text-sm text-gray-600">Loading your referral code...</p>
        ) : error ? (
          <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </p>
        ) : (
          <>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Your referral code
            </label>
            <div className="flex items-center gap-2 mb-2">
              <input
                className="flex-1 border rounded px-3 py-2 text-sm font-mono bg-gray-50"
                value={code}
                readOnly
              />
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-2 text-xs rounded-md border border-gray-300 bg-white hover:bg-gray-50"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            {discount != null && (
              <p className="text-xs text-gray-500">
                Friends using this code get {discount}% off.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReferFriendModal;
