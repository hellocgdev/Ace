import React, { useState } from "react";

const NewsLetterBand = () => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | success | error
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || state === "loading") return;

    try {
      setState("loading");
      setMsg("");

      const baseUrl = import.meta.env.VITE_API_BASE;
      const res = await fetch(`${baseUrl}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage-band" }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to subscribe");
      }

      setState("success");
      setMsg(
        data.message === "Already subscribed"
          ? "You’re already subscribed. Thank you!"
          : "You’re subscribed! Check your inbox soon."
      );
      setEmail("");
    } catch (err) {
      setState("error");
      setMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-14 md:py-16 bg-[#FBF9F6]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="rounded-3xl border border-gray-200 bg-white px-6 md:px-16 py-10 md:py-14 text-center shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-md">
          <h2 className="text-3xl md:text-[40px] font-semibold text-gray-900 tracking-tight mb-3">
            Subscribe to the Newsletter
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-8">
            Get occasional updates on new articles, events, and resources.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-0 max-w-2xl"
          >
            <div className="flex-1">
              <div className="bg-white border border-gray-300 rounded-full flex items-center px-5 py-3 sm:py-4 shadow-sm">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent text-sm md:text-base text-gray-900 placeholder-gray-400 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={state === "loading"}
              className="sm:-ml-10 sm:mt-0 mt-1 inline-flex items-center justify-center px-8 md:px-10 py-3 sm:py-4 rounded-full bg-black text-sm md:text-base font-medium text-white shadow-md hover:bg-gray-900 disabled:opacity-60 transition-transform duration-200 ease-out hover:-translate-y-0.5"
            >
              {state === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {msg && (
            <p
              className={`mt-4 text-xs md:text-sm ${
                state === "error" ? "text-red-600" : "text-green-700"
              }`}
            >
              {msg}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsLetterBand;
