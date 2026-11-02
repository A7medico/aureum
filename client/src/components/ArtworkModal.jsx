import React, { useState } from "react";
import { X, ZoomIn, ZoomOut, Maximize2, ShieldCheck, FileText, Sparkles, SlidersHorizontal, Home } from "lucide-react";

export default function ArtworkModal({ artwork, onClose, onInquire }) {
  const [viewMode, setViewMode] = useState("archive"); // 'archive' | 'salon'
  const [isZoomed, setIsZoomed] = useState(false);
  const [wallTheme, setWallTheme] = useState("obsidian"); // 'obsidian' | 'navy' | 'limestone'

  if (!artwork) return null;

  // Real world scale approximation for salon simulator
  const widthCm = artwork.scale?.widthCm || 150;
  const heightCm = artwork.scale?.heightCm || 180;
  // Calculate scaled height within a 380px container
  const salonHeightPx = Math.min(220, Math.max(120, heightCm * 0.9));
  const salonWidthPx = salonHeightPx * (widthCm / heightCm);

  const wallGradients = {
    obsidian: "radial-gradient(circle at 50% 25%, #2a2a3e 0%, #12121e 70%, #0a0a10 100%)",
    navy: "radial-gradient(circle at 50% 25%, #1d3557 0%, #0f1c2e 70%, #080d15 100%)",
    limestone: "radial-gradient(circle at 50% 25%, #4a453e 0%, #292622 70%, #171513 100%)"
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: "1050px" }} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Dossier">
          <X size={18} />
        </button>

        {/* Header Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingRight: "3rem" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--gold)" }}>
              <Sparkles size={14} />
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-ui)" }}>
                Curatorial Dossier · No. {artwork.id.toUpperCase()}
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--ivory)", fontSize: "2.2rem", margin: "0.2rem 0" }}>
              {artwork.title}
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--gold-light)", fontSize: "1.2rem", fontStyle: "italic" }}>
              by {artwork.artist} ({artwork.year})
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.7rem", color: "var(--platinum)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
              Valuation Guidance
            </span>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--gold)" }}>
              {artwork.valuation}
            </div>
            <span style={{ display: "inline-block", marginTop: "0.25rem" }}>
              <span className={`status-badge status-badge--${artwork.statusType || 'available'}`}>
                {artwork.status}
              </span>
            </span>
          </div>
        </div>

        <div className="gold-rule" style={{ margin: "1.25rem 0" }}></div>

        {/* Content Layout */}
        <div className="dossier-grid">
          {/* Visual Pane */}
          <div className="dossier-visual-pane">
            {/* View Mode Switcher */}
            <div className="visualizer-toggle">
              <button
                className={`viz-btn ${viewMode === "archive" ? "active" : ""}`}
                onClick={() => setViewMode("archive")}
              >
                <Maximize2 size={13} style={{ display: "inline", marginRight: "5px" }} />
                Archival Canvas View
              </button>
              <button
                className={`viz-btn ${viewMode === "salon" ? "active" : ""}`}
                onClick={() => setViewMode("salon")}
              >
                <Home size={13} style={{ display: "inline", marginRight: "5px" }} />
                View on Wall (Salon Scale)
              </button>
            </div>

            {viewMode === "archive" ? (
              <div>
                <div
                  className={`dossier-img-wrap ${isZoomed ? "zoomed" : ""}`}
                  onClick={() => setIsZoomed(!isZoomed)}
                  title={isZoomed ? "Click to reset zoom" : "Click to magnify surface texture"}
                >
                  <img src={artwork.image} alt={artwork.title} />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0.75rem",
                      right: "0.75rem",
                      background: "rgba(8,8,13,0.8)",
                      border: "1px solid rgba(212,175,55,0.4)",
                      padding: "0.3rem 0.6rem",
                      color: "var(--gold)",
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-ui)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem"
                    }}
                  >
                    {isZoomed ? <ZoomOut size={13} /> : <ZoomIn size={13} />}
                    {isZoomed ? "Reset Zoom" : "Click to Magnify 160%"}
                  </div>
                </div>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", color: "var(--platinum)", textAlign: "center", marginTop: "0.5rem" }}>
                  Framed in {artwork.framedDimensions || "bespoke museum gilded walnut"}
                </p>
              </div>
            ) : (
              <div>
                {/* Salon Wall Visualizer */}
                <div
                  className="salon-wall-simulator"
                  style={{ background: wallGradients[wallTheme] }}
                >
                  <div className="salon-wall-lighting" />

                  {/* Scaled Artwork Frame */}
                  <div
                    className="salon-wall-artwork-frame"
                    style={{
                      height: `${salonHeightPx}px`,
                      width: `${salonWidthPx}px`
                    }}
                  >
                    <img src={artwork.image} alt={artwork.title} />
                  </div>

                  {/* Proportional Interior Furniture Element for Scale */}
                  <div className="salon-furniture-silhouette">
                    <span className="salon-furniture-label">
                      Architectural Salon Horizon (1:10 Metric Ratio)
                    </span>
                  </div>
                </div>

                {/* Wall Theme Controls */}
                <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "0.75rem" }}>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.7rem", color: "var(--platinum)", alignSelf: "center", textTransform: "uppercase" }}>
                    Wall Atmosphere:
                  </span>
                  <button
                    onClick={() => setWallTheme("obsidian")}
                    style={{
                      padding: "0.2rem 0.6rem",
                      fontSize: "0.7rem",
                      background: wallTheme === "obsidian" ? "var(--gold)" : "#16162a",
                      color: wallTheme === "obsidian" ? "#000" : "#ccc",
                      border: "1px solid rgba(212,175,55,0.3)"
                    }}
                  >
                    Obsidian Velvet
                  </button>
                  <button
                    onClick={() => setWallTheme("navy")}
                    style={{
                      padding: "0.2rem 0.6rem",
                      fontSize: "0.7rem",
                      background: wallTheme === "navy" ? "var(--gold)" : "#16162a",
                      color: wallTheme === "navy" ? "#000" : "#ccc",
                      border: "1px solid rgba(212,175,55,0.3)"
                    }}
                  >
                    Midnight Navy
                  </button>
                  <button
                    onClick={() => setWallTheme("limestone")}
                    style={{
                      padding: "0.2rem 0.6rem",
                      fontSize: "0.7rem",
                      background: wallTheme === "limestone" ? "var(--gold)" : "#16162a",
                      color: wallTheme === "limestone" ? "#000" : "#ccc",
                      border: "1px solid rgba(212,175,55,0.3)"
                    }}
                  >
                    Warm Limestone
                  </button>
                </div>
              </div>
            )}

            {/* Inquire CTA */}
            <div style={{ marginTop: "1rem" }}>
              <button
                className="btn-gold"
                style={{ width: "100%", textAlign: "center", padding: "0.85rem" }}
                onClick={() => onInquire(artwork)}
              >
                Inquire Privately for Acquisition
              </button>
            </div>
          </div>

          {/* Dossier Information Pane */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxHeight: "550px", overflowY: "auto", paddingRight: "0.5rem" }}>
            {/* Specifications Card */}
            <div style={{ background: "rgba(22,22,42,0.4)", border: "1px solid rgba(212,175,55,0.2)", padding: "1.25rem" }}>
              <h4 style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem" }}>
                Physical &amp; Archival Specifications
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", fontFamily: "var(--font-ui)", fontSize: "0.85rem" }}>
                <div>
                  <span style={{ color: "var(--platinum)", fontSize: "0.75rem" }}>Medium</span>
                  <p style={{ color: "var(--ivory)", marginTop: "2px" }}>{artwork.medium}</p>
                </div>
                <div>
                  <span style={{ color: "var(--platinum)", fontSize: "0.75rem" }}>Dimensions</span>
                  <p style={{ color: "var(--ivory)", marginTop: "2px" }}>{artwork.dimensions}</p>
                </div>
                <div>
                  <span style={{ color: "var(--platinum)", fontSize: "0.75rem" }}>Framing</span>
                  <p style={{ color: "var(--ivory)", marginTop: "2px" }}>{artwork.framedDimensions || "Museum Standard"}</p>
                </div>
                <div>
                  <span style={{ color: "var(--platinum)", fontSize: "0.75rem" }}>Movement / Cycle</span>
                  <p style={{ color: "var(--ivory)", marginTop: "2px" }}>{artwork.category?.toUpperCase() || "CONTEMPORARY"}</p>
                </div>
              </div>
            </div>

            {/* Curatorial Essay */}
            <div>
              <h4 style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem" }}>
                Curatorial Assessment
              </h4>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--ivory)", lineHeight: "1.7" }}>
                {artwork.curatorialNotes}
              </p>
            </div>

            {/* Verified Provenance Timeline */}
            <div>
              <h4 style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem" }}>
                Documented Provenance Chain
              </h4>
              <div className="provenance-timeline">
                {(artwork.provenance || []).map((node, i) => (
                  <div key={i} className="timeline-node">
                    <span className="timeline-year">{node.year}</span>
                    <h5 className="timeline-event">{node.event}</h5>
                    <p className="timeline-notes">{node.notes}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Condition & Certificate */}
            <div style={{ background: "rgba(12,12,24,0.6)", border: "1px solid rgba(212,175,55,0.15)", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                <ShieldCheck size={18} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <strong style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", color: "var(--champagne)", textTransform: "uppercase" }}>Condition Report:</strong>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--platinum)" }}>
                    {artwork.condition}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                <FileText size={18} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <strong style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", color: "var(--champagne)", textTransform: "uppercase" }}>Authentication:</strong>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--platinum)" }}>
                    {artwork.certificate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

