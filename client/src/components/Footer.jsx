import React, { useState } from "react";
import { Mail, Check } from "lucide-react";

export default function Footer({ onOpenConcierge, onShowToast }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      onShowToast("Subscribed to the confidential Aureum Curatorial Gazette.");
      setEmail("");
    }
  };

  return (
    <footer className="footer" style={{ borderTop: "1px solid rgba(212,175,55,0.2)", background: "#050509" }}>
      <div className="container">
        {/* Curatorial Dispatch Newsletter Signup */}
        <div style={{ maxWidth: "540px", margin: "0 auto 3.5rem", textAlign: "center" }}>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>
            Confidential Dispatch
          </span>
          <h4 style={{ fontFamily: "var(--font-display)", color: "var(--ivory)", fontSize: "1.4rem", margin: "0.3rem 0 0.75rem" }}>
            The Private Monograph Briefing
          </h4>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--platinum)", fontSize: "0.95rem", marginBottom: "1.25rem" }}>
            Receive our quarterly private treaty market retrospective and curatorial essays directly to your inbox.
          </p>

          {subscribed ? (
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#34d399", fontSize: "0.85rem", fontFamily: "var(--font-ui)" }}>
              <Check size={16} /> Subscribed with discretion.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "0.5rem", maxWidth: "440px", margin: "0 auto" }}>
              <input
                type="email"
                required
                placeholder="patron@estate.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                style={{ flex: 1, padding: "0.6rem 1rem", fontSize: "0.85rem" }}
              />
              <button type="submit" className="btn-gold" style={{ padding: "0.6rem 1.25rem", fontSize: "0.75rem" }}>
                Subscribe
              </button>
            </form>
          )}
        </div>

        <div className="footer-content">
          <p className="footer-logo">AUREUM</p>
          <p className="footer-tagline">Private Art Advisory &amp; Collection Curation</p>
          <div className="footer-rule" aria-hidden="true"></div>
          <div className="footer-locations">
            <a href="#hero">Geneva</a>
            <span className="footer-dot" aria-hidden="true">·</span>
            <a href="#hero">London</a>
            <span className="footer-dot" aria-hidden="true">·</span>
            <a href="#hero">New York</a>
            <span className="footer-dot" aria-hidden="true">·</span>
            <a href="#hero">Hong Kong</a>
            <span className="footer-dot" aria-hidden="true">·</span>
            <a href="#hero">Zurich</a>
          </div>
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Aureum Advisory SA. All rights reserved. Registered Geneva FreePort Partner.
          </p>
        </div>
      </div>
    </footer>
  );
}

