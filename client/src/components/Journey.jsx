import React from "react";

export default function Journey({ onOpenConcierge }) {
  const steps = [
    {
      num: "I",
      title: "Discovery & Intake",
      desc: "A strictly confidential consultation exploring your aesthetic affinities, existing collection holdings, and long-term patron vision."
    },
    {
      num: "II",
      title: "Strategic Formulation",
      desc: "Formulation of a bespoke acquisition roadmap, encompassing market intelligence, target masterworks, budget allocations, and tax-efficient structures."
    },
    {
      num: "III",
      title: "Discreet Acquisition",
      desc: "Sourcing through private trusts, estates, and primary channels with forensic physical inspection, condition logging, and unyielding price negotiation."
    },
    {
      num: "IV",
      title: "Stewardship & Legacy",
      desc: "White-glove climate transport, architectural installation, conservation monitoring, museum loan representation, and multi-generational succession planning."
    }
  ];

  return (
    <section id="journey" className="journey">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" data-reveal>
          <span className="label-upper">Your Path</span>
          <h2 className="heading-section">The Aureum Journey</h2>
          <svg className="section-divider" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line x1="0" y1="10" x2="85" y2="10" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
            <rect x="93" y="3" width="14" height="14" transform="rotate(45 100 10)" stroke="#D4AF37" strokeWidth="0.75" fill="none"/>
            <line x1="115" y1="10" x2="200" y2="10" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
          </svg>
        </div>

        {/* Journey Steps */}
        <div className="journey-steps">
          {steps.map((step, idx) => (
            <div key={idx} className="journey-step" data-reveal data-delay={idx + 1}>
              <div className="step-number">{step.num}</div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
          <button onClick={onOpenConcierge} className="btn-gold" style={{ padding: "0.85rem 2.5rem" }}>
            Begin Step I: Discovery Intake
          </button>
        </div>
      </div>
    </section>
  );
}

