import React, { useEffect, useState } from "react";
import Insights from "./Insights";
import CtaSection from "./CtaSection";
import OfferPopup from "./OfferPopUp";
import TrendingStrip from "./TrendingStrip";
import EditorsPicks from "./EditorsPicks";
import TodaysMix from "./TodaysMix";
import Featured from "./Featured";
import NewsLetterBand from "./NewsLetterBand";

const HomePage = ({ posts, currentUser }) => {
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
    // Add CTA flow (navigate, open modal, etc.)
    // e.g., window.location.href = "/subscribe";
  };

  // Use top 3 by viewCount as Editor’s Picks for now
  const editorsPickArticles = posts
    .slice() // copy
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, 3);

  // Trending can be next 6, or a different sort if you want
  const trendingArticles = posts
    .slice()
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(3, 9);

  return (
    <main>
      <Insights posts={posts} />
      {/* <EditorsPicks articles={editorsPickArticles} /> */}
      <TodaysMix articles={trendingArticles} />
      {/* <Featured articles={trendingArticles} /> */}
      {/* <TrendingStrip articles={trendingArticles} /> */}
      {/* <CtaSection currentUser={currentUser} /> */}
      <NewsLetterBand onSubmit={undefined} />
      {showOffer && (
        <OfferPopup onClose={handleCloseOffer} onCtaClick={handleCtaOffer} />
      )}
    </main>
  );
};
export default HomePage;
