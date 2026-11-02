import React, { useState } from "react";
import { X, Check, ArrowRight, ArrowLeft, ShieldCheck, Sparkles, Building, User, Landmark, Briefcase } from "lucide-react";

export default function ConciergeModal({ isOpen, onClose, onShowToast }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submittedRef, setSubmittedRef] = useState(null);

  const [formData, setFormData] = useState({
    patronType: "Private Collector",
    collectingFocus: ["Post-War & Modern Blue-Chip"],
    budgetHorizon: "$1M — $5M",
    fullName: "",
    email: "",
    phone: "",
    jurisdiction: "United Kingdom",
    confidentialNotes: "",
    preferredConsultation: "Geneva / London Salon Meeting"
  });

  if (!isOpen) return null;

  const patronTypes = [
    { id: "Private Collector", title: "Private Collector", sub: "Individual acquisition & legacy curation", icon: <User size={20} /> },
    { id: "Family Office", title: "Single / Multi-Family Office", sub: "Tangible asset allocation & capital preservation", icon: <Building size={20} /> },
    { id: "Foundation / Trustee", title: "Foundation / Museum", sub: "Public placement & institutional loan stewardship", icon: <Landmark size={20} /> },
    { id: "Corporate Entity", title: "Corporate Collection", sub: "Headquarters curation & cultural prestige", icon: <Briefcase size={20} /> }
  ];

  const focusOptions = [
    "Post-War & Modern Blue-Chip",
    "Contemporary Geometric Abstraction",
    "Monumental Sculptural Forms",
    "Private Bespoke Commissions",
    "Early 20th Century Avant-Garde"
  ];

  const budgetOptions = [
    "$500,000 — $1,000,000",
    "$1,000,000 — $5,000,000",
    "$5,000,000 — $20,000,000",
    "$20,000,000+"
  ];

  const handleFocusToggle = (opt) => {
    const exists = formData.collectingFocus.includes(opt);
    let updated;
    if (exists) {
      updated = formData.collectingFocus.filter((f) => f !== opt);
    } else {
      updated = [...formData.collectingFocus, opt];
    }
    setFormData({ ...formData, collectingFocus: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) {
      onShowToast("Please enter your name and confidential email.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setSubmittedRef(data.referenceNumber || "AUR-2024-CONFIDENTIAL");
        onShowToast("Application transmitted to the Curatorial Board.");
      } else {
        onShowToast(data.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      onShowToast("Network error submitting application.");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setSubmittedRef(null);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={resetAndClose}>
      <div className="modal-container" style={{ maxWidth: "720px" }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={resetAndClose} aria-label="Close Concierge">
          <X size={18} />
        </button>

        {submittedRef ? (
          <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
            <div
              style={{
                width: "68px",
                height: "68px",
                margin: "0 auto 1.5rem",
                borderRadius: "50%",
                background: "rgba(212,175,55,0.15)",
                border: "2px solid var(--gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--gold)"
              }}
            >
              <ShieldCheck size={32} />
            </div>

            <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>
              Dossier Transmitted Under Seal
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--ivory)", fontSize: "2.2rem", margin: "0.5rem 0" }}>
              Application Received
            </h2>
            <div className="gold-rule gold-rule--wide" style={{ margin: "1rem auto 1.5rem" }}></div>

            <p style={{ fontFamily: "var(--font-body)", color: "var(--champagne)", fontSize: "1.15rem", lineHeight: "1.7", maxWidth: "520px", margin: "0 auto" }}>
              Thank you, <strong>{formData.fullName}</strong>. Your patron profile has been logged in our registry
              under reference code:
            </p>

            <div style={{ display: "inline-block", background: "rgba(22,22,42,0.8)", border: "1px solid var(--gold)", padding: "0.75rem 1.75rem", margin: "1.5rem auto", fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--gold-light)", letterSpacing: "0.1em" }}>
              {submittedRef}
            </div>

            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.85rem", color: "var(--platinum)", maxWidth: "480px", margin: "0 auto 2rem" }}>
              A Senior Advisory Partner will contact you via {formData.preferredConsultation} within 24 hours to schedule
              your confidential intake conference.
            </p>

            <button className="btn-gold" onClick={resetAndClose} style={{ padding: "0.75rem 2.5rem" }}>
              Return to Gallery
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>
                By Invitation &amp; Vetted Application
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--ivory)", fontSize: "1.85rem", margin: "0.3rem 0" }}>
                Patron Advisory Application
              </h2>
            </div>

            {/* Wizard Steps Indicator */}
            <div className="wizard-progress">
              <div className="wizard-progress-bar" />
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`wizard-step-bubble ${step === s ? "active" : step > s ? "done" : ""}`}
                >
                  {step > s ? <Check size={14} /> : s}
                </div>
              ))}
            </div>

            {/* Step 1: Patron Profile */}
            {step === 1 && (
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", color: "var(--champagne)", fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  Step I: Select Patron Classification
                </h3>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--platinum)", fontSize: "0.95rem", marginBottom: "1.25rem" }}>
                  Please designate the legal or advisory capacity in which you are seeking Aureum representation.
                </p>

                <div className="choice-grid">
                  {patronTypes.map((t) => (
                    <div
                      key={t.id}
                      className={`choice-card ${formData.patronType === t.id ? "selected" : ""}`}
                      onClick={() => setFormData({ ...formData, patronType: t.id })}
                    >
                      <div style={{ color: "var(--gold)", margin: "0 auto 0.4rem" }}>{t.icon}</div>
                      <div className="choice-card-title">{t.title}</div>
                      <div className="choice-card-sub">{t.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Curation Focus */}
            {step === 2 && (
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", color: "var(--champagne)", fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  Step II: Curatorial Focus &amp; Interests
                </h3>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--platinum)", fontSize: "0.95rem", marginBottom: "1.25rem" }}>
                  Select the artistic disciplines or movements relevant to your collection trajectory (select all that apply):
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {focusOptions.map((opt) => {
                    const isSelected = formData.collectingFocus.includes(opt);
                    return (
                      <div
                        key={opt}
                        onClick={() => handleFocusToggle(opt)}
                        style={{
                          background: isSelected ? "rgba(212,175,55,0.18)" : "rgba(22,22,42,0.4)",
                          border: `1px solid ${isSelected ? "var(--gold)" : "rgba(212,175,55,0.2)"}`,
                          padding: "0.8rem 1.2rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          transition: "all 0.2s"
                        }}
                      >
                        <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.9rem", color: "var(--ivory)" }}>
                          {opt}
                        </span>
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            border: "1px solid var(--gold)",
                            borderRadius: "2px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: isSelected ? "var(--gold)" : "transparent"
                          }}
                        >
                          {isSelected && <Check size={14} color="#08080D" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Acquisition Horizon */}
            {step === 3 && (
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", color: "var(--champagne)", fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  Step III: Projected Acquisition Horizon
                </h3>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--platinum)", fontSize: "0.95rem", marginBottom: "1.25rem" }}>
                  Anticipated 24-month capital allocation dedicated to secondary acquisitions, commissions, or private treaty placement:
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {budgetOptions.map((b) => (
                    <div
                      key={b}
                      className={`choice-card ${formData.budgetHorizon === b ? "selected" : ""}`}
                      onClick={() => setFormData({ ...formData, budgetHorizon: b })}
                    >
                      <div className="choice-card-title" style={{ fontSize: "1rem", color: "var(--gold-light)" }}>
                        {b}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="form-group" style={{ marginTop: "1.5rem" }}>
                  <label className="form-label">Preferred Advisory Liaison Channel</label>
                  <select
                    className="form-select"
                    value={formData.preferredConsultation}
                    onChange={(e) => setFormData({ ...formData, preferredConsultation: e.target.value })}
                  >
                    <option value="Geneva / London Salon Meeting">Geneva / London Private Salon</option>
                    <option value="New York Advisory Office">New York Advisory Office (Fifth Avenue)</option>
                    <option value="Encrypted Video Conference">Encrypted Video Conference (Strict NDA)</option>
                    <option value="Private Residence Visit">Private Residence Visit by Senior Partner</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 4: Confidential Contact */}
            {step === 4 && (
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", color: "var(--champagne)", fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  Step IV: Confidential Liaison Details
                </h3>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--platinum)", fontSize: "0.95rem", marginBottom: "1.25rem" }}>
                  All communication is shielded under Swiss banking-grade data isolation protocols.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">Full Legal or Representative Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Alistair Vance"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Direct Confidential Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. liaison@vancetrust.ch"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">Secure Phone / Signal (Optional)</label>
                    <input
                      type="tel"
                      placeholder="+44 20 7946 0912"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Primary Domicile / Jurisdiction</label>
                    <input
                      type="text"
                      placeholder="e.g. London / Zurich / New York"
                      value={formData.jurisdiction}
                      onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Specific Curatorial or Provenance Notes (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Specific artists, historical periods, or tax-efficient acquisition structures desired..."
                    value={formData.confidentialNotes}
                    onChange={(e) => setFormData({ ...formData, confidentialNotes: e.target.value })}
                    className="form-textarea"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(212,175,55,0.2)" }}>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(212,175,55,0.3)",
                    color: "var(--ivory)",
                    padding: "0.6rem 1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.8rem",
                    cursor: "pointer"
                  }}
                >
                  <ArrowLeft size={14} /> Back
                </button>
              ) : <div />}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="btn-gold"
                  style={{ padding: "0.6rem 1.5rem", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
                >
                  Continue <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn-gold"
                  style={{ padding: "0.75rem 2rem", fontSize: "0.85rem" }}
                >
                  {loading ? "Transmitting..." : "Submit Confidential Application"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

