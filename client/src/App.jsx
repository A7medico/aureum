import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import Services from "./components/Services";
import Collection from "./components/Collection";
import ArtworkModal from "./components/ArtworkModal";
import InquiryModal from "./components/InquiryModal";
import PrivateViewingRoom from "./components/PrivateViewingRoom";
import ConciergeModal from "./components/ConciergeModal";
import PatronVaultModal from "./components/PatronVaultModal";
import Journal from "./components/Journal";
import Journey from "./components/Journey";
import Numbers from "./components/Numbers";
import MembershipCTA from "./components/MembershipCTA";
import Footer from "./components/Footer";

export default function App() {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [inquiryArtwork, setInquiryArtwork] = useState(null);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isPVROpen, setIsPVROpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Toast notifier helper
  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  // Scroll reveal observer for elements with [data-reveal]
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -60px 0px", threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selectedArtwork, isConciergeOpen, isPVROpen]);

  // Handler for inquiring directly from Artwork Dossier
  const handleInquireFromArtwork = (art) => {
    setSelectedArtwork(null);
    setInquiryArtwork(art);
  };

  return (
    <div className="aureum-app">
      {/* Navigation */}
      <Navbar
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onOpenVault={() => setIsVaultOpen(true)}
        onOpenPVR={() => setIsPVROpen(true)}
      />

      {/* Hero */}
      <Hero onOpenConcierge={() => setIsConciergeOpen(true)} />

      {/* Philosophy */}
      <Philosophy />

      {/* Three Pillars Services */}
      <Services onOpenConcierge={() => setIsConciergeOpen(true)} />

      {/* Collection Catalog */}
      <Collection
        onSelectArtwork={(art) => setSelectedArtwork(art)}
        onOpenPVR={() => setIsPVROpen(true)}
      />

      {/* Curatorial Monographs / Journal */}
      <Journal onOpenConcierge={() => setIsConciergeOpen(true)} />

      {/* The Aureum Journey */}
      <Journey onOpenConcierge={() => setIsConciergeOpen(true)} />

      {/* Figures & Stats */}
      <Numbers />

      {/* Membership Invitation CTA */}
      <MembershipCTA onOpenConcierge={() => setIsConciergeOpen(true)} />

      {/* Footer */}
      <Footer
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onShowToast={showToast}
      />

      {/* --- Modals & Overlays --- */}

      {/* Artwork Provenance Dossier & "View on Wall" Simulator */}
      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          onInquire={handleInquireFromArtwork}
        />
      )}

      {/* Specific Artwork Acquisition Inquiry */}
      {inquiryArtwork && (
        <InquiryModal
          artwork={inquiryArtwork}
          isOpen={true}
          onClose={() => setInquiryArtwork(null)}
          onShowToast={showToast}
        />
      )}

      {/* Gated Private Viewing Room */}
      <PrivateViewingRoom
        isOpen={isPVROpen}
        onClose={() => setIsPVROpen(false)}
        onSelectArtwork={(art) => setSelectedArtwork(art)}
        onInquire={handleInquireFromArtwork}
      />

      {/* Multi-Step Concierge Application */}
      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        onShowToast={showToast}
      />

      {/* Authenticated VIP Patron Vault */}
      <PatronVaultModal
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        onShowToast={showToast}
      />

      {/* Toast Notification Container */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            <span style={{ color: "var(--gold)" }}>✦</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

