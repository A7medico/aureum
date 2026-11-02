import React from "react";

export default function Philosophy() {
  return (
    <section id="philosophy" className="philosophy">
      <div className="container">
        <div className="philosophy-inner" data-reveal>
          {/* Corner Decorations */}
          <div className="deco-corner deco-corner--tl" aria-hidden="true"></div>
          <div className="deco-corner deco-corner--tr" aria-hidden="true"></div>
          <div className="deco-corner deco-corner--bl" aria-hidden="true"></div>
          <div className="deco-corner deco-corner--br" aria-hidden="true"></div>

          <p className="philosophy-lead">We don't simply find art.</p>
          <h2 className="philosophy-title">We Architect Legacies</h2>
          <div className="gold-rule gold-rule--wide"></div>
          <p className="philosophy-text">
            For over fifteen years, Aureum has guided the world's most discerning
            collectors, family offices, and foundations through the complex landscape of
            modern and contemporary fine art. Our methodology unites scholarly connoisseurship
            with forensic market diligence — ensuring that every acquisition is not merely an aesthetic
            triumph, but an enduring generational asset.
          </p>

          <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ display: "block", color: "var(--gold)", fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>Discretion</span>
              <span style={{ fontSize: "0.8rem", color: "var(--platinum)" }}>Absolute confidentiality</span>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ display: "block", color: "var(--gold)", fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>Connoisseurship</span>
              <span style={{ fontSize: "0.8rem", color: "var(--platinum)" }}>Scholarly rigor &amp; provenance</span>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ display: "block", color: "var(--gold)", fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>Stewardship</span>
              <span style={{ fontSize: "0.8rem", color: "var(--platinum)" }}>Generational preservation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

