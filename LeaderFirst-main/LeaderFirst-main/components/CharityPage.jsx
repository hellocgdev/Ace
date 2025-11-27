// src/pages/DonationPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaymentGatewayPage from "../components/PaymentGatewayPage";

const DonationPage = () => {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE;
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      alert("Please login to make a donation");
      navigate("/login");
    }
  }, [token, navigate]);

  // State
  const [amount, setAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [donationPlan, setDonationPlan] = useState(null);

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setError("");

    if (!amount || parseFloat(amount) < 10) {
      setError("Minimum donation amount is ₹10");
      return;
    }

    if (!donorInfo.name || !donorInfo.email) {
      setError("Please fill in your name and email");
      return;
    }

    // Create donation plan object for payment gateway
    setDonationPlan({
      id: "donation",
      name: "Support The Leaders First",
      price: parseFloat(amount),
      description: "One-time donation",
    });

    // Show payment gateway
    setShowPaymentGateway(true);
  };

  // src/pages/DonationPage.jsx
  const handlePaymentSuccess = async (plan, paymentData) => {
    try {
      // Save donation to database after successful payment
      const response = await fetch(`${baseUrl}/api/donations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          donorName: donorInfo.name,
          donorEmail: donorInfo.email,
          donorPhone: donorInfo.phone,
          amount: parseFloat(amount),
          paymentMethod: paymentData.method, // From payment gateway
          message: donorInfo.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to thank you page
        navigate("/donation-success", {
          state: {
            amount: amount,
            transactionId: data.transactionId,
            donorName: donorInfo.name,
          },
        });
      } else {
        setError(data.message || "Failed to record donation");
      }
    } catch (error) {
      console.error("Donation save error:", error);
      setError(
        "Payment successful but failed to record donation. Please contact support."
      );
    }
  };

  if (!token) {
    return null;
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-white">
          <div
            className="max-w-4xl mx-auto px-1 md:pt-10 md:pb-3
 text-center"
          >
            <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 mb-6 font-serif">
              Support Our Mission
            </h1>
            <p className="text-xl font-serif md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Your contribution helps us continue creating thought-provoking
              content on leadership, performance, and personal growth.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16 mb-16 items-start">
            {/* Impact Section */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 font-serif">
                  Your Impact
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Quality Content
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Fund in-depth research and expert interviews for
                        articles that inspire and educate.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Community Growth
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Support community programs and events that bring leaders
                        together.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Platform Innovation
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Enable new features and tools to enhance your reading
                        experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  100% Transparent
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-gray-700 shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Your donation directly supports our mission</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-gray-700 shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Secure payment processing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Donation Form */}
            <div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-serif">
                  Make a Donation
                </h2>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <form onSubmit={handleProceedToPayment} className="space-y-6">
                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Donation Amount (₹) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                        ₹
                      </span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition"
                        min="10"
                        step="1"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Minimum amount: ₹10
                    </p>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={donorInfo.name}
                      onChange={(e) =>
                        setDonorInfo({ ...donorInfo, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={donorInfo.email}
                      onChange={(e) =>
                        setDonorInfo({ ...donorInfo, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={donorInfo.phone}
                      onChange={(e) =>
                        setDonorInfo({ ...donorInfo, phone: e.target.value })
                      }
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      value={donorInfo.message}
                      onChange={(e) =>
                        setDonorInfo({ ...donorInfo, message: e.target.value })
                      }
                      placeholder="Share your thoughts..."
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-4 rounded hover:bg-gray-800 transition font-medium"
                  >
                    Proceed to Payment
                  </button>

                  <p className="text-xs text-center text-gray-500">
                    Secure payment • Your data is protected
                  </p>
                </form>
              </div>
            </div>

            {/* Banking Details Section */}
            <div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-serif">
                  Pay via Net Banking
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Name
                    </label>
                    <p className="text-gray-900 font-semibold">CG Group</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Number
                    </label>
                    <p className="text-gray-900 font-semibold">0549231538</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bank
                    </label>
                    <p className="text-gray-900 font-semibold">Kotak Mahindra Bank</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      IFSC Code
                    </label>
                    <p className="text-gray-900 font-semibold">KKBK0000656</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Branch
                    </label>
                    <p className="text-gray-900 font-semibold">
                      Hiranandani Meadows, Pokharan Road 2
                    </p>
                  </div>
                </div>

                {/* QR Code */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4 text-center">
                    Scan to Pay
                  </h3>
                  <div className="flex justify-center">
                    <img
                      src="/CG_GROUP_PAYMENT_QR.jpg"
                      alt="CG Group Payment QR Code"
                      className="w-68 h-68 rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="border-t pt-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 font-serif text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  How is my donation used?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  100% of your donation supports content creation, research, and
                  platform development.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Is my payment secure?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Yes. We use industry-standard encryption.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Will I receive a receipt?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Yes, you'll receive an receipt immediately after your donation
                  is processed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Gateway Modal */}
      {showPaymentGateway && donationPlan && (
        <PaymentGatewayPage
          plan={donationPlan}
          onClose={() => setShowPaymentGateway(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
};

export default DonationPage;
