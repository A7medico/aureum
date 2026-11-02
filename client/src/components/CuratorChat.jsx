import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Shield, User, Bot } from "lucide-react";

export default function CuratorChat({ onOpenConcierge, onOpenPVR, onSelectArtworkId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "curator",
      text: "Good day. I am Lady Sterling's advisory liaison at Aureum. How may I discreetly assist your collection aspirations today?"
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const cannedAnswers = {
    freeport: "Aureum holds bonded vault status in the Geneva and Luxembourg FreePorts. Acquisitions can be transacted and stored indefinitely under suspended customs tariffs and VAT, with 24/7 biometric isolation and climate logging (20°C, 50% RH).",
    fees: "Our advisory fee structure operates on a transparent fiduciary percentage model (typically 3%–5% upon successful private treaty acquisition), fully creditable against due diligence and physical inspection expenses.",
    viewing: "Private viewings are arranged strictly under non-disclosure protocol at our London Mayfair, Geneva, or New York Fifth Avenue salons. You may schedule a private consultation anytime using our Patron Application.",
    convergence: "'Convergence' (Émile Vaneau, 2024) is a museum-grade geometric composition combining pulverized emerald pigment with hand-beaten 24k gold leaf. It is currently offered privately under exclusive secondary mandate."
  };

  const chips = [
    { label: "FreePort Custody", key: "freeport" },
    { label: "Advisory Fee Model", key: "fees" },
    { label: "Private Viewing Protocol", key: "viewing" },
    { label: "Inquire on 'Convergence'", key: "convergence" }
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");

    // Simulate curator response
    setTimeout(() => {
      let reply = "Thank you for your inquiry. A Senior Advisory Partner has noted your question and is available for a direct confidential telephone or salon briefing.";
      const lower = query.toLowerCase();

      if (lower.includes("freeport") || lower.includes("tax") || lower.includes("storage")) {
        reply = cannedAnswers.freeport;
      } else if (lower.includes("fee") || lower.includes("cost") || lower.includes("commission")) {
        reply = cannedAnswers.fees;
      } else if (lower.includes("view") || lower.includes("salon") || lower.includes("appointment")) {
        reply = cannedAnswers.viewing;
      } else if (lower.includes("convergence") || lower.includes("emerald")) {
        reply = cannedAnswers.convergence;
      }

      setMessages((prev) => [...prev, { sender: "curator", text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div style={{ position: "fixed", bottom: "2rem", left: "2rem", zIndex: 900 }}>
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            style={{
              background: "rgba(12,12,24,0.92)",
              border: "1px solid var(--gold)",
              color: "var(--gold-light)",
              padding: "0.75rem 1.4rem",
              borderRadius: "30px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(212,175,55,0.25)",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "var(--font-ui)",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.3s var(--ease-elegant)"
            }}
          >
            <Sparkles size={15} color="#D4AF37" />
            <span>Advisory Concierge</span>
          </button>
        ) : null}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            left: "2rem",
            width: "380px",
            height: "520px",
            background: "#0c0c18",
            border: "1px solid var(--gold)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.9), 0 0 30px rgba(212,175,55,0.2)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "fadeIn 0.3s ease"
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(90deg, #16162a 0%, #0c0c18 100%)",
              borderBottom: "1px solid rgba(212,175,55,0.3)",
              padding: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  border: "1px solid var(--gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(212,175,55,0.15)",
                  color: "var(--gold)"
                }}
              >
                <Shield size={16} />
              </div>
              <div>
                <strong style={{ fontFamily: "var(--font-display)", color: "var(--ivory)", fontSize: "0.95rem", display: "block" }}>
                  AUREUM Advisory Desk
                </strong>
                <span style={{ fontSize: "0.65rem", color: "#34d399", fontFamily: "var(--font-ui)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  ● Confidential Active Liaison
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ background: "transparent", border: "none", color: "var(--platinum)", cursor: "pointer" }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Body */}
          <div
            style={{
              flex: 1,
              padding: "1rem",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
              background: "radial-gradient(circle at 50% 10%, #141424 0%, #08080e 100%)"
            }}
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  background: m.sender === "user" ? "rgba(212,175,55,0.18)" : "rgba(22,22,42,0.8)",
                  border: `1px solid ${m.sender === "user" ? "var(--gold)" : "rgba(212,175,55,0.2)"}`,
                  padding: "0.75rem 1rem",
                  color: "var(--ivory)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  lineHeight: "1.5"
                }}
              >
                {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Chips */}
          <div style={{ padding: "0.5rem 0.8rem", background: "rgba(10,10,18,0.9)", borderTop: "1px solid rgba(212,175,55,0.15)", display: "flex", gap: "0.35rem", overflowX: "auto" }}>
            {chips.map((c) => (
              <button
                key={c.key}
                onClick={() => handleSend(cannedAnswers[c.key])}
                style={{
                  whiteSpace: "nowrap",
                  background: "rgba(22,22,42,0.6)",
                  border: "1px solid rgba(212,175,55,0.25)",
                  color: "var(--champagne)",
                  padding: "0.3rem 0.6rem",
                  fontSize: "0.7rem",
                  fontFamily: "var(--font-ui)",
                  cursor: "pointer"
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{ padding: "0.75rem", background: "#0c0c18", borderTop: "1px solid rgba(212,175,55,0.25)", display: "flex", gap: "0.5rem" }}
          >
            <input
              type="text"
              placeholder="Ask an advisory question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                background: "rgba(18,18,32,0.8)",
                border: "1px solid rgba(212,175,55,0.3)",
                padding: "0.5rem 0.75rem",
                color: "var(--ivory)",
                fontSize: "0.85rem",
                fontFamily: "var(--font-ui)",
                outline: "none"
              }}
            />
            <button
              type="submit"
              className="btn-gold"
              style={{ padding: "0.5rem 0.85rem", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
