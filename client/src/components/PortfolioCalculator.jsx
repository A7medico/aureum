import React, { useState } from "react";
import { TrendingUp, ShieldCheck, DollarSign, Calendar, Sparkles, ArrowRight, Download } from "lucide-react";

export default function PortfolioCalculator({ onOpenConcierge, onShowToast }) {
  const [allocation, setAllocation] = useState(2500000); // $2.5M
  const [horizonYears, setHorizonYears] = useState(10); // 10 years
  const [category, setCategory] = useState("post-war"); // 'post-war' | 'contemporary' | 'sculptural'

  // Historical CAGR benchmarks
  const cagrMap = {
    "post-war": { rate: 0.098, name: "Post-War & Modern Masters", beta: 0.12 },
    "contemporary": { rate: 0.114, name: "Contemporary Blue-Chip", beta: 0.28 },
    "sculptural": { rate: 0.086, name: "Monumental Sculpture", beta: 0.09 }
  };

  const currentCagr = cagrMap[category];
  const projectedValue = Math.round(allocation * Math.pow(1 + currentCagr.rate, horizonYears));
  const estimatedGain = projectedValue - allocation;
  const annualAppreciationEst = Math.round(allocation * currentCagr.rate);
  const custodyFreeportSavings = Math.round(allocation * 0.077); // ~7.7% Swiss VAT suspension benefit

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="calculator" className="section" style={{ padding: "7rem 0", background: "linear-gradient(180deg, #090910 0%, #0d0d1b 100%)", borderTop: "1px solid rgba(212,175,55,0.2)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header" data-reveal>
          <span className="label-upper">Capital Allocation Modeling</span>
          <h2 className="heading-section">Generational Portfolio Modeling</h2>
          <svg className="section-divider" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line x1="0" y1="10" x2="85" y2="10" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
            <rect x="93" y="3" width="14" height="14" transform="rotate(45 100 10)" stroke="#D4AF37" strokeWidth="0.75" fill="none"/>
            <line x1="115" y1="10" x2="200" y2="10" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
          </svg>
          <p style={{ maxWidth: "660px", margin: "1rem auto 0", fontFamily: "var(--font-body)", color: "var(--champagne)", fontSize: "1.1rem" }}>
            Blue-chip tangible assets offer asymmetric downside resilience and historical capital growth
            uncorrelated with public equity volatility. Simulate your collection's generational trajectory below.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginTop: "3rem", background: "rgba(18,18,32,0.6)", border: "1px solid var(--gold)", padding: "2.5rem", boxShadow: "0 25px 60px rgba(0,0,0,0.8)" }}>
          {/* Controls Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }}>
                Curatorial Category Discipline
              </span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", marginTop: "0.6rem" }}>
                {Object.entries(cagrMap).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => setCategory(key)}
                    style={{
                      background: category === key ? "rgba(212,175,55,0.22)" : "rgba(22,22,42,0.5)",
                      border: `1px solid ${category === key ? "var(--gold)" : "rgba(212,175,55,0.2)"}`,
                      color: category === key ? "var(--gold-light)" : "var(--platinum)",
                      padding: "0.75rem 0.5rem",
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-ui)",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    {data.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 1: Capital Allocation */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--champagne)" }}>
                  Target Capital Allocation
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--gold)" }}>
                  {formatCurrency(allocation)}
                </span>
              </div>
              <input
                type="range"
                min="500000"
                max="20000000"
                step="250000"
                value={allocation}
                onChange={(e) => setAllocation(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#D4AF37", cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--platinum)", marginTop: "4px" }}>
                <span>$500,000</span>
                <span>$10,000,000</span>
                <span>$20,000,000+</span>
              </div>
            </div>

            {/* Slider 2: Horizon */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--champagne)" }}>
                  Stewardship &amp; Holding Horizon
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--gold)" }}>
                  {horizonYears} Years
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="30"
                step="1"
                value={horizonYears}
                onChange={(e) => setHorizonYears(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#D4AF37", cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--platinum)", marginTop: "4px" }}>
                <span>3 Years</span>
                <span>15 Years</span>
                <span>30 Years (Generational)</span>
              </div>
            </div>

            <div style={{ background: "rgba(12,12,24,0.7)", borderLeft: "3px solid var(--gold)", padding: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--champagne)", fontSize: "0.8rem", fontFamily: "var(--font-ui)" }}>
                <ShieldCheck size={15} color="#D4AF37" />
                <strong>Fiduciary Fiscal Custody Advantage:</strong>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--platinum)", marginTop: "4px" }}>
                Under Swiss FreePort custody mandate, acquisitions benefit from deferred import tariffs and
                tax-suspended international trade corridors, yielding an estimated{" "}
                <strong style={{ color: "#34d399" }}>{formatCurrency(custodyFreeportSavings)}</strong> in upfront capital preservation.
              </p>
            </div>
          </div>

          {/* Results Projection Column */}
          <div style={{ background: "rgba(8,8,14,0.85)", border: "1px solid rgba(212,175,55,0.3)", padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--gold)", marginBottom: "0.5rem" }}>
                <TrendingUp size={16} />
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Projected Compound Valuation ({horizonYears} Years)
                </span>
              </div>

              <div style={{ fontFamily: "var(--font-display)", fontSize: "3rem", color: "var(--gold-light)", lineHeight: 1.1 }}>
                {formatCurrency(projectedValue)}
              </div>

              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#34d399", fontFamily: "var(--font-ui)", fontSize: "0.95rem", fontWeight: 600, marginTop: "0.5rem" }}>
                <span>+{formatCurrency(estimatedGain)} Net Valuation Appreciation</span>
                <span>({((estimatedGain / allocation) * 100).toFixed(0)}%)</span>
              </div>

              <div className="gold-rule" style={{ margin: "1.5rem 0" }}></div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", fontFamily: "var(--font-ui)" }}>
                <div>
                  <span style={{ fontSize: "0.7rem", color: "var(--platinum)", textTransform: "uppercase" }}>Historical Sector CAGR</span>
                  <div style={{ fontSize: "1.1rem", color: "var(--ivory)", marginTop: "2px" }}>
                    +{(currentCagr.rate * 100).toFixed(1)}% / yr
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: "0.7rem", color: "var(--platinum)", textTransform: "uppercase" }}>Annual Appreciation Yield</span>
                  <div style={{ fontSize: "1.1rem", color: "var(--gold)", marginTop: "2px" }}>
                    {formatCurrency(annualAppreciationEst)}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: "0.7rem", color: "var(--platinum)", textTransform: "uppercase" }}>Equity Market Beta</span>
                  <div style={{ fontSize: "1.1rem", color: "var(--ivory)", marginTop: "2px" }}>
                    {currentCagr.beta} (Low Uncorrelated)
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: "0.7rem", color: "var(--platinum)", textTransform: "uppercase" }}>Insurance &amp; Custody</span>
                  <div style={{ fontSize: "1.1rem", color: "var(--ivory)", marginTop: "2px" }}>
                    0.28% Lloyd's All-Risk
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem" }}>
              <button
                className="btn-gold"
                onClick={onOpenConcierge}
                style={{ flex: 1, padding: "0.85rem", fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}
              >
                Request Curatorial Allocation Thesis <ArrowRight size={15} />
              </button>
              <button
                onClick={() => onShowToast("Exporting encrypted portfolio simulation dossier (PDF)...")}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(212,175,55,0.4)",
                  color: "var(--gold)",
                  padding: "0.85rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                title="Download Projection Report"
              >
                <Download size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
