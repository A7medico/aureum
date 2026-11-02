import React, { useState } from "react";
import { X, ShieldCheck, Lock, LogOut, TrendingUp, Award, FileCheck2, Building2 } from "lucide-react";

export default function PatronVaultModal({ isOpen, onClose, onShowToast }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [vaultData, setVaultData] = useState(null);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/vault/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.success) {
        setIsLoggedIn(true);
        setVaultData(data.vault);
        onShowToast("Welcome back to your Private Patron Vault.");
      } else {
        onShowToast(data.message || "Invalid patron credentials.");
      }
    } catch (err) {
      onShowToast("Unable to connect to Vault security host.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail("patron@aureum.art");
    setPassword("legacy2024");
    try {
      setLoading(true);
      const res = await fetch("/api/vault/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "patron@aureum.art", password: "legacy2024" })
      });
      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true);
        setVaultData(data.vault);
        onShowToast("Patron Vault Authenticated: Lord Harrison Sterling");
      }
    } catch (err) {
      onShowToast("Vault connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setVaultData(null);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: isLoggedIn ? "1100px" : "540px" }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Vault">
          <X size={18} />
        </button>

        {!isLoggedIn ? (
          <div style={{ textAlign: "center", padding: "1rem" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                margin: "0 auto 1.25rem",
                borderRadius: "50%",
                background: "rgba(212,175,55,0.12)",
                border: "1px solid var(--gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--gold)"
              }}
            >
              <ShieldCheck size={28} />
            </div>

            <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>
              Authenticated Patron Portal
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--ivory)", fontSize: "2rem", margin: "0.4rem 0" }}>
              The Patron Vault
            </h2>
            <div className="gold-rule gold-rule--wide" style={{ margin: "1rem auto 1.5rem" }}></div>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--champagne)", fontSize: "1.05rem", lineHeight: "1.6", maxWidth: "420px", margin: "0 auto 1.5rem" }}>
              Private access for active collection patrons. Inspect certified holdings,
              annual insurance appraisals, and confidential storage receipts.
            </p>

            <form onSubmit={handleLogin} style={{ maxWidth: "380px", margin: "0 auto" }}>
              <div className="form-group" style={{ textAlign: "left" }}>
                <label className="form-label">Patron Identifier / Email</label>
                <input
                  type="email"
                  required
                  placeholder="patron@aureum.art"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ textAlign: "left", marginBottom: "1.5rem" }}>
                <label className="form-label">Confidential Passkey</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold"
                style={{ width: "100%", padding: "0.85rem", fontSize: "0.85rem" }}
              >
                {loading ? "Decrypting Vault..." : "Sign In to Vault"}
              </button>

              <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid rgba(212,175,55,0.15)" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--platinum)" }}>Instant Demonstration: </span>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--gold)",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    fontWeight: 600
                  }}
                >
                  Enter as Lord Harrison Sterling (Demo)
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            {/* Header when logged in */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <div>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }}>
                  {vaultData.patron.memberTier} · {vaultData.patron.accountNumber}
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", color: "var(--ivory)", fontSize: "2rem", marginTop: "0.2rem" }}>
                  {vaultData.patron.name}
                </h2>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.8rem", color: "var(--platinum)" }}>
                  Senior Advisory Liaison: <span style={{ color: "var(--champagne)" }}>{vaultData.patron.liaison}</span>
                </p>
              </div>

              <button
                onClick={handleLogout}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(212,175,55,0.3)",
                  color: "var(--platinum)",
                  padding: "0.4rem 0.8rem",
                  fontSize: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  cursor: "pointer"
                }}
              >
                <LogOut size={13} /> Log Out
              </button>
            </div>

            {/* Metrics Bar */}
            <div className="vault-header-bar">
              <div className="vault-stat-item">
                <span className="vault-stat-label">Total Portfolio Value</span>
                <div className="vault-stat-val">{vaultData.patron.totalPortfolioValue}</div>
                <span className="vault-stat-sub">Independent Appraisal Sept 2024</span>
              </div>
              <div className="vault-stat-item">
                <span className="vault-stat-label">Compound Appreciation</span>
                <div className="vault-stat-val" style={{ color: "#34d399" }}>
                  {vaultData.patron.annualAppreciation}
                </div>
                <span className="vault-stat-sub">Across 4 holdings</span>
              </div>
              <div className="vault-stat-item">
                <span className="vault-stat-label">Insurance Underwriter</span>
                <div className="vault-stat-val" style={{ fontSize: "1.1rem", marginTop: "4px" }}>
                  Lloyd's Syndicate #4401
                </div>
                <span className="vault-stat-sub">Full All-Risk Transit &amp; Hang</span>
              </div>
            </div>

            <h3 style={{ fontFamily: "var(--font-display)", color: "var(--ivory)", fontSize: "1.4rem", marginBottom: "1rem" }}>
              Curated Holdings &amp; Condition Registry
            </h3>

            {/* Holdings Table */}
            <div style={{ overflowX: "auto" }}>
              <table className="vault-art-table">
                <thead>
                  <tr>
                    <th>Artwork &amp; Artist</th>
                    <th>Acquisition</th>
                    <th>Appraisal (2024)</th>
                    <th>Appreciation</th>
                    <th>Location / Curation</th>
                    <th>Certification</th>
                  </tr>
                </thead>
                <tbody>
                  {vaultData.acquisitions.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <strong style={{ color: "var(--ivory)", display: "block" }}>{item.title}</strong>
                        <span style={{ fontSize: "0.75rem", color: "var(--gold)" }}>{item.artist} ({item.year})</span>
                      </td>
                      <td>
                        <span>{item.acquisitionPrice}</span>
                        <span style={{ display: "block", fontSize: "0.75rem", color: "var(--platinum)" }}>Year: {item.acquisitionYear}</span>
                      </td>
                      <td>
                        <strong style={{ color: "var(--gold-light)" }}>{item.currentAppraisal}</strong>
                      </td>
                      <td>
                        <span style={{ color: "#34d399", fontWeight: 600 }}>{item.appreciation}</span>
                      </td>
                      <td>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <Building2 size={13} style={{ color: "var(--gold)" }} />
                          {item.location}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "var(--platinum)" }}>
                          {item.conservationStatus}
                        </span>
                      </td>
                      <td>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", color: "var(--champagne)", fontSize: "0.75rem" }}>
                          <FileCheck2 size={13} color="#D4AF37" />
                          {item.insuranceCert}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid rgba(212,175,55,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--platinum)" }}>
                Next scheduled physical audit: November 18, 2024 · Geneva FreePort Atelier
              </span>
              <button
                className="btn-gold"
                style={{ padding: "0.5rem 1.25rem", fontSize: "0.75rem" }}
                onClick={() => onShowToast("Generating encrypted PDF provenance certificate...")}
              >
                Export Cryptographic Provenance Ledger
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

