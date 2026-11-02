import React, { useState } from "react";
import { X, ShieldCheck, Sparkles, Send } from "lucide-react";

export default function InquiryModal({ artwork, isOpen, onClose, onShowToast }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    representation: "Private Patron",
    timeline: "Immediate (30 days)",
    notes: ""
  });

  if (!isOpen || !artwork) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      onShowToast("Please enter your name and email.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artworkId: artwork.id,
          artworkTitle: artwork.title,
          ...formData
        })
      });
      const data = await res.json();

      if (data.success) {
        onShowToast("Private inquiry transmitted to the Senior Advisory desk.");
        onClose();
      } else {
        onShowToast(data.message || "Failed to submit inquiry.");
      }
    } catch (err) {
      onShowToast("Error sending inquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: "580px" }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Inquiry">
          <X size={18} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--gold)", marginBottom: "0.4rem" }}>
          <Sparkles size={14} />
          <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-ui)" }}>
            Confidential Acquisition Inquiry
          </span>
        </div>

        <h2 style={{ fontFamily: "var(--font-display)", color: "var(--ivory)", fontSize: "1.8rem" }}>
          {artwork.title}
        </h2>
        <p style={{ fontFamily: "var(--font-ui)", color: "var(--gold-light)", fontSize: "0.85rem", marginBottom: "1rem" }}>
          {artwork.artist} · Estimated Valuation: <strong>{artwork.valuation}</strong>
        </p>

        <div className="gold-rule" style={{ marginBottom: "1.25rem" }}></div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Collector / Trustee Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confidential Email *</label>
              <input
                type="email"
                required
                placeholder="Direct Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Direct Phone / Signal</label>
              <input
                type="tel"
                placeholder="+44 / +1 / +41..."
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Representation Entity</label>
              <select
                className="form-select"
                value={formData.representation}
                onChange={(e) => setFormData({ ...formData, representation: e.target.value })}
              >
                <option value="Private Patron">Private Patron / Collector</option>
                <option value="Family Office Trustee">Family Office Trustee</option>
                <option value="Museum / Foundation">Museum / Institutional Curator</option>
                <option value="Independent Art Advisor">Independent Art Advisor</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Desired Transaction Timeline</label>
            <select
              className="form-select"
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            >
              <option value="Immediate (30 days)">Immediate Private Treaty (30 days)</option>
              <option value="90-day Due Diligence">90-Day Archival Due Diligence</option>
              <option value="Preliminary Valuation Inquiry">Preliminary Valuation &amp; Condition Report Only</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Confidential Acquisition Notes (Optional)</label>
            <textarea
              rows={2}
              placeholder="Specific inquiries regarding provenance history, condition report or private viewing arrangements..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="form-textarea"
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--platinum)", fontSize: "0.75rem", marginBottom: "1.25rem" }}>
            <ShieldCheck size={14} color="#D4AF37" />
            <span>Protected by Swiss fiduciary discretion &amp; non-disclosure covenants.</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold"
            style={{ width: "100%", padding: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontSize: "0.85rem" }}
          >
            <Send size={15} />
            {loading ? "Transmitting Inquiry..." : "Transmit Acquisition Inquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}

