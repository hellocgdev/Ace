import React, { useState } from "react";
import {
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  YouTubeIcon,
} from "./icons/Icons";

const Footer: React.FC = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    query: "",
  });
  const [feedbackData, setFeedbackData] = useState({
    name: "",
    email: "",
    category: "",
    bugDescription: "",
    articleQuality: 0,
    articleRelevance: 0,
    articleClarity: 0,
    uxEaseOfUse: 0,
    uxDesign: 0,
    uxPerformance: 0,
  });

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/the-leaders-first-63a0b738b/",
      icon: LinkedInIcon,
      label: "LinkedIn",
    },
    {
      href: "https://www.instagram.com/theleadersfirstt/",
      icon: InstagramIcon,
      label: "Instagram",
    },
    {
      href: "https://www.facebook.com/theleadersfirst/photos",
      icon: FacebookIcon,
      label: "Facebook",
    },
    {
      href: "https://x.com/TheLeadersFirst",
      icon: TwitterIcon,
      label: "Twitter/X",
    },
    {
      href: "https://youtube.com/@theleadersfirstt?si=zUJHp9VsWUqZyKGY",
      icon: YouTubeIcon,
      label: "YouTube",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setFormData({ name: "", contactNumber: "", email: "", query: "" });
    setTimeout(() => {
      setShowSuccess(false);
      setShowContactForm(false);
    }, 3000);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setFeedbackData({
      name: "",
      email: "",
      category: "",
      bugDescription: "",
      articleQuality: 0,
      articleRelevance: 0,
      articleClarity: 0,
      uxEaseOfUse: 0,
      uxDesign: 0,
      uxPerformance: 0,
    });
    setTimeout(() => {
      setShowSuccess(false);
      setShowFeedback(false);
    }, 3000);
  };

  const handleFeedbackChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFeedbackData({ ...feedbackData, [e.target.name]: e.target.value });
  };

  const StarRating = ({
    name,
    value,
    onChange,
  }: {
    name: string;
    value: number;
    onChange: (name: string, value: number) => void;
  }) => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(name, star)}
            className={`text-3xl transition-colors ${
              star <= value ? "text-yellow-400" : "text-gray-300"
            } hover:text-yellow-400`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <footer className="bg-white py-12">
        <div className="container mx-auto px-6 text-center text-brand-dark">
          <a
            href="mailto:hello@theleadersfirst.com"
            className="font-semibold text-lg hover:underline"
          >
            hello@theleadersfirst.com
          </a>

          <div className="flex justify-center space-x-6 mt-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${link.label}`}
                className="text-gray-500 hover:text-brand-dark transition-colors"
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>

          {/* Contact and Terms Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setShowContactForm(true)}
              className="bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
            >
              Contact Us
            </button>
            <button
              onClick={() => setShowFeedback(true)}
              className="bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
            >
              Feedback
            </button>
            <button
              onClick={() => setShowTerms(true)}
              className="bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
            >
              Terms & Conditions
            </button>
          </div>

          <p className="text-gray-600 text-sm mt-8">
            Copyrights Reserved, The Leaders First @ 2023 - Present
          </p>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed pt-30 inset-0 bg-white z-50 overflow-y-auto">
          <div className="container mx-auto px-6 py-12 max-w-2xl">
            <button
              onClick={() => setShowContactForm(false)}
              className="fixed top-30  right-16 text-gray-700 hover:text-gray-900 text-3xl font-bold bg-gray-100 hover:bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-60 border-2 border-gray-300"
            >
              ×
            </button>

            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Contact Us
            </h2>

            {showSuccess ? (
              <div className="text-center py-8">
                <div className="text-green-600 text-5xl mb-4">✓</div>
                <p className="text-lg text-gray-800 font-semibold">
                  Our team will be in contact with you soon
                </p>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Query *
                    </label>
                    <textarea
                      name="query"
                      value={formData.query}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Please describe your query..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    Send
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 text-center mb-3">
                    Or contact us directly:
                  </p>
                  <div className="space-y-2 text-center">
                    <a
                      href="tel:+919820045154"
                      className="block text-blue-600 font-semibold hover:underline"
                    >
                      +91 9820045154
                    </a>
                    <a
                      href="mailto:hello@theleadersfirst.com"
                      className="block text-blue-600 font-semibold hover:underline"
                    >
                      hello@theleadersfirst.com
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Feedback Form Modal */}
      {showFeedback && (
        <div className="fixed pt-30 inset-0 bg-white z-50 overflow-y-auto">
          <div className="container mx-auto px-6 py-12 max-w-2xl">
            <button
              onClick={() => setShowFeedback(false)}
              className="fixed top-30 right-16 text-gray-700 hover:text-gray-900 text-3xl font-bold bg-gray-100 hover:bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-60 border-2 border-gray-300"
            >
              ×
            </button>

            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Feedback
            </h2>

            {showSuccess ? (
              <div className="text-center py-8">
                <div className="text-green-600 text-5xl mb-4">✓</div>
                <p className="text-lg text-gray-800 font-semibold">
                  Thank you for your feedback!
                </p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={feedbackData.name}
                    onChange={handleFeedbackChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={feedbackData.email}
                    onChange={handleFeedbackChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Feedback Category *
                  </label>
                  <select
                    name="category"
                    value={feedbackData.category}
                    onChange={handleFeedbackChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    <option value="articles">Feedback for Articles</option>
                    <option value="bug">Report a Bug</option>
                    <option value="ux">User Experience Feedback</option>
                  </select>
                </div>

                {/* Bug Report */}
                {feedbackData.category === "bug" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bug Description *
                    </label>
                    <textarea
                      name="bugDescription"
                      value={feedbackData.bugDescription}
                      onChange={handleFeedbackChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      placeholder="Please describe the bug in detail..."
                    />
                  </div>
                )}

                {/* Article Feedback */}
                {feedbackData.category === "articles" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Article Quality *
                      </label>
                      <StarRating
                        name="articleQuality"
                        value={feedbackData.articleQuality}
                        onChange={(name, value) =>
                          setFeedbackData({ ...feedbackData, [name]: value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Article Relevance *
                      </label>
                      <StarRating
                        name="articleRelevance"
                        value={feedbackData.articleRelevance}
                        onChange={(name, value) =>
                          setFeedbackData({ ...feedbackData, [name]: value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Article Clarity *
                      </label>
                      <StarRating
                        name="articleClarity"
                        value={feedbackData.articleClarity}
                        onChange={(name, value) =>
                          setFeedbackData({ ...feedbackData, [name]: value })
                        }
                      />
                    </div>
                  </div>
                )}

                {/* UX Feedback */}
                {feedbackData.category === "ux" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Ease of Use *
                      </label>
                      <StarRating
                        name="uxEaseOfUse"
                        value={feedbackData.uxEaseOfUse}
                        onChange={(name, value) =>
                          setFeedbackData({ ...feedbackData, [name]: value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Design & Layout *
                      </label>
                      <StarRating
                        name="uxDesign"
                        value={feedbackData.uxDesign}
                        onChange={(name, value) =>
                          setFeedbackData({ ...feedbackData, [name]: value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Performance & Speed *
                      </label>
                      <StarRating
                        name="uxPerformance"
                        value={feedbackData.uxPerformance}
                        onChange={(name, value) =>
                          setFeedbackData({ ...feedbackData, [name]: value })
                        }
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg"
                >
                  Submit Feedback
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Terms & Conditions Modal */}
      {showTerms && (
        <div className="fixed pt-30 inset-0 bg-white z-50 overflow-y-auto">
          <div className="container mx-auto px-6 py-12 max-w-4xl">
            <button
              onClick={() => setShowTerms(false)}
              className="fixed top-40 right-98 text-gray-700 hover:text-gray-900 text-3xl font-bold bg-gray-100 hover:bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-60 border-2 border-gray-300"
            >
              ×
            </button>

            <div className="prose prose-sm max-w-none">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Terms & Conditions
              </h1>

              <p className="text-gray-600 mb-6">
                <strong>Last Updated:</strong> December 2, 2025
              </p>

              <p className="mb-6">
                These Terms & Conditions ("Terms") govern your participation,
                submissions, and activities ("Content") on the The Leaders First
                Contributor Program ("Platform"). By using the Platform, you
                agree to comply fully with these Terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                1. Eligibility & Account Responsibilities
              </h2>
              <p className="mb-3">
                1.1 You must provide accurate and complete information when
                creating your account.
              </p>
              <p className="mb-3">
                1.2 You are solely responsible for all activity under your
                account.
              </p>
              <p className="mb-3">
                1.3 The Platform reserves the right to verify identity and
                submitted information at any time.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                2. Content Submission & Approval
              </h2>
              <p className="mb-3">
                2.1 All submitted articles, media, or materials ("Content") are
                subject to review and approval at the sole discretion of the
                Platform.
              </p>
              <p className="mb-3">
                2.2 Submission does not guarantee publication.
              </p>
              <p className="mb-3">
                2.3 Content may be edited for clarity, accuracy, formatting,
                SEO, legal compliance, or platform suitability.
              </p>
              <p className="mb-3">
                2.4 If Content does not meet editorial or posting guidelines, it
                will be:
              </p>
              <ul className="list-disc ml-6 mb-3">
                <li>Marked inactive, and</li>
                <li>Published only upon resubmission and approval.</li>
              </ul>
              <p className="mb-3">
                2.5 The Platform may reject or remove published Content without
                prior notice if it violates guidelines or policies.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                3. Contributor Guidelines & Compliance
              </h2>
              <p className="mb-3">3.1 Contributors must adhere to:</p>
              <ul className="list-disc ml-6 mb-3">
                <li>Platform editorial standards</li>
                <li>Ethical writing norms</li>
                <li>Applicable laws and regulations</li>
                <li>
                  Regulatory and content creation guidelines issued by the
                  Platform
                </li>
              </ul>
              <p className="mb-3">3.2 You agree not to submit:</p>
              <ul className="list-disc ml-6 mb-3">
                <li>Plagiarized or AI-generated content without disclosure</li>
                <li>Misleading, defamatory, hateful, or harmful content</li>
                <li>
                  Advertorials or self-promotional content (unless permitted)
                </li>
              </ul>
              <p className="mb-3">
                3.3 Inclusion of personal contact details, phone numbers, links
                to personal services, or direct solicitations is strictly
                prohibited.
              </p>
              <p className="mb-3">
                3.4 Violation may lead to immediate account suspension, removal
                of content, and possible penalties.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                4. Payments, Fees, and Refund Policy
              </h2>
              <p className="mb-3">
                4.1 Payments made for contributor access, editorial services, or
                publication fees are 100% non-refundable, regardless of
                submission outcome or termination.
              </p>
              <p className="mb-3">4.2 The Platform does not guarantee:</p>
              <ul className="list-disc ml-6 mb-3">
                <li>Publication timelines</li>
                <li>Traffic, views, or reach</li>
                <li>Brand or business outcomes</li>
              </ul>
              <p className="mb-3">
                4.3 Failure to comply with guidelines does not qualify for
                refunds or credits.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                5. Intellectual Property & Usage Rights
              </h2>
              <p className="mb-3">
                5.1 By submitting Content, you grant the Platform a
                non-exclusive, worldwide, royalty-free license to:
              </p>
              <ul className="list-disc ml-6 mb-3">
                <li>Publish</li>
                <li>Edit</li>
                <li>Distribute</li>
                <li>Promote</li>
                <li>Archive</li>
              </ul>
              <p className="mb-3">your Content.</p>
              <p className="mb-3">
                5.2 You retain ownership of your work unless otherwise
                specified.
              </p>
              <p className="mb-3">
                5.3 The Platform may continue to display Content even after you
                deactivate your account unless removal is requested and
                approved.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                6. Suspension, Account Termination & Penalties
              </h2>
              <p className="mb-3">
                6.1 The Platform may suspend or terminate your account with or
                without notice for:
              </p>
              <ul className="list-disc ml-6 mb-3">
                <li>Violating guidelines</li>
                <li>Misconduct or fraud</li>
                <li>Submitting disallowed content</li>
                <li>Sharing personal contact details</li>
              </ul>
              <p className="mb-3">6.2 The Platform reserves the right to:</p>
              <ul className="list-disc ml-6 mb-3">
                <li>Remove current and past articles</li>
                <li>Forfeit any pending submissions</li>
                <li>Apply penalties or restrict future access</li>
              </ul>
              <p className="mb-3">
                6.3 Any previously published content may be removed with or
                without recovery of fees already paid.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                7. Liability & Limitation
              </h2>
              <p className="mb-3">7.1 The Platform is not responsible for:</p>
              <ul className="list-disc ml-6 mb-3">
                <li>Loss of data</li>
                <li>Delays in publication</li>
                <li>Business, personal, or reputational impact</li>
                <li>Third-party misuse of published content</li>
              </ul>
              <p className="mb-3">7.2 Participation is at your own risk.</p>
              <p className="mb-3">
                7.3 The Platform does not guarantee editorial outcomes or
                commercial benefits.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                8. Amendments & Changes
              </h2>
              <p className="mb-3">
                8.1 These Terms may be updated at any time without prior notice.
              </p>
              <p className="mb-3">
                8.2 Continued use of the Platform after updates constitutes
                acceptance of revised Terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                9. Governing Law
              </h2>
              <p className="mb-3">
                This Agreement is governed by the laws of India, and any legal
                disputes shall be handled exclusively by courts located in
                Mumbai, Maharashtra.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                10. Contact Us
              </h2>
              <p className="mb-3">
                For questions, clarifications, or dispute resolution, contact:
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">The Leaders First Support</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:hello@theleadersfirst.com"
                    className="text-blue-600 hover:underline"
                  >
                    hello@theleadersfirst.com
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a
                    href="tel:+919820045154"
                    className="text-blue-600 hover:underline"
                  >
                    +91 9820045154
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
