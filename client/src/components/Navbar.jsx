import React, { useState, useEffect } from "react";
import { Lock, ShieldCheck, Menu, X } from "lucide-react";

export default function Navbar({ onOpenConcierge, onOpenVault, onOpenPVR }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Philosophy", href: "#philosophy" },
    { name: "Services", href: "#services" },
    { name: "Collection", href: "#collection" },
    { name: "Viewing Room", onClick: onOpenPVR },
    { name: "Journal", href: "#journal" },
    { name: "Journey", href: "#journey" }
  ];

  return (
    <>
      <nav id="main-nav" className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav-inner" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>
          <a href="#hero" className="nav-logo" id="nav-logo" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>AUREUM</span>
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--gold)", border: "1px solid rgba(212,175,55,0.4)", padding: "1px 5px" }}>
              ADVISORY
            </span>
          </a>

          <div className="nav-links" id="nav-links">
            {navLinks.map((link, idx) =>
              link.onClick ? (
                <button
                  key={idx}
                  onClick={link.onClick}
                  className="nav-link"
                  style={{ background: "transparent", border: "none", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
                >
                  <Lock size={12} style={{ color: "var(--gold)" }} />
                  {link.name}
                </button>
              ) : (
                <a key={idx} href={link.href} className="nav-link">
                  {link.name}
                </a>
              )
            )}

            {/* VIP Patron Vault Button */}
            <button
              onClick={onOpenVault}
              className="nav-link"
              style={{
                background: "rgba(212,175,55,0.08)",
                border: "1px solid rgba(212,175,55,0.3)",
                padding: "0.35rem 0.8rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "var(--champagne)"
              }}
              title="Patron Vault Login"
            >
              <ShieldCheck size={13} style={{ color: "var(--gold)" }} />
              Patron Vault
            </button>

            {/* Concierge Application CTA */}
            <button
              onClick={onOpenConcierge}
              className="nav-link"
              id="nav-cta"
              style={{
                background: "var(--gold)",
                color: "var(--obsidian)",
                fontWeight: "600",
                padding: "0.4rem 1.1rem",
                border: "none",
                cursor: "pointer"
              }}
            >
              Apply
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="nav-toggle"
            id="nav-toggle"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: "none" }}
          >
            {mobileOpen ? <X size={24} color="#D4AF37" /> : <Menu size={24} color="#D4AF37" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div className={`nav-overlay ${mobileOpen ? "active" : ""}`} id="nav-overlay">
        <div className="nav-overlay-links">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href || "#"}
              className="overlay-link"
              onClick={(e) => {
                setMobileOpen(false);
                if (link.onClick) {
                  e.preventDefault();
                  link.onClick();
                }
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#"
            className="overlay-link"
            onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              onOpenVault();
            }}
          >
            Patron Vault
          </a>
          <a
            href="#"
            className="overlay-link"
            style={{ color: "var(--gold)" }}
            onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              onOpenConcierge();
            }}
          >
            Apply for Membership
          </a>
        </div>
      </div>
    </>
  );
}

