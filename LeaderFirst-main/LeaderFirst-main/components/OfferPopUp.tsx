import React, { useState, useEffect } from "react";
import { CloseIcon } from "./icons/Icons";

interface OfferPopupProps {
  onClose: () => void;
  onCtaClick: () => void;
}

const CountdownUnit: React.FC<{ value: number; label: string }> = ({
  value,
  label,
}) => (
  <div className="bg-white/20 rounded-lg p-3 text-center w-20">
    <div className="text-3xl font-bold">{String(value).padStart(2, "0")}</div>
    <div className="text-xs uppercase tracking-wider">{label}</div>
  </div>
);

const OfferPopup: React.FC<OfferPopupProps> = ({ onClose, onCtaClick }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 52,
  });
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          seconds = 59;
          minutes--;
        } else if (hours > 0) {
          seconds = 59;
          minutes = 59;
          hours--;
        } else {
          // Time's up
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle the email submission here.
    // For this demo, we'll just proceed with the CTA action.
    onCtaClick();
  };

  return (
    <div
      className="fixed inset-0 pt-20 bg-black bg-opacity-70 z-50 flex justify-center items-center p-2 animate-fade-in"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-linear-to-br from-[#FE6B8B] to-[#FF8E53] text-white rounded-2xl shadow-xl max-w-lg w-full relative transform transition-all opacity-0 animate-scale-in font-sans">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-white/20 hover:bg-white/30 rounded-full p-1.5"
          aria-label="Close offer"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-12 text-center">
          <div className="inline-block bg-white text-red-500 text-sm font-bold px-4 py-1.5 rounded-full mb-6 shadow-md">
            ⚡️ FLASH SALE
          </div>

          <h1 className="font-serif font-semibold text-7xl md:text-8xl text-white drop-shadow-lg">
            90%
            <span className="block text-5xl md:text-6xl -mt-2">OFF</span>
          </h1>

          <h2 className="text-2xl font-bold mt-4 mb-2">
            Biggest Sale of the Year!
          </h2>
          <div className="mb-8">
            <p className="text-sm text-white/90 mb-2">
              Use this coupon code at checkout:
            </p>
            <div
              className="inline-block border-2 border-dashed border-white/50 rounded-lg py-2 px-6 bg-white/10 cursor-pointer transition-colors hover:bg-white/20"
              onClick={() => navigator.clipboard.writeText("CEDO")}
              title="Click to copy"
            >
              <span className="text-3xl font-bold tracking-widest">CEDO</span>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-3 sm:space-x-4 mb-8">
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full grow px-5 py-3 border border-transparent rounded-full shadow-inner placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 text-black text-center sm:text-left"
              aria-label="Enter your email"
            />
            <button
              type="submit"
              className="bg-brand-dark text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors font-semibold text-md shadow-lg"
            >
              Claim Deal
            </button>
          </form>
          <p className="text-xs text-white/70 mt-4">
            *Offer valid for new subscribers only. Terms apply.
          </p>
        </div>
      </div>
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default OfferPopup;
