import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CheckMarkIcon, BrainIcon } from "./icons/Icons";
import PaymentGatewayPage from "./PaymentGatewayPage";
import OfferPopup from "./OfferPopUp";
import EnterpriseContactForm from "./EnterpriseContactForm";

const plansData = [
  {
    name: "Plus",
    price: "$10",
    period: "per seat/month",
    cta: "Get started",
    description: "For small groups to plan and get organized.",
  },
  {
    name: "Business",
    price: "$20",
    period: "per seat/month",
    cta: "Get started",
    description:
      "For companies that use Notion to connect several teams & tools.",
  },
  {
    name: "Enterprise",
    price: "Contact us",
    period: "",
    cta: "Get started",
    description:
      "Advanced controls and support to run your entire organization.",
  },
];

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <h3 className="text-base text-brand-dark">
        <button
          className="w-full flex justify-between items-center text-left font-medium"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{question}</span>
          <span
            className={`text-2xl text-gray-400 font-light transform transition-transform duration-300 ${
              isOpen ? "rotate-45" : ""
            }`}
          >
            +
          </span>
        </button>
      </h3>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 pt-2" : "max-h-0"
        }`}
      >
        <div className="text-gray-600 leading-relaxed text-sm">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

const BenefitItem = ({ title, description }) => (
  <div>
    <h3 className="font-bold text-xl text-brand-dark mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const AsteriskSeparator = ({ className = "" }) => (
  <p className={`text-2xl text-gray-500 my-8 ${className}`}>*</p>
);

const PricingPage = () => {
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef(null);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();
  const [showOffer, setShowOffer] = useState(false);
  const [showEnterpriseForm, setShowEnterpriseForm] = useState(false);

  // Auth state (lightweight check for gating CTA)
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  let storedUser = {};
  if (typeof window !== "undefined") {
    try {
      storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      storedUser = {};
    }
  }
  const isAuthed = !!token || !!storedUser?.email;

  useEffect(() => {
    const dismissed = sessionStorage.getItem("offer:dismissed") === "1";
    if (dismissed) return;

    const t = setTimeout(() => setShowOffer(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const handleCloseOffer = () => {
    sessionStorage.setItem("offer:dismissed", "1");
    setShowOffer(false);
  };

  const handleCtaOffer = () => {
    sessionStorage.setItem("offer:dismissed", "1");
    setShowOffer(false);
  };

  useEffect(() => {
    const discountClaimed =
      sessionStorage.getItem("discountClaimed") === "true";
    setIsDiscountApplied(discountClaimed);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px", threshold: 1.0 }
    );
    const currentHeader = headerRef.current;
    if (currentHeader) observer.observe(currentHeader);
    return () => {
      if (currentHeader) observer.unobserve(currentHeader);
    };
  }, []);

  const handleCtaClick = (planKey, plan) => {
    // Force login before proceeding to payment or enterprise contact
    if (!isAuthed) {
      navigate("/login", { state: { redirectTo: "/pricing-page" } });
      return;
    }

    if (plan.price && plan.price.quarterly > 0) {
      navigate(`/payment?plan=${encodeURIComponent(planKey)}`, {
        state: { planKey },
      });
      console.debug("Navigating to payment for plan:", planKey);
    } else {
      setShowEnterpriseForm(true);
    }
  };

  const handlePaymentSuccess = (planData) => {
    setShowPaymentGateway(false);
    document.body.style.overflow = "auto";
    alert(`Payment successful for ${planData.name} plan!`);
  };

  const handleClosePaymentGateway = () => {
    setShowPaymentGateway(false);
    document.body.style.overflow = "auto";
  };

  // Pricing logic with 90% discount and AI sections removed for non‑enterprise plans
  const getPlanDetails = (isDiscounted) => {
    const basePlans = {
      contributor: {
        name: "Contributor",
        cta: "Get started",
        featuresIntro: "",
        features: [],
        aiTitle: "", // removed Member Perks block
        aiFeatures: [],
        popular: false,
      },
      core: {
        name: "Core Group",
        cta: "Get started",
        featuresIntro: "",
        features: [],
        aiTitle: "", // removed Enhanced Privileges block
        aiFeatures: [],
        popular: true,
      },
      premium: {
        name: "Premium",
        cta: "Get started",
        featuresIntro: "",
        features: [],
        aiTitle: "", // removed Premium Perks block
        aiFeatures: [],
        popular: false,
      },
      enterprise: {
        name: "Enterprise",
        cta: "Contact us",
        featuresIntro: "",
        features: [],
        aiTitle: "Enterprise Perks",
        aiFeatures: [
          "Volume discounts",
          "Custom integrations",
          "Advanced reporting & analytics",
          "Dedicated enterprise support",
        ],
        popular: false,
      },
    };

    // Current quarterly prices (already after discount)
    const discounted = {
      contributor: 52,
      core: 106,
      premium: 160,
    };

    const makePlan = (key, description, articlesPerQuarter) => {
      const discountedPrice = discounted[key];
      const originalPrice = discountedPrice * 10; // 90% off → original = 10x
      return {
        ...basePlans[key],
        price: {
          original: originalPrice,
          quarterly: discountedPrice,
        },
        description,
        articlesPerQuarter,
      };
    };

    if (isDiscounted) {
      return {
        contributor: makePlan(
          "contributor",
          "3 articles per quarter. Limited time 90% off the regular price.",
          3
        ),
        core: makePlan(
          "core",
          "9 articles per quarter. Limited time 90% off the regular price.",
          9
        ),
        premium: makePlan(
          "premium",
          "12 articles per quarter. Limited time 90% off the regular price.",
          12
        ),
        enterprise: {
          ...basePlans.enterprise,
          price: null,
          description:
            "Custom solutions tailored to your organization's needs.",
          articlesPerQuarter: null,
        },
      };
    }

    return {
      contributor: makePlan(
        "contributor",
        "2+1 articles per quarter. For active members seeking growth and connection.",
        3
      ),
      core: makePlan(
        "core",
        "7+2 articles per quarter. For dedicated founders seeking peer advisory.",
        9
      ),
      premium: makePlan(
        "premium",
        "10+2 articles per quarter. For leaders seeking maximum impact.",
        12
      ),
      enterprise: {
        ...basePlans.enterprise,
        price: null,
        description: "Custom solutions for leadership teams and organizations.",
        articlesPerQuarter: null,
      },
    };
  };

  const plans = getPlanDetails(isDiscountApplied);

  const benefitsCol1 = [
    {
      title: "Monthly Core Groups",
      description: "A group of 8 founders with an executive facilitator.",
    },
    {
      title: "Speaker Series",
      description: "Unique workshops with hard to reach experts.",
    },
  ];

  const benefitsCol2 = [
    {
      title: "Digital Community",
      description:
        "Access to a digital and highly engaged community of founders.",
    },
    {
      title: "Exclusive Perks",
      description:
        "Exclusive discounts with popular software companies and tools.",
    },
  ];

  const benefitsCol3 = [
    {
      title: "In-Person Community",
      description:
        "Monthly member dinners, annual retreats, and local adventures.",
    },
    {
      title: "Social Events",
      description: "Exclusive ice-breaker activities and events.",
    },
  ];

  const renderFeatureValue = (value) => {
    if (typeof value === "boolean") {
      return value ? (
        <CheckMarkIcon className="mx-auto text-black" />
      ) : (
        <span className="text-gray-400 mx-auto">-</span>
      );
    }
    return (
      <div
        className="text-sm text-center text-gray-800"
        dangerouslySetInnerHTML={{ __html: String(value) }}
      />
    );
  };

  const tableHeaderContent = (
    <div className="grid grid-cols-4 gap-x-4 items-end pb-8">
      <div className="col-span-1"></div>
      {plansData.map((plan, index) => (
        <div key={index} className="text-left">
          <h3 className="font-bold text-lg">{plan.name}</h3>
          <p className="text-sm text-gray-600">
            <span className="font-bold text-black">{plan.price}</span>
            {plan.period && <span> {plan.period}</span>}
          </p>
          {plan.description && (
            <p className="text-xs text-gray-500">{plan.description}</p>
          )}
          <button className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm">
            {plan.cta}
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="animate-fade-in bg-white">
      {showOffer && (
        <OfferPopup onClose={handleCloseOffer} onCtaClick={handleCtaOffer} />
      )}
      {showPaymentGateway && selectedPlan && (
        <PaymentGatewayPage
          plan={selectedPlan}
          onClose={handleClosePaymentGateway}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
      {showEnterpriseForm && (
        <EnterpriseContactForm
          onClose={() => setShowEnterpriseForm(false)}
          onSuccess={() =>
            console.log("Enterprise form submitted successfully")
          }
        />
      )}

      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-semibold text-brand-dark mb-4">
              Plans & Pricing
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8">
              Choose the plan that's right for your leadership journey. All paid
              plans come with a 30-day money-back guarantee.
            </p>
          </div>
          <div className="text-center text-gray-700 font-semibold">
            All plans are billed quarterly.
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 items-start max-w-7xl mx-auto">
            {Object.entries(plans).map(([planKey, plan]) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl p-8 flex flex-col h-full ${
                  plan.popular
                    ? "border-2 border-brand-teal shadow-2xl"
                    : "border border-gray-200 shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="text-center mb-4">
                    <span className="bg-brand-teal text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-brand-dark text-center mb-2">
                  {plan.name}
                </h3>
                <div className="text-center mb-6 h-16 flex flex-col items-center justify-center">
                  {plan.price ? (
                    <div>
                      {/* original price (before 90% discount) */}
                      <p className="text-sm text-gray-400 line-through mb-1">
                        ${plan.price.original}
                      </p>
                      {/* discounted price */}
                      <p className="text-5xl font-extrabold text-brand-dark">
                        ${plan.price.quarterly}
                      </p>
                      <p className="text-xs text-green-600 font-semibold mt-1">
                        Limited time 90% off
                      </p>
                    </div>
                  ) : (
                    <p className="text-2xl font-bold text-brand-dark">Custom</p>
                  )}
                </div>
                <p className="text-gray-600 text-center text-sm mb-8 min-h-12">
                  {plan.description}
                </p>
                <button
                  onClick={() => handleCtaClick(planKey, plan)}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? "bg-brand-dark text-black hover:bg-gray-800 hover:text-white border"
                      : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {plan.cta}
                </button>
                <div className="mt-8 pt-6 border-t border-gray-200 grow">
                  {plan.featuresIntro && (
                    <p className="font-semibold text-sm mb-4 text-gray-600">
                      {plan.featuresIntro}
                    </p>
                  )}
                  {plan.features.length > 0 && (
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <CheckMarkIcon className="mt-1 mr-3 text-brand-dark" />
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {plan.aiTitle && plan.aiFeatures.length > 0 && (
                    <div className="mt-6">
                      <div className="flex items-center text-brand-dark mb-4">
                        <BrainIcon className="mr-3 w-6 h-6" />
                        <p className="font-bold text-md">{plan.aiTitle}</p>
                      </div>
                      <ul className="space-y-3">
                        {plan.aiFeatures.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <CheckMarkIcon className="mt-1 mr-3 text-brand-dark" />
                            <span className="text-sm text-gray-700">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
