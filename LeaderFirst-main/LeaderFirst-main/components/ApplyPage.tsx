import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ROLE_OPTIONS = [
  { value: "individual", label: "Individual" },
  { value: "company", label: "Company" },
  { value: "agency", label: "Agency" },
  { value: "user", label: "Reader" },
  // Admin intentionally not exposed for security
];

const ApplyPage = () => {
  const [selectedRole, setSelectedRole] = useState("individual");

  // shared fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // individual
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");

  // company / agency
  const [providerName, setProviderName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyLink, setCompanyLink] = useState("");
  const [orgLocation, setOrgLocation] = useState("");
  const [revenue, setRevenue] = useState("");
  const [employees, setEmployees] = useState("");

  // OTP
  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_BASE;

  const validateFields = () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      return "Email and password are required.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }

    if (selectedRole === "individual") {
      if (
        !firstName.trim() ||
        !lastName.trim() ||
        !location.trim() ||
        !phone.trim()
      ) {
        return "Please fill first name, last name, location and phone.";
      }
    }

    if (selectedRole === "company" || selectedRole === "agency") {
      if (
        !providerName.trim() ||
        !companyName.trim() ||
        !companyLink.trim() ||
        !orgLocation.trim()
      ) {
        return "Please fill provider name, company name, company link and location.";
      }
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setShowOtpModal(true);
      } else {
        setError(data.message || "Failed to send OTP. Try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    setOtpLoading(true);
    try {
      // 1) Verify OTP only
      const verifyRes = await fetch(`${baseUrl}/api/auth/verify-otp-register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        setError(verifyData.message || "OTP verification failed. Try again.");
        setOtpLoading(false);
        return;
      }

      // 2) Complete signup with role + profile
      const payload = {
        role: selectedRole,
        email,
        password,
      };

      if (selectedRole === "individual") {
        Object.assign(payload, {
          firstName,
          lastName,
          location,
          phone,
          twitter,
          linkedin,
        });
      } else if (selectedRole === "company" || selectedRole === "agency") {
        Object.assign(payload, {
          providerName,
          companyName,
          companyLink,
          location: orgLocation,
          revenue,
          employees,
        });
      }

      const signupRes = await fetch(`${baseUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const signupData = await signupRes.json();

      if (signupRes.ok && signupData.token && signupData.user) {
        localStorage.setItem("token", signupData.token);
        localStorage.setItem("user", JSON.stringify(signupData.user));
        setShowOtpModal(false);
        navigate("/");
      } else {
        setError(signupData.message || "Signup failed. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setOtpLoading(false);
  };

  const prettyRole = ROLE_OPTIONS.find((r) => r.value === selectedRole)?.label;

  return (
    <>
      <div className="animate-fade-in py-16 md:py-20 bg-brand-light-gray flex items-center justify-center min-h-full">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <div className="text-center mb-6">
              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-brand-dark">
                Create an Account
              </h1>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                Join as an Individual, Company or Agency.
              </p>
            </div>

            {/* Role Toggle */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {ROLE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedRole(option.value)}
                  className={`px-3 py-1.5 rounded-full text-xs md:text-sm border transition-colors ${
                    selectedRole === option.value
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role-specific fields */}
              {selectedRole === "individual" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Twitter (optional)
                      </label>
                      <input
                        type="text"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm text-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal"
                        placeholder="@username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        LinkedIn (optional)
                      </label>
                      <input
                        type="text"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm text-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal"
                        placeholder="Profile URL or ID"
                      />
                    </div>
                  </div>
                </>
              )}

              {(selectedRole === "company" || selectedRole === "agency") && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Provider Name
                      </label>
                      <input
                        type="text"
                        value={providerName}
                        onChange={(e) => setProviderName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Company Link
                      </label>
                      <input
                        type="text"
                        value={companyLink}
                        onChange={(e) => setCompanyLink(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <input
                        type="text"
                        value={orgLocation}
                        onChange={(e) => setOrgLocation(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Revenue (optional)
                      </label>
                      <input
                        type="text"
                        value={revenue}
                        onChange={(e) => setRevenue(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm text-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal"
                        placeholder="e.g. 1-5 Cr"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Employees (optional)
                      </label>
                      <input
                        type="text"
                        value={employees}
                        onChange={(e) => setEmployees(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm text-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal"
                        placeholder="e.g. 10-50"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Email + password */}
              <div className="border-t border-gray-100 pt-4 mt-2 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal bg-white text-black"
                    placeholder="you@example.com"
                    disabled={loading || showOtpModal}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal bg-white text-black"
                      placeholder="••••••••"
                      disabled={loading || showOtpModal}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal bg-white text-black"
                      placeholder="••••••••"
                      disabled={loading || showOtpModal}
                    />
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark transition-colors"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : `Sign up as ${prettyRole}`}
              </button>
            </form>

            <p className="mt-6 text-center text-xs md:text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-medium text-brand-teal hover:text-brand-teal-dark"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4 text-center text-brand-dark">
              Enter OTP
            </h2>
            <p className="text-xs text-gray-600 mb-3 text-center">
              We sent a 6‑digit code to{" "}
              <span className="font-medium">{email}</span>.
            </p>
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-teal focus:border-brand-teal text-black text-center tracking-[0.3em]"
                maxLength={6}
                aria-label="OTP input"
                disabled={otpLoading}
              />
              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}
              <button
                type="submit"
                disabled={otpLoading}
                className="w-full py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition-colors"
              >
                {otpLoading ? "Verifying..." : "Verify OTP & Create Account"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplyPage;
