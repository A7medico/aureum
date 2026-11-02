import React from "react";
import { X, Sparkles, Scale, ArrowRight, ShieldCheck } from "lucide-react";

export default function ArtworkComparisonModal({ artA, artB, onClose, onInquire }) {
  if (!artA || !artB) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: "1050px" }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Comparison">
          <X size={18} />
        </button>

        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--gold)" }}>
            <Scale size={18} />
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-ui)" }}>
              Comparative Curatorial Analysis
            </span>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--ivory)", fontSize: "2rem", marginTop: "0.3rem" }}>
            Masterwork Comparison
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          {[artA, artB].map((art) => (
            <div
              key={art.id}
              style={{
                background: "rgba(18,18,32,0.6)",
                border: "1px solid var(--gold)",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
              }}
            >
              <div style={{ height: "260px", background: "#050508", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "1px solid rgba(212,175,55,0.2)" }}>
                <img
                  src={art.image}
                  alt={art.title}
                  style={{ maxHeight: "100%", width: "auto", objectFit: "contain" }}
                />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", color: "var(--ivory)", fontSize: "1.6rem" }}>
                  {art.title}
                </h3>
                <p style={{ fontFamily: "var(--font-ui)", color: "var(--gold-light)", fontSize: "0.9rem" }}>
                  {art.artist} ({art.year})
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontFamily: "var(--font-ui)", fontSize: "0.85rem", background: "rgba(10,10,18,0.7)", padding: "1rem" }}>
                <div>
                  <span style={{ color: "var(--platinum)", fontSize: "0.7rem", textTransform: "uppercase" }}>Valuation Range:</span>
                  <div style={{ color: "var(--gold)", fontWeight: 600, fontSize: "1.1rem" }}>{art.valuation}</div>
                </div>
                <div>
                  <span style={{ color: "var(--platinum)", fontSize: "0.7rem", textTransform: "uppercase" }}>Medium:</span>
                  <div style={{ color: "var(--ivory)" }}>{art.medium}</div>
                </div>
                <div>
                  <span style={{ color: "var(--platinum)", fontSize: "0.7rem", textTransform: "uppercase" }}>Dimensions:</span>
                  <div style={{ color: "var(--ivory)" }}>{art.dimensions}</div>
                </div>
                <div>
                  <span style={{ color: "var(--platinum)", fontSize: "0.7rem", textTransform: "uppercase" }}>Provenance Depth:</span>
                  <div style={{ color: "var(--champagne)" }}>{(art.provenance || []).length} Documented Historical Transfers</div>
                </div>
                <div>
                  <span style={{ color: "var(--platinum)", fontSize: "0.7rem", textTransform: "uppercase" }}>Current Acquisition Status:</span>
                  <div style={{ marginTop: "2px" }}>
                    <span className={`status-badge status-badge--${art.statusType || 'available'}`}>
                      {art.status}
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--champagne)", lineHeight: "1.5" }}>
                "{art.curatorialNotes?.slice(0, 180)}..."
              </p>

              <button
                className="btn-gold"
                onClick={() => {
                  onClose();
                  onInquire(art);
                }}
                style={{ marginTop: "auto", padding: "0.75rem", fontSize: "0.8rem", width: "100%" }}
              >
                Inquire on {art.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
