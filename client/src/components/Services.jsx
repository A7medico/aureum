import React, { useState } from "react";
import { Sparkles, ChevronRight, X } from "lucide-react";

export default function Services({ onOpenConcierge }) {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: "acquisition",
      title: "Acquisition Strategy",
      subtitle: "Off-Market Sourcing & Private Treaty",
      desc: "Discreet sourcing and expert negotiation for significant works across global secondary markets, premier auction houses, and private family trusts.",
      details: [
        "Direct access to off-market estates and confidential blue-chip inventory",
        "Forensic price benchmarking and compound valuation modeling",
        "Discreet negotiation avoiding public auction fever and markups",
        "Physical inspection, condition assessment, and authentic certification"
      ],
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#D4AF37" xmlns="http://www.w3.org/2000/svg">
          <polygon points="32,6 58,24 48,56 16,56 6,24" strokeWidth="1.2"/>
          <line x1="32" y1="6" x2="16" y2="56" strokeWidth="0.5" opacity="0.4"/>
          <line x1="32" y1="6" x2="48" y2="56" strokeWidth="0.5" opacity="0.4"/>
          <line x1="6" y1="24" x2="58" y2="24" strokeWidth="0.5" opacity="0.4"/>
          <circle cx="32" cy="32" r="8" strokeWidth="0.5" opacity="0.3"/>
        </svg>
      )
    },
    {
      id: "curation",
      title: "Collection Design",
      subtitle: "Curatorial Narrative & Space Integration",
      desc: "Crafting cohesive collections with scholarly depth — each piece curated to harmonize with architectural surroundings and elevate the whole.",
      details: [
        "Long-term collection master planning across movements and mediums",
        "Spatial harmonisation with premier residential & private yacht architecture",
        "Museum loan coordination and monographic publication support",
        "Comprehensive digital archive and condition logging"
      ],
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#D4AF37" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="12" width="34" height="40" strokeWidth="1.2"/>
          <rect x="24" y="6" width="34" height="40" strokeWidth="0.8" opacity="0.5"/>
          <line x1="6" y1="32" x2="40" y2="32" strokeWidth="0.5" opacity="0.3"/>
          <line x1="23" y1="12" x2="23" y2="52" strokeWidth="0.5" opacity="0.3"/>
        </svg>
      )
    },
    {
      id: "access",
      title: "Cultural Access",
      subtitle: "Private Salons & Curatorial Networks",
      desc: "Privileged entry to private artist ateliers, premier international art fairs (Basel, Frieze, TEFAF VIP), and exclusive curatorial gatherings reserved for patrons.",
      details: [
        "First-look invitations to international museum director previews",
        "Bespoke private dinners with leading contemporary masters and curators",
        "White-glove fair navigation with dedicated senior art advisor accompaniment",
        "Private vault viewings in Geneva, London, and New York FreePorts"
      ],
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="#D4AF37" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="26" strokeWidth="1.2"/>
          <circle cx="32" cy="32" r="16" strokeWidth="0.5" opacity="0.4"/>
          <circle cx="32" cy="32" r="4" strokeWidth="0.8" fill="#D4AF37" fillOpacity="0.15"/>
          <line x1="32" y1="6" x2="32" y2="58" strokeWidth="0.5" opacity="0.35"/>
          <line x1="6" y1="32" x2="58" y2="32" strokeWidth="0.5" opacity="0.35"/>
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="services">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" data-reveal>
          <span className="label-upper">Our Expertise</span>
          <h2 className="heading-section">Three Pillars of Excellence</h2>
          <svg className="section-divider" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line x1="0" y1="10" x2="85" y2="10" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
            <rect x="93" y="3" width="14" height="14" transform="rotate(45 100 10)" stroke="#D4AF37" strokeWidth="0.75" fill="none"/>
            <line x1="115" y1="10" x2="200" y2="10" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
          </svg>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="service-card"
              style={{ cursor: "pointer", position: "relative" }}
              onClick={() => setSelectedService(svc)}
            >
              <div className="service-icon" aria-hidden="true">
                {svc.icon}
              </div>
              <h3 className="service-name">{svc.title}</h3>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "-0.5rem", marginBottom: "0.5rem" }}>
                {svc.subtitle}
              </p>
              <div className="service-rule" aria-hidden="true"></div>
              <p className="service-desc">{svc.desc}</p>
              <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--gold-light)", fontSize: "0.8rem", fontFamily: "var(--font-ui)" }}>
                <span>Examine Advisory Scope</span>
                <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="modal-backdrop" onClick={() => setSelectedService(null)}>
          <div className="modal-container" style={{ maxWidth: "600px" }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedService(null)}>
              <X size={18} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--gold)", marginBottom: "0.5rem" }}>
              <Sparkles size={16} />
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-ui)" }}>
                Curatorial Pillar
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--ivory)", fontSize: "1.8rem" }}>
              {selectedService.title}
            </h2>
            <div className="gold-rule" style={{ margin: "1rem 0" }}></div>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--champagne)", fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>
              {selectedService.desc}
            </p>

            <h4 style={{ fontFamily: "var(--font-ui)", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem" }}>
              Bespoke Advisory Deliverables:
            </h4>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {selectedService.details.map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontFamily: "var(--font-ui)", fontSize: "0.85rem", color: "var(--ivory)" }}>
                  <span style={{ color: "var(--gold)", fontSize: "1rem", lineHeight: 1 }}>◆</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(212,175,55,0.2)", display: "flex", justifyContent: "flex-end" }}>
              <button
                className="btn-gold"
                onClick={() => {
                  setSelectedService(null);
                  onOpenConcierge();
                }}
              >
                Inquire on this Service
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

