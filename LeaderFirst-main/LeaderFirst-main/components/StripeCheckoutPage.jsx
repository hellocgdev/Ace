import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const StripeCheckoutButton = ({ priceId: propPriceId = null }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // planKey can be passed via router state or via ?plan= query
  const planKey =
    location.state?.planKey || new URLSearchParams(location.search).get("plan");

  const envMap = {
    contributor: import.meta.env.VITE_STRIPE_PRICE_ID_CONTRIBUTOR,
    core:
      import.meta.env.VITE_STRIPE_PRICE_ID_CORE ||
      import.meta.env.VITE_STRIPE_PRICE_ID_COREGROUP,
    enterprise: import.meta.env.VITE_STRIPE_PRICE_ID_ENTERPRISE,
  };

  const priceId =
    propPriceId ||
    (planKey ? envMap[planKey] : null) ||
    import.meta.env.VITE_STRIPE_PRICE_ID_COREGROUP;

  // Debug logs to help ensure correct mapping
  console.debug(
    "StripeCheckoutPage: planKey=",
    planKey,
    "selected priceId=",
    priceId
  );

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const baseUrl = import.meta.env.VITE_API_BASE;
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${baseUrl}/api/payments/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ priceId }),
        }
      );

      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.message || "Failed to start checkout");
      }

      window.location.href = data.url; // redirect to Stripe Checkout
    } catch (err) {
      console.error("Checkout error:", err);
      alert(err.message || "Failed to start checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="bg-black text-white px-6 py-2 rounded-md font-semibold disabled:bg-gray-400"
    >
      {loading ? "Redirecting..." : "Upgrade with Stripe"}
    </button>
  );
};

export default StripeCheckoutButton;
