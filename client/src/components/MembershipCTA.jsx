import React from "react";

export default function MembershipCTA({ onOpenConcierge }) {
  return (
    <section id="membership" className="membership">
      <div className="container">
        <div className="membership-frame" data-reveal>
          {/* Fan Motif Background */}
          <svg className="membership-fan" viewBox="0 0 500 250" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line x1="250" y1="250" x2="250" y2="0" stroke="#D4AF37" strokeWidth="0.5"/>
            <line x1="250" y1="250" x2="100" y2="20" stroke="#D4AF37" strokeWidth="0.5" opacity="0.6"/>
            <line x1="250" y1="250" x2="140" y2="8" stroke="#D4AF37" strokeWidth="0.5" opacity="0.7"/>
            <line x1="250" y1="250" x2="180" y2="2" stroke="#D4AF37" strokeWidth="0.5" opacity="0.8"/>
            <line x1="250" y1="250" x2="215" y2="0" stroke="#D4AF37" strokeWidth="0.5" opacity="0.9"/>
            <line x1="250" y1="250" x2="285" y2="0" stroke="#D4AF37" strokeWidth="0.5" opacity="0.9"/>
            <line x1="250" y1="250" x2="320" y2="2" stroke="#D4AF37" strokeWidth="0.5" opacity="0.8"/>
            <line x1="250" y1="250" x2="360" y2="8" stroke="#D4AF37" strokeWidth="0.5" opacity="0.7"/>
            <line x1="250" y1="250" x2="400" y2="20" stroke="#D4AF37" strokeWidth="0.5" opacity="0.6"/>
            <line x1="250" y1="250" x2="50" y2="60" stroke="#D4AF37" strokeWidth="0.3" opacity="0.4"/>
            <line x1="250" y1="250" x2="450" y2="60" stroke="#D4AF37" strokeWidth="0.3" opacity="0.4"/>
            <path d="M 70 250 A 180 180 0 0 1 430 250" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"/>
            <path d="M 110 250 A 140 140 0 0 1 390 250" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4"/>
            <path d="M 150 250 A 100 100 0 0 1 350 250" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
            <path d="M 190 250 A 60 60 0 0 1 310 250" stroke="#D4AF37" strokeWidth="0.5" opacity="0.6"/>
          </svg>

          {/* Corner Decorations */}
          <div className="deco-corner deco-corner--tl" aria-hidden="true"></div>
          <div className="deco-corner deco-corner--tr" aria-hidden="true"></div>
          <div className="deco-corner deco-corner--bl" aria-hidden="true"></div>
          <div className="deco-corner deco-corner--br" aria-hidden="true"></div>

          <p className="membership-label">By Invitation &amp; Application</p>
          <h2 className="membership-title">Begin Your Legacy</h2>
          <div className="gold-rule gold-rule--wide"></div>
          <p className="membership-text">
            Aureum membership is extended to a select number of collectors each year.
            We invite you to apply and begin the conversation that could define
            your collection for generations.
          </p>
          <button onClick={onOpenConcierge} className="btn-gold" id="apply-btn">
            Request an Introduction
          </button>
        </div>
      </div>
    </section>
  );
}

