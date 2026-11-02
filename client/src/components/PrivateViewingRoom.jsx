import React, { useState } from "react";
import { X, Lock, KeyRound, ShieldAlert, Sparkles, Eye, CheckCircle2 } from "lucide-react";

export default function PrivateViewingRoom({ isOpen, onClose, onSelectArtwork, onInquire }) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [pvrArtworks, setPvrArtworks] = useState([]);

  if (!isOpen) return null;

  const handleUnlock = async (e) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError("Please provide your confidential access passcode.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/pvr/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: passcode.trim() })
      });
      const data = await res.json();

      if (data.success) {
        setUnlocked(true);
        setPvrArtworks(data.data || []);
      } else {
        setError(data.message || "Invalid or revoked access token.");
      }
    } catch (err) {
      setError("Network or server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setPasscode("AUREUM-VIP");
    setError("");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: unlocked ? "1050px" : "620px" }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Private Viewing Room">
          <X size={18} />
        </button>

        {!unlocked ? (
          <div style={{ textAlign: "center", padding: "1rem" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                margin: "0 auto 1.25rem",
                borderRadius: "50%",
                background: "rgba(212,175,55,0.1)",
                border: "1px solid var(--gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--gold)"
              }}
            >
              <Lock size={26} />
            </div>

            <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>
              Restricted Curatorial Chamber
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--ivory)", fontSize: "2rem", margin: "0.5rem 0" }}>
              Private Viewing Room
            </h2>
            <div className="gold-rule gold-rule--wide" style={{ margin: "1rem auto 1.5rem" }}></div>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--champagne)", fontSize: "1.1rem", lineHeight: "1.7", maxWidth: "480px", margin: "0 auto 1.5rem" }}>
              Works housed within this vault are offered exclusively under private treaty mandate.
              Access is limited to vetted collectors, family offices, and institutional trustees.
            </p>

            <form onSubmit={handleUnlock} style={{ maxWidth: "420px", margin: "0 auto" }}>
              <div style={{ position: "relative", marginBottom: "1rem" }}>
                <KeyRound
                  size={16}
                  style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--gold)", opacity: 0.7 }}
                />
                <input
                  type="text"
                  placeholder="Enter Access Passcode..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: "2.8rem", textAlign: "center", letterSpacing: "0.15em", textTransform: "uppercase" }}
                />
              </div>

              {error && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f87171", fontSize: "0.8rem", marginBottom: "1rem", justifyContent: "center" }}>
                  <ShieldAlert size={14} />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn-gold"
                disabled={loading}
                style={{ width: "100%", padding: "0.85rem", fontSize: "0.85rem" }}
              >
                {loading ? "Authenticating Token..." : "Unlock Vault Entry"}
              </button>

              <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid rgba(212,175,55,0.15)" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--platinum)" }}>Patron Demo Access: </span>
                <button
                  type="button"
                  onClick={handleDemoFill}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--gold)",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    fontWeight: 500
                  }}
                >
                  Insert "AUREUM-VIP" Key
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            {/* Unlocked View */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "#34d399" }}>
                  <CheckCircle2 size={16} />
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    Accredited Session Active
                  </span>
                </div>
                <h2 style={{ fontFamily: "var(--font-display)", color: "var(--ivory)", fontSize: "2rem", marginTop: "0.2rem" }}>
                  Off-Market Masterworks
                </h2>
              </div>
              <span className="status-badge status-badge--confidential">
                Confidentiality Level: Top Tier
              </span>
            </div>

            <p style={{ fontFamily: "var(--font-body)", color: "var(--champagne)", fontSize: "1.05rem", marginBottom: "2rem" }}>
              These works have not been publicly exhibited or offered on the open secondary market for over three decades.
              All inquiries proceed under standard non-disclosure protocol.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "2rem" }}>
              {pvrArtworks.map((art) => (
                <div
                  key={art.id}
                  style={{
                    background: "rgba(22,22,42,0.6)",
                    border: "1px solid var(--gold)",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem"
                  }}
                >
                  <div style={{ position: "relative", overflow: "hidden", height: "260px", background: "#050508", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img
                      src={art.image}
                      alt={art.title}
                      style={{ maxHeight: "100%", width: "auto", objectFit: "contain" }}
                    />
                    <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem" }}>
                      <span className="status-badge status-badge--confidential">
                        Private Treaty Only
                      </span>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--ivory)" }}>
                        {art.title}
                      </h3>
                      <span style={{ fontFamily: "var(--font-ui)", color: "var(--gold)", fontSize: "0.85rem" }}>
                        {art.year}
                      </span>
                    </div>
                    <p style={{ fontFamily: "var(--font-ui)", color: "var(--gold-light)", fontSize: "0.85rem", margin: "0.2rem 0" }}>
                      {art.artist}
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", color: "var(--platinum)", fontSize: "0.9rem" }}>
                      {art.medium} · {art.dimensions}
                    </p>
                  </div>

                  <div style={{ background: "rgba(12,12,24,0.7)", padding: "0.8rem", borderLeft: "3px solid var(--gold)" }}>
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.7rem", color: "var(--champagne)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      Archival Provenance:
                    </span>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--ivory)", marginTop: "2px" }}>
                      {art.provenanceSnippet}
                    </p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "0.75rem", borderTop: "1px solid rgba(212,175,55,0.2)" }}>
                    <div>
                      <span style={{ fontSize: "0.7rem", color: "var(--platinum)", textTransform: "uppercase", display: "block" }}>
                        Private Valuation
                      </span>
                      <strong style={{ color: "var(--gold)", fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
                        {art.valuation}
                      </strong>
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={() => {
                          onClose();
                          onSelectArtwork(art);
                        }}
                        style={{
                          background: "transparent",
                          border: "1px solid rgba(212,175,55,0.4)",
                          color: "var(--ivory)",
                          padding: "0.5rem 0.8rem",
                          fontSize: "0.75rem",
                          cursor: "pointer"
                        }}
                      >
                        Inspect Dossier
                      </button>
                      <button
                        className="btn-gold"
                        onClick={() => {
                          onClose();
                          onInquire(art);
                        }}
                        style={{ padding: "0.5rem 0.9rem", fontSize: "0.75rem" }}
                      >
                        Private Treaty Bid
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

