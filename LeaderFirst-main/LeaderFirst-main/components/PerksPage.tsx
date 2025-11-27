import React from "react";
import { Link } from "react-router-dom";

const BenefitItem = ({ title, description }) => (
  <div>
    <h3 className="font-bold text-xl text-brand-dark mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-brand-dark mr-3 shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M5 13l4 4L19 7"
    ></path>
  </svg>
);

const PerksPage = () => {
  const benefitsCol1 = [
    {
      title: "Monthly Core Groups",
      description:
        "A group of 8 founders with an executive facilitator, who leads discussion where advice and critical feedback is shared to help accelerate your business growth.",
    },
    {
      title: "Speaker Series",
      description:
        "We know how important it is to have access to the best and brightest. So, we host unique workshops and bring in hard to reach experts across a variety of topics.",
    },
  ];

  const benefitsCol2 = [
    {
      title: "Digital Community",
      description:
        "Access to a digital and highly engaged community of founders who provide helpful advice to make those tough decisions, along with a dedicated digital concierge.",
    },
    {
      title: "Exclusive Perks",
      description:
        "We've secured exclusive discounts with the most popular software companies, tools, and apps. We also have a robust preferred vendor database.",
    },
  ];

  const benefitsCol3 = [
    {
      title: "In-Person Community",
      description:
        "Our in-person event strategy is focussed around three pillars: monthly member dinners, annual retreats, and local adventures.",
    },
    {
      title: "Social Events",
      description:
        "You get to socialise over exclusive ice-breaker activities and events giving you the much needed break from work.",
    },
  ];

  return (
    <div className="animate-fade-in pl-10 pr-10">
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl font-semibold text-brand-dark">
              Member Benefits
            </h1>
            <p className="text-lg text-gray-500 mt-2">Insider Sneak-peaks</p>
          </div>
          <div className="grid text-md md:grid-cols-3 gap-x-32 gap-y-22">
            <BenefitItem
              title={benefitsCol1[0].title}
              description={benefitsCol1[0].description}
            />
            <BenefitItem
              title={benefitsCol2[0].title}
              description={benefitsCol2[0].description}
            />
            <BenefitItem
              title={benefitsCol3[0].title}
              description={benefitsCol3[0].description}
            />
            <BenefitItem
              title={benefitsCol1[1].title}
              description={benefitsCol1[1].description}
            />
            <BenefitItem
              title={benefitsCol2[1].title}
              description={benefitsCol2[1].description}
            />
            <BenefitItem
              title={benefitsCol3[1].title}
              description={benefitsCol3[1].description}
            />
          </div>
        </div>
      </section>

      <section className="pb-24 bg-white">
        <div className="container mx-auto px-6">
          {/* Top Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-brand-dark leading-tight">
                Who's right for The Leaders First...and who isn't?
              </h2>
              <ul className="mt-6 space-y-3 text-lg text-gray-700">
                <li className="flex items-center">
                  <CheckIcon />
                  <span>Must be a Founder or CEO</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon />
                  <span>
                    At least 100 Cr in revenue / funding / previous exit
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckIcon />
                  <span>Located in Mumbai, Bangalore or Tier 1 cities</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  to="/apply"
                  className="bg-brand-dark text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-semibold text-md"
                >
                  Sign Up
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyYGBMiUpCAgk_AxbZ3-005Ddgyvmsm1I2Og&s"
                alt="Diverse group of professionals"
                className="rounded-2xl shadow-lg w-full max-w-lg object-cover"
              />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-24 pt-16 border-t border-gray-200">
            <div className="mb-12">
              <h3 className="font-serif text-4xl font-semibold text-brand-dark text-center">
                Eligibility Criteria
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 max-w-5xl mx-auto">
              <div>
                <h4 className="font-bold text-lg text-brand-dark mb-2">
                  Revenue
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  The average Leaders First member has 500 Cr in annual
                  revenue but we have a minimum requirement of at least 100
                  Cr in revenue or funding or previous exit.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-brand-dark mb-2">
                  Industry
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Most members run digital startups and you must be the
                  Founder or CEO. Your 8-person Core group will have similar
                  sized businesses in similar industries.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-brand-dark mb-2">
                  Acceptance
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Each Founder or CEO that applies is interviewed and
                  highly-vetted, our acceptance rate being just 8%.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg text-brand-dark mb-2">
                  Community
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  To keep The Leaders First community intimate, we are
                  limiting the community to only 50 new Core groups at this
                  moment. Apply early.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PerksPage;
