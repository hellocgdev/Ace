import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CheckMarkIcon, BrainIcon } from "./icons/Icons";
import PaymentGatewayPage from "./PaymentGatewayPage";
import OfferPopup from "./OfferPopUp";

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

const featureData = [
  {
    category: "Content",
    features: [
      {
        name: "Pages & blocks",
        values: ["Unlimited", "Unlimited", "Unlimited"],
      },
      { name: "File uploads", values: ["Unlimited", "Unlimited", "Unlimited"] },
    ],
  },
];

// const faqsData = [
//   {
//     question: "What is a 'Core Group'?",
//     answer:
//       "A Core Group is your personal board of directors. It's a curated group of 8 non-competing founders at a similar stage of growth, led by a professional executive coach.",
//   },
//   {
//     question: "Can I switch plans later?",
//     answer: "Absolutely. You can upgrade or downgrade your plan at any time.",
//   },
// ];

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

  useEffect(() => {
    // Prevent repeat during the same tab session
    const dismissed = sessionStorage.getItem("offer:dismissed") === "1";
    if (dismissed) return;

    const t = setTimeout(() => setShowOffer(true), 2000); // show after 2s
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
    // navigate to payment (Stripe checkout) and pass planKey in router state and query
    if (plan.price && plan.price.quarterly > 0) {
      // include plan in query so the page works even if state is lost
      navigate(`/payment?plan=${encodeURIComponent(planKey)}`, {
        state: { planKey },
      });
      console.debug("Navigating to payment for plan:", planKey);
    } else {
      alert("Contact us for Enterprise plan");
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

  const getPlanDetails = (isDiscounted) => {
    const basePlans = {
      contributor: {
        name: "Contributor",
        cta: "Get started",
        featuresIntro: "Everything in Free, plus:",
        features: [
          "Full access to all articles & resources",

          "Member directory access",
        ],
        aiTitle: "Member Perks",
        aiFeatures: [
          "Full access to software discounts",
          "Resource & template library",
        ],
        popular: false,
      },
      core: {
        name: "Core Group",
        cta: "Get started",
        featuresIntro: "Everything in Core Group, plus:",
        features: [
          "Placement in a curated Core Group",
          "Monthly facilitated peer group sessions",
          "Annual in-person retreat",
        ],
        aiTitle: "Enhanced Privileges",
        aiFeatures: ["Personalized growth plan", "Priority support"],
        popular: true,
      },
      enterprise: {
        name: "Enterprise",
        cta: "Get started",
        featuresIntro: "Everything in Enterprise, plus:",
        features: [
          "Private Core Groups for your team",
          "On-site workshops and training",
          "Customized leadership curriculum",
          "Dedicated success manager",
          "White-glove onboarding for your org",
        ],
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

    if (isDiscounted) {
      return {
        contributor: {
          ...basePlans.contributor,
          price: { quarterly: 52 },
          description: "3 articles per quarter. Limited time 70% off!",
          articlesPerQuarter: 3,
        },
        core: {
          ...basePlans.core,
          price: { quarterly: 106 },
          description: "9 articles per quarter. Limited time 70% off!",
          articlesPerQuarter: 9,
        },
        enterprise: {
          ...basePlans.enterprise,
          price: { quarterly: 160 },
          description: "15 articles per quarter. Limited time 70% off!",
          articlesPerQuarter: 15,
        },
      };
    }

    return {
      contributor: {
        ...basePlans.contributor,
        price: { quarterly: 174 },
        description:
          "2+1 articles per quarter. For active members seeking growth and connection.",
        articlesPerQuarter: 3,
      },
      core: {
        ...basePlans.core,
        price: { quarterly: 354 },
        description:
          "7+2 articles per quarter. For dedicated founders seeking peer advisory.",
        articlesPerQuarter: 9,
      },
      enterprise: {
        ...basePlans.enterprise,
        price: { quarterly: 534 },
        description:
          "12+3 articles per quarter. Custom solutions for leadership teams.",
        articlesPerQuarter: 15,
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-5xl mx-auto">
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
                <div className="text-center mb-6 h-16 flex items-center justify-center">
                  {plan.price ? (
                    <div>
                      <p className="text-5xl font-extrabold text-brand-dark">
                        ${plan.price.quarterly}
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
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckMarkIcon className="mt-1 mr-3 text-brand-dark" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          Plans and features
        </h2>
        <div className="overflow-x-auto">
          <div className="min-w-[900px] border border-gray-200 rounded-lg shadow-sm">
            <div ref={headerRef} />
            <div
              className={`bg-gray-50 border-b border-gray-200 top-20 z-10 ${
                isSticky ? "sticky shadow-md" : ""
              }`}
            >
              <div className="grid grid-cols-4 gap-x-4 items-end p-6">
                <div className="col-span-1"></div>
                {plansData.map((plan, index) => (
                  <div key={index} className="text-center px-2">
                    <h3 className="font-bold text-lg text-brand-dark">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-bold text-black">{plan.price}</span>
                      {plan.period && (
                        <span className="text-xs block">{plan.period}</span>
                      )}
                    </p>
                    <button className="mt-3 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm shadow-sm">
                      {plan.cta}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="divide-y divide-gray-200 bg-white">
              {featureData.map((categoryData) => (
                <div key={categoryData.category}>
                  <div className="bg-gray-50 px-6 py-3 border-y border-gray-200">
                    <h4 className="font-bold text-gray-700 text-sm uppercase tracking-wider">
                      {categoryData.category}
                    </h4>
                  </div>
                  {categoryData.features.map((feature, idx) => (
                    <div
                      key={feature.name}
                      className={`grid grid-cols-4 gap-x-4 items-center py-4 px-6 hover:bg-gray-50 transition-colors ${
                        idx !== categoryData.features.length - 1
                          ? "border-b border-gray-100"
                          : ""
                      }`}
                    >
                      <div className="col-span-1 text-sm text-gray-800 font-medium pr-4">
                        <span>{feature.name}</span>
                      </div>
                      {feature.values.map((value, index) => (
                        <div
                          key={index}
                          className="col-span-1 flex justify-center"
                        >
                          {renderFeatureValue(value)}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
