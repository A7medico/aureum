import React, { useState } from "react";
import { MapPin, Clock, Calendar, ShieldCheck, Phone, ArrowRight, UserCheck } from "lucide-react";

export default function SalonDirectory({ onOpenConcierge }) {
  const [activeCity, setActiveCity] = useState("geneva");

  const salons = {
    geneva: {
      city: "Geneva",
      country: "Switzerland",
      district: "Rue du Rhône & Geneva FreePort",
      address: "14 Rue du Rhône, 1204 Genève",
      vaultType: "High-Security Bonded Vault & Restoration Atelier",
      seniorPartner: "Dr. Henri Dubois — Managing Director, Continental Europe",
      hours: "Strictly by Private Appointment (Mon — Sat)",
      specialty: "Off-market Post-War acquisitions, international custody, and multi-spectral provenance forensics.",
      phone: "+41 22 819 9000",
      features: ["Customs-Bonded Viewing Salons", "Restoration Atelier on Premises", "Private Vault Transit Link"]
    },
    london: {
      city: "London",
      country: "United Kingdom",
      district: "Mayfair",
      address: "28 Old Bond Street, Mayfair, London W1S 4DR",
      vaultType: "Bespoke Collector Salon & Private Library",
      seniorPartner: "Lady Vivienne Sterling — Senior Advisory Partner",
      hours: "Private Patron Appointments Available Daily",
      specialty: "European Blue-Chip Modernism, secondary auction representation, and generational family trusts.",
      phone: "+44 20 7946 0880",
      features: ["Private Evening Salon Dinners", "Auction Bidding Suite", "Optium Lighting Examination Room"]
    },
    newyork: {
      city: "New York",
      country: "United States",
      district: "Upper East Side / Fifth Avenue",
      address: "980 Fifth Avenue, New York, NY 10075",
      vaultType: "Private Townhouse Viewing Chamber",
      seniorPartner: "Archibald Vance — Chief Curatorial Strategist",
      hours: "By Curatorial Invitation Only",
      specialty: "Monumental Abstract Expressionism, Color-Field masterworks, and institutional placement.",
      phone: "+1 212 555 0192",
      features: ["18-Foot Ceiling Exhibition Space", "Direct Museum Loan Logistics", "White-Glove VIP Transport"]
    },
    zurich: {
      city: "Zurich",
      country: "Switzerland",
      district: "Bahnhofstrasse",
      address: "Bahnhofstrasse 32, 8001 Zürich",
      vaultType: "Family Office Advisory Suite",
      seniorPartner: "Beatrix von Schulthess — Head of Swiss Private Wealth",
      hours: "Monday through Friday by Consultation",
      specialty: "Fiduciary art asset allocation, estate planning, and tax-efficient foundation establishment.",
      phone: "+41 44 215 4400",
      features: ["Confidential Boardroom Facilities", "Swiss Banking Liaison", "Inalienable Authenticity Registration"]
    },
    hongkong: {
      city: "Hong Kong",
      country: "Hong Kong SAR",
      district: "Central / Victoria Dockside",
      address: "Victoria Dockside, 18 Salisbury Road, Tsim Sha Tsui",
      vaultType: "Harbour Panoramic Viewing Salon",
      seniorPartner: "Lawrence Chen — Director of Pan-Asian Collections",
      hours: "By Private Patron Registration",
      specialty: "Cross-cultural avant-garde curation, international contemporary acquisitions, and Asian biennials.",
      phone: "+852 3900 8820",
      features: ["Climate-Engineered FreePort Transit", "Private Helicopter Arrival Access", "Bilingual Advisory Consular"]
    }
  };

  const current = salons[activeCity];

  return (
    <section id="salons" className="section" style={{ padding: "7rem 0", background: "var(--obsidian)", borderTop: "1px solid rgba(212,175,55,0.2)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header" data-reveal>
          <span className="label-upper">Global Presence</span>
          <h2 className="heading-section">Private Salons &amp; Archival Vaults</h2>
          <svg className="section-divider" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line x1="0" y1="10" x2="85" y2="10" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
            <rect x="93" y="3" width="14" height="14" transform="rotate(45 100 10)" stroke="#D4AF37" strokeWidth="0.75" fill="none"/>
            <line x1="115" y1="10" x2="200" y2="10" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
          </svg>
          <p style={{ maxWidth: "620px", margin: "1rem auto 0", fontFamily: "var(--font-body)", color: "var(--champagne)", fontSize: "1.1rem" }}>
            Aureum maintains permanent confidential viewing suites and bonded climate-controlled vaults
            across the world's primary art epicenters.
          </p>
        </div>

        {/* City Switcher Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap", marginTop: "2.5rem", marginBottom: "2.5rem" }}>
          {Object.entries(salons).map(([key, item]) => (
            <button
              key={key}
              onClick={() => setActiveCity(key)}
              className={`tab-btn ${activeCity === key ? "active" : ""}`}
              style={{ padding: "0.75rem 1.8rem", fontSize: "0.85rem" }}
            >
              <MapPin size={13} style={{ display: "inline", marginRight: "6px" }} />
              {item.city}
            </button>
          ))}
        </div>

        {/* Salon Detail Card */}
        <div
          style={{
            background: "rgba(18,18,32,0.7)",
            border: "1px solid var(--gold)",
            padding: "3rem",
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "3rem",
            boxShadow: "0 25px 60px rgba(0,0,0,0.85)"
          }}
        >
          {/* Left Details */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--gold)", marginBottom: "0.5rem" }}>
              <ShieldCheck size={16} />
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {current.vaultType}
              </span>
            </div>

            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", color: "var(--ivory)", margin: "0.2rem 0" }}>
              {current.city} Private Salon
            </h3>
            <p style={{ fontFamily: "var(--font-ui)", color: "var(--gold-light)", fontSize: "0.95rem", marginBottom: "1.25rem" }}>
              {current.address} · {current.country}
            </p>

            <div className="gold-rule" style={{ margin: "1.25rem 0" }}></div>

            <p style={{ fontFamily: "var(--font-body)", color: "var(--champagne)", fontSize: "1.15rem", lineHeight: "1.7", marginBottom: "1.75rem" }}>
              {current.specialty}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--ivory)", fontSize: "0.85rem", fontFamily: "var(--font-ui)" }}>
                <UserCheck size={16} color="#D4AF37" />
                <span>Senior Liaison: <strong>{current.seniorPartner}</strong></span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--ivory)", fontSize: "0.85rem", fontFamily: "var(--font-ui)" }}>
                <Clock size={16} color="#D4AF37" />
                <span>{current.hours}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--ivory)", fontSize: "0.85rem", fontFamily: "var(--font-ui)" }}>
                <Phone size={16} color="#D4AF37" />
                <span>Dedicated Advisory Line: {current.phone}</span>
              </div>
            </div>
          </div>

          {/* Right Highlights & Booking CTA */}
          <div style={{ background: "rgba(10,10,18,0.85)", border: "1px solid rgba(212,175,55,0.25)", padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h4 style={{ fontFamily: "var(--font-ui)", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
                Salon Capabilities &amp; Amenities:
              </h4>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                {current.features.map((feat, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--ivory)", fontFamily: "var(--font-ui)", fontSize: "0.9rem" }}>
                    <span style={{ color: "var(--gold)", fontSize: "1.2rem" }}>◆</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(212,175,55,0.2)" }}>
              <button
                className="btn-gold"
                onClick={onOpenConcierge}
                style={{ width: "100%", padding: "0.85rem", fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
              >
                <Calendar size={15} />
                Reserve {current.city} Salon Viewing
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

