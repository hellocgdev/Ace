import React from "react";

const HOROSCOPE_URL = "https://aura1-hveu.onrender.com"; // home of Flask app

function Horoscope() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* your existing navbar is outside this component */}
      <div style={{ flex: 1 }}>
        <iframe
          src={HOROSCOPE_URL}
          title="Horoscope"
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    </div>
  );
}

export default Horoscope;