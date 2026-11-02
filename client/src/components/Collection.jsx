import React, { useState, useEffect } from "react";
import { Search, Lock, Eye, Sparkles, Scale, Check } from "lucide-react";

export default function Collection({ onSelectArtwork, onOpenPVR, onCompareArtworks }) {
  const [artworks, setArtworks] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [compareList, setCompareList] = useState([]);

  const categories = [
    { id: "all", label: "All Acquisitions" },
    { id: "contemporary", label: "Contemporary Geometric" },
    { id: "blue-chip", label: "Modern Blue-Chip" },
    { id: "sculptural", label: "Sculptural Works" },
    { id: "commission", label: "Private Commissions" }
  ];

  useEffect(() => {
    fetchArtworks();
  }, [activeCategory, searchQuery]);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (activeCategory !== "all") params.append("category", activeCategory);
      if (searchQuery.trim()) params.append("query", searchQuery.trim());

      const res = await fetch(`/api/artworks?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        setArtworks(json.data || []);
      }
    } catch (err) {
      console.warn("Backend fetch failed, using fallback data:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleCompare = (art, e) => {
    e.stopPropagation();
    if (compareList.find((c) => c.id === art.id)) {
      setCompareList(compareList.filter((c) => c.id !== art.id));
    } else {
      if (compareList.length >= 2) {
        setCompareList([compareList[1], art]);
      } else {
        setCompareList([...compareList, art]);
      }
    }
  };

  const getStatusBadge = (statusType, statusText) => {
    let cls = "status-badge--available";
    if (statusType === "loan") cls = "status-badge--loan";
    if (statusType === "acquired") cls = "status-badge--acquired";
    if (statusType === "confidential") cls = "status-badge--confidential";

    return <span className={`status-badge ${cls}`}>{statusText}</span>;
  };

  return (
    <section id="collection" className="collection">
      <div className="container container--wide">
        {/* Section Header */}
        <div className="section-header" data-reveal>
          <span className="label-upper">Selected Works</span>
          <h2 className="heading-section">Curated Acquisitions</h2>
          <svg className="section-divider" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line x1="0" y1="10" x2="85" y2="10" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
            <rect x="93" y="3" width="14" height="14" transform="rotate(45 100 10)" stroke="#D4AF37" strokeWidth="0.75" fill="none"/>
            <line x1="115" y1="10" x2="200" y2="10" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
          </svg>
          <p style={{ maxWidth: "600px", margin: "1rem auto 0", fontFamily: "var(--font-body)", color: "var(--champagne)", fontSize: "1.1rem" }}>
            Each masterwork in the Aureum archive has undergone comprehensive physical inspection,
            provenance verification, and independent scholarly appraisal.
          </p>
        </div>

        {/* Gallery Controls: Filter Tabs & Search */}
        <div className="gallery-controls">
          <div className="gallery-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`tab-btn ${activeCategory === cat.id ? "active" : ""}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="gallery-search-wrap">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search by artist, title, or medium..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="gallery-search-input"
            />
          </div>
        </div>

        {/* Floating Compare Drawer Bar */}
        {compareList.length > 0 && (
          <div
            style={{
              position: "sticky",
              top: "5.5rem",
              zIndex: 80,
              background: "rgba(12,12,24,0.95)",
              border: "1px solid var(--gold)",
              padding: "0.75rem 1.5rem",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.8)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Scale size={18} color="#D4AF37" />
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.85rem", color: "var(--ivory)" }}>
                Selected for Comparison:{" "}
                <strong>{compareList.map((c) => c.title).join(" vs ")}</strong>
                {compareList.length === 1 && " (Select 1 more artwork)"}
              </span>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              {compareList.length === 2 && (
                <button
                  className="btn-gold"
                  onClick={() => onCompareArtworks(compareList[0], compareList[1])}
                  style={{ padding: "0.4rem 1rem", fontSize: "0.75rem" }}
                >
                  Launch Side-by-Side Comparison
                </button>
              )}
              <button
                onClick={() => setCompareList([])}
                style={{ background: "transparent", border: "1px solid rgba(212,175,55,0.3)", color: "var(--platinum)", padding: "0.4rem 0.8rem", fontSize: "0.75rem", cursor: "pointer" }}
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="gallery-grid" style={{ minHeight: "350px" }}>
          {loading ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem", color: "var(--gold)" }}>
              <Sparkles className="animate-spin" size={28} style={{ margin: "0 auto 1rem" }} />
              <p style={{ fontFamily: "var(--font-ui)", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "0.8rem" }}>
                Consulting Archival Database...
              </p>
            </div>
          ) : artworks.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem", color: "var(--platinum)" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem" }}>No works match your criteria.</p>
              <button
                onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
                className="btn-gold"
                style={{ marginTop: "1rem", padding: "0.5rem 1.25rem", fontSize: "0.75rem" }}
              >
                Reset Catalog Filters
              </button>
            </div>
          ) : (
            artworks.map((item, idx) => {
              const isComparing = compareList.some((c) => c.id === item.id);
              return (
                <div
                  key={item.id}
                  className={`gallery-item ${idx === 0 && activeCategory === "all" ? "gallery-item--featured" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => onSelectArtwork(item)}
                >
                  <div className="gallery-frame" style={{ position: "relative" }}>
                    {/* Status Tag */}
                    <div style={{ position: "absolute", top: "1rem", left: "1rem", zIndex: 10 }}>
                      {getStatusBadge(item.statusType, item.status)}
                    </div>

                    {/* Compare Button */}
                    <button
                      onClick={(e) => toggleCompare(item, e)}
                      title="Add to comparative analysis"
                      style={{
                        position: "absolute",
                        top: "1rem",
                        right: "1rem",
                        zIndex: 10,
                        background: isComparing ? "var(--gold)" : "rgba(12,12,24,0.75)",
                        border: "1px solid var(--gold)",
                        color: isComparing ? "var(--obsidian)" : "var(--gold)",
                        padding: "0.3rem 0.6rem",
                        fontSize: "0.7rem",
                        fontFamily: "var(--font-ui)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      {isComparing ? <Check size={11} /> : <Scale size={11} />}
                      {isComparing ? "Compared" : "Compare"}
                    </button>

                    <div className="gallery-art">
                      <img src={item.image} alt={item.title} loading="lazy" />
                    </div>

                    <div className="gallery-overlay">
                      <div className="gallery-info" style={{ width: "100%" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                          <p className="gallery-title">{item.title}</p>
                          <span style={{ color: "var(--gold-light)", fontFamily: "var(--font-ui)", fontSize: "0.8rem" }}>
                            {item.year}
                          </span>
                        </div>
                        <p style={{ color: "var(--gold)", fontFamily: "var(--font-ui)", fontSize: "0.85rem", margin: "0.2rem 0" }}>
                          {item.artist}
                        </p>
                        <p className="gallery-meta" style={{ marginTop: "0.25rem", fontSize: "0.85rem" }}>
                          {item.medium} · {item.dimensions}
                        </p>
                        <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(212,175,55,0.2)", paddingTop: "0.6rem" }}>
                          <span style={{ fontSize: "0.8rem", color: "var(--champagne)", fontFamily: "var(--font-ui)" }}>
                            Valuation: <strong style={{ color: "var(--gold)" }}>{item.valuation}</strong>
                          </span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", color: "var(--gold)", fontSize: "0.75rem", fontFamily: "var(--font-ui)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                            <Eye size={13} />
                            Inspect Dossier
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Private Viewing Room Gated Banner */}
        <div className="pvr-teaser-box">
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--gold)", marginBottom: "0.75rem" }}>
            <Lock size={16} />
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Strictly Confidential Access
            </span>
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--ivory)", marginBottom: "0.5rem" }}>
            The Private Viewing Room
          </h3>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--champagne)", fontSize: "1.1rem", maxWidth: "680px", margin: "0 auto" }}>
            Select blue-chip masterpieces by international masters are withheld from public exhibition.
            Accredited patrons and family offices may request entry with their confidential access token.
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <button onClick={onOpenPVR} className="btn-gold" style={{ padding: "0.75rem 2rem", fontSize: "0.8rem" }}>
              Enter Private Viewing Room (Passcode)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
