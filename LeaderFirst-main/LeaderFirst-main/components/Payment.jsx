import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// ------------------------
// Checkout Form Component
// ------------------------
function CheckoutForm({ clientSecret, amount }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-6">
      {/* Stripe Built-in Payment UI */}
      <PaymentElement />

      {/* Pay Button */}
      <button
        disabled={loading || !stripe || !elements}
        className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>

      {message && (
        <p className="text-red-600 text-center text-sm mt-2">{message}</p>
      )}
    </form>
  );
}

// ------------------------
// Main Payment Page Wrapper
// ------------------------
export default function Payment() {
  const [amount, setAmount] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const createPaymentIntent = async () => {
    const res = await fetch("/api/payments/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amount * 100, // convert ₹ to paise
      }),
    });

    const data = await res.json();
    setClientSecret(data.clientSecret);
  };

  const appearance = {
    theme: "stripe",
    variables: { borderRadius: "12px" },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Payment Checkout
        </h2>

        {/* Amount Input */}
        {!clientSecret && (
          <div className="space-y-4">
            <input
              type="number"
              className="w-full border p-3 rounded-lg"
              placeholder="Enter amount (₹)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button
              onClick={createPaymentIntent}
              disabled={!amount}
              className="w-full bg-black text-white py-3 rounded-xl text-lg font-medium hover:bg-gray-800 disabled:opacity-50"
            >
              Continue to Pay
            </button>
          </div>
        )}

        {/* Stripe Payment UI */}
        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret, appearance }}
          >
            <CheckoutForm clientSecret={clientSecret} amount={amount} />
          </Elements>
        )}
      </div>
    </div>
  );
}
