import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CardIcon,
  UpiIcon,
  ArrowLeftIcon,
  LockIcon,
  GlobeIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  QrCodeIcon,
  CloseIcon,
  VisaIcon,
  MastercardIcon,
  PaymentLogoIcon,
  InfoIcon,
} from "./icons/Icons";

const PaymentGatewayPage = ({ plan, onClose, onPaymentSuccess }) => {
  const navigate = useNavigate();
  const [showUpiPopup, setShowUpiPopup] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [upiStep, setUpiStep] = useState("input");

  const [showCardPopup, setShowCardPopup] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [showQrPopup, setShowQrPopup] = useState(false);

  const paymentMethods = [
    {
      id: "card",
      name: "Cards",
      description: "Visa, Mastercard, RuPay & More",
      icon: <CardIcon className="text-gray-500" />,
    },
    {
      id: "upi",
      name: "UPI",
      description: "GooglePay, Paytm, PhonePe & More",
      icon: <UpiIcon className="text-gray-500" />,
    },
    {
      id: "qrcode",
      name: "QR Code",
      description: "Scan and pay with any UPI app",
      icon: <QrCodeIcon className="text-gray-500" />,
    },
  ];

  const handleMethodClick = (methodId) => {
    if (methodId === "upi") {
      setShowUpiPopup(true);
      setUpiStep("input");
      setUpiId("");
    } else if (methodId === "card") {
      setShowCardPopup(true);
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
    } else if (methodId === "qrcode") {
      setShowQrPopup(true);
      setTimeout(() => {
        setShowQrPopup(false);
        handlePaymentSuccess();
      }, 10000);
    }
  };

  const handlePaymentSuccess = () => {
    if (onPaymentSuccess) {
      onPaymentSuccess(plan);
    }
    if (onClose) {
      onClose();
    }
    alert(`Payment successful for ${plan.name} plan!`);
    setTimeout(() => navigate("/"), 1000);
  };

  const handleUpiVerify = (e) => {
    e.preventDefault();
    if (!upiId.trim()) return;
    setUpiStep("verifying");
    setTimeout(() => {
      setUpiStep("success");
      setTimeout(() => {
        setShowUpiPopup(false);
        handlePaymentSuccess();
      }, 2000);
    }, 1500);
  };

  const handleCardPayment = (e) => {
    e.preventDefault();
    if (!cardNumber.trim() || !expiryDate.trim() || !cvv.trim()) {
      alert("Please fill in all card details.");
      return;
    }
    setShowCardPopup(false);
    handlePaymentSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-gray-400 hover:text-gray-600"
        >
          <CloseIcon />
        </button>

        <div className="p-3 flex justify-between items-center text-xs text-gray-500 border-b">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-1">
            <LockIcon className="w-3 h-3" />
            <span>
              Secured by <span className="font-semibold">SecurePay</span>
            </span>
          </div>
          <button className="flex items-center space-x-1 p-1 rounded hover:bg-gray-100">
            <GlobeIcon className="w-3 h-3" />
            <span>English</span>
            <ChevronDownIcon className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-blue-800 p-5 text-white">
          <h1 className="text-3xl font-bold flex items-center">
            <span className="font-extrabold text-4xl mr-1 tracking-tighter">
              ≡
            </span>
            SecurePay
          </h1>
          <p className="text-sm text-blue-200 ml-1">Payment Gateway</p>
        </div>

        <div className="p-5">
          <div className="mb-4 bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">
              Plan: <span className="font-semibold">{plan.name}</span>
            </p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              ₹{plan.price}
            </p>
          </div>

          <h2 className="font-semibold text-gray-700 mb-3">
            Select Payment Method
          </h2>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => handleMethodClick(method.id)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left border border-gray-200"
              >
                <div className="flex items-center">
                  {method.icon}
                  <div className="ml-4">
                    <p className="font-semibold text-gray-800">{method.name}</p>
                    <p className="text-xs text-gray-500">
                      {method.description}
                    </p>
                  </div>
                </div>
                <ChevronRightIcon className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* UPI Payment Popup */}
      {showUpiPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
            {upiStep === "input" && (
              <>
                <div className="flex items-center justify-center mb-4">
                  <UpiIcon className="w-6 h-6 mr-2 text-gray-700" />
                  <h2 className="text-lg font-semibold text-gray-800">UPI</h2>
                </div>
                <form onSubmit={handleUpiVerify}>
                  <label
                    htmlFor="upi-id"
                    className="text-sm text-gray-600 block mb-2 text-left"
                  >
                    Enter UPI ID
                  </label>
                  <input
                    id="upi-id"
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2.5 rounded-md mt-6 hover:bg-indigo-700 transition-colors font-semibold"
                  >
                    Verify and Proceed
                  </button>
                </form>
              </>
            )}
            {upiStep === "verifying" && (
              <div className="py-8">
                <div className="w-12 h-12 border-4 border-t-indigo-600 border-gray-200 rounded-full animate-spin mx-auto"></div>
                <p className="text-gray-700 mt-4">Verifying UPI ID...</p>
              </div>
            )}
            {upiStep === "success" && (
              <div className="py-8">
                <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <p className="font-semibold text-lg text-gray-800">
                  UPI Mandate
                </p>
                <p className="text-gray-700">Registration Successful</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Card Payment Popup */}
      {showCardPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-gray-50 rounded-lg shadow-xl p-6 w-full max-w-sm relative">
            <button
              onClick={() => setShowCardPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <CloseIcon />
            </button>
            <div className="flex items-center mb-4">
              <PaymentLogoIcon />
            </div>

            <p className="text-sm text-gray-600 mb-2">
              Safe payments using your credit or debit card
            </p>
            <div className="flex items-center space-x-2 mb-6">
              <VisaIcon className="w-10 h-auto" />
              <MastercardIcon className="w-10 h-auto" />
            </div>

            <form onSubmit={handleCardPayment} className="space-y-4">
              <div>
                <label
                  htmlFor="card-number"
                  className="text-xs text-gray-500 block mb-1"
                >
                  Card number
                </label>
                <input
                  id="card-number"
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="0000 0000 0000 0000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="expiry-date"
                    className="text-xs text-gray-500 block mb-1"
                  >
                    Expiry date
                  </label>
                  <input
                    id="expiry-date"
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM / YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="cvv"
                    className="flex items-center text-xs text-gray-500 mb-1"
                  >
                    CVV
                    <span className="inline-block ml-1 group relative">
                      <InfoIcon className="text-gray-400" />
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        The 3 or 4-digit security code on your card.
                      </span>
                    </span>
                  </label>
                  <input
                    id="cvv"
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md mt-4 hover:bg-blue-700 transition-colors font-semibold"
              >
                Pay ₹{plan.price.toFixed(2)}
              </button>
            </form>
            <p className="text-xs text-gray-400 text-center mt-4">
              Payment powered by{" "}
              <span className="font-semibold">SecurePay</span>
            </p>
          </div>
        </div>
      )}

      {/* QR Code Payment Popup - ONLY SCANNER IMAGE */}
      {showQrPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4">
          <button
            onClick={() => setShowQrPopup(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <CloseIcon className="w-8 h-8" />
          </button>

          <div className="relative">
            <img
              src="/shared_status.png"
              alt="Scan to Pay"
              className="max-w-[90vw] max-h-[90vh] w-auto h-auto rounded-lg shadow-2xl"
              onError={(e) => {
                console.error("Failed to load QR code");
                e.target.src =
                  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="%23f0f0f0" width="400" height="400"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="20">QR Code Not Found</text></svg>';
              }}
            />

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full">
              <p className="text-sm font-semibold">Pay ₹{plan.price}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentGatewayPage;
