import React from "react";

export default function Hero({ onOpenConcierge }) {
  return (
    <section id="hero" className="hero">
      {/* Sunburst Radial Pattern */}
      <div className="hero-sunburst" aria-hidden="true"></div>

      {/* Geometric Double Frame */}
      <div className="hero-frame" aria-hidden="true"></div>

      {/* Corner Ornaments */}
      <div className="hero-corner hero-corner--tl" aria-hidden="true"></div>
      <div className="hero-corner hero-corner--tr" aria-hidden="true"></div>
      <div className="hero-corner hero-corner--bl" aria-hidden="true"></div>
      <div className="hero-corner hero-corner--br" aria-hidden="true"></div>

      {/* Hero Content */}
      <div className="hero-content">
        <p className="hero-est">Est. MMIX · Geneva · London · New York</p>

        <h1 className="hero-title">AUREUM</h1>

        {/* Art Deco Ornamental Divider */}
        <svg className="hero-ornament" viewBox="0 0 320 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <line x1="0" y1="12" x2="95" y2="12" stroke="#D4AF37" strokeWidth="0.5" opacity="0.6"/>
          <polyline points="100,6 106,12 100,18" stroke="#D4AF37" strokeWidth="0.7" fill="none" opacity="0.5"/>
          <line x1="110" y1="12" x2="140" y2="12" stroke="#D4AF37" strokeWidth="0.5" opacity="0.6"/>
          <rect x="153" y="5" width="14" height="14" transform="rotate(45 160 12)" stroke="#D4AF37" strokeWidth="1" fill="none"/>
          <line x1="180" y1="12" x2="210" y2="12" stroke="#D4AF37" strokeWidth="0.5" opacity="0.6"/>
          <polyline points="220,6 214,12 220,18" stroke="#D4AF37" strokeWidth="0.7" fill="none" opacity="0.5"/>
          <line x1="225" y1="12" x2="320" y2="12" stroke="#D4AF37" strokeWidth="0.5" opacity="0.6"/>
        </svg>

        <p className="hero-tagline">Private Art Advisory<br />&amp; Collection Curation</p>
        <p className="hero-motto">Where vision meets legacy</p>

        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button
            onClick={onOpenConcierge}
            className="btn-gold"
            style={{ padding: "0.85rem 2.2rem", fontSize: "0.85rem", letterSpacing: "0.15em" }}
          >
            Request Private Consultation
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a href="#philosophy" className="scroll-indicator" id="scroll-indicator" aria-label="Scroll to explore">
        <span>Explore</span>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="6 9 12 15 18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </section>
  );
}

