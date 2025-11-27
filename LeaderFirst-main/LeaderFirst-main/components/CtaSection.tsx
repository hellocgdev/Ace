import React from "react";
import { Link } from "react-router-dom";

const CtaSection: React.FC<{ currentUser?: any }> = ({ currentUser }) => (
  <section className="bg-brand-dark py-20">
    <div className="container mx-auto px-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl mx-auto p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold font-serif text-brand-text mb-6">
          Stay in loop with everyone you need to know
        </h2>
        {/* Only show Sign Up button if not logged in */}
        {!currentUser && (
          <Link
            to="/apply"
            className="bg-brand-dark text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-semibold text-md"
          >
            Sign Up
          </Link>
        )}
      </div>
    </div>
  </section>
);

export default CtaSection;
