import React, { useState, useEffect } from "react";
import { BookOpen, Clock, ArrowRight, X, Sparkles } from "lucide-react";

export default function Journal({ onOpenConcierge }) {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    fetch("/api/insights")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setArticles(data.data || []);
        }
      })
      .catch((err) => console.warn("Failed fetching insights:", err));
  }, []);

  return (
    <section id="journal" className="section" style={{ padding: "8rem 0", background: "linear-gradient(180deg, var(--obsidian) 0%, #0d0d1a 100%)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header" data-reveal>
          <span className="label-upper">Curatorial Intelligence</span>
          <h2 className="heading-section">The Aureum Monographs</h2>
          <svg className="section-divider" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line x1="0" y1="10" x2="85" y2="10" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
            <rect x="93" y="3" width="14" height="14" transform="rotate(45 100 10)" stroke="#D4AF37" strokeWidth="0.75" fill="none"/>
            <line x1="115" y1="10" x2="200" y2="10" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
          </svg>
          <p style={{ maxWidth: "600px", margin: "1rem auto 0", fontFamily: "var(--font-body)", color: "var(--champagne)", fontSize: "1.1rem" }}>
            Scholarly analyses on blue-chip capital resilience, historical provenance forensics,
            and the placement of masterworks in private architecture.
          </p>
        </div>

        {/* Journal Cards Grid */}
        <div className="journal-grid">
          {articles.map((art) => (
            <div key={art.id} className="journal-card">
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span className="journal-cat">{art.category}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", color: "var(--platinum)", fontSize: "0.75rem", fontFamily: "var(--font-ui)" }}>
                    <Clock size={12} /> {art.readTime}
                  </span>
                </div>
                <h3 className="journal-title">{art.title}</h3>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.8rem", color: "var(--gold-light)", marginBottom: "0.75rem" }}>
                  {art.subtitle}
                </p>
                <p className="journal-excerpt">{art.excerpt}</p>
              </div>

              <div>
                <div className="journal-meta" style={{ marginBottom: "1rem" }}>
                  <span>{art.author}</span>
                  <span>{art.date}</span>
                </div>
                <button
                  onClick={() => setSelectedArticle(art)}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(212,175,55,0.3)",
                    color: "var(--gold)",
                    padding: "0.5rem 1rem",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                    fontSize: "0.8rem",
                    fontFamily: "var(--font-ui)",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  <BookOpen size={14} /> Read Monograph <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monograph Full Reading Drawer Modal */}
      {selectedArticle && (
        <div className="modal-backdrop" onClick={() => setSelectedArticle(null)}>
          <div className="modal-container" style={{ maxWidth: "780px" }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedArticle(null)}>
              <X size={18} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--gold)", marginBottom: "0.5rem" }}>
              <Sparkles size={14} />
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-ui)" }}>
                {selectedArticle.category} · {selectedArticle.date}
              </span>
            </div>

            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--ivory)", fontSize: "2.2rem", lineHeight: 1.2 }}>
              {selectedArticle.title}
            </h2>
            <p style={{ fontFamily: "var(--font-ui)", color: "var(--champagne)", fontSize: "1rem", margin: "0.5rem 0 1.25rem" }}>
              {selectedArticle.subtitle}
            </p>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.8rem", color: "var(--platinum)", borderBottom: "1px solid rgba(212,175,55,0.2)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
              By {selectedArticle.author} · {selectedArticle.readTime}
            </p>

            <div style={{ fontFamily: "var(--font-body)", color: "var(--ivory)", fontSize: "1.15rem", lineHeight: "1.8", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <p style={{ fontStyle: "italic", color: "var(--champagne)", borderLeft: "3px solid var(--gold)", paddingLeft: "1.25rem" }}>
                "{selectedArticle.excerpt}"
              </p>
              <p>{selectedArticle.content}</p>
              <p>
                In an era characterized by short-term liquid market shifts, the enduring physical authority of a blue-chip artwork
                acts as both an intellectual refuge and an uncorrelated balance sheet reserve. At Aureum, our curatorial and legal
                partners ensure that every step of acquisition—from non-destructive multi-spectral pigment analysis to tax-domiciled
                FreePort custody—safeguards our patrons' enduring legacy.
              </p>
            </div>

            <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(212,175,55,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--platinum)" }}>
                Interested in this advisory topic?
              </span>
              <button
                className="btn-gold"
                style={{ padding: "0.5rem 1.5rem", fontSize: "0.8rem" }}
                onClick={() => {
                  setSelectedArticle(null);
                  onOpenConcierge();
                }}
              >
                Schedule Curatorial Briefing
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

