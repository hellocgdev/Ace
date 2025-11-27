import { useState } from "react";

const EnterpriseContactForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyLink: "",
    numberOfEmployees: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const baseUrl = import.meta.env.VITE_API_BASE;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${baseUrl}/api/enterprise`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to submit request");
      }

      // Show success message
      setShowSuccess(true);

      // Close the form after 2 seconds
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Enterprise contact form error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (showSuccess) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center animate-fade-in">
          <div className="mb-4">
            <svg
              className="mx-auto h-16 w-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-brand-dark mb-2">
            Thank You!
          </h3>
          <p className="text-gray-600">
            Our team will contact you soon to discuss your Enterprise needs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-fade-in">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-brand-dark">
              Enterprise Plan
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <p className="text-gray-600 mt-2 text-sm">
            Tell us about your company and we'll get back to you shortly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none transition-all"
              placeholder="Enter your company name"
            />
          </div>

          <div>
            <label
              htmlFor="companyLink"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Company Website <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="companyLink"
              name="companyLink"
              value={formData.companyLink}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none transition-all"
              placeholder="https://www.example.com"
            />
          </div>

          <div>
            <label
              htmlFor="numberOfEmployees"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Number of Employees <span className="text-red-500">*</span>
            </label>
            <select
              id="numberOfEmployees"
              name="numberOfEmployees"
              value={formData.numberOfEmployees}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none transition-all bg-white"
            >
              <option value="">Select range</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-100">51-100</option>
              <option value="101-500">101-500</option>
              <option value="501-1000">501-1000</option>
              <option value="1000+">1000+</option>
            </select>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Schedule Call"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterpriseContactForm;
