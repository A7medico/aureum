import { Router } from "express";
import { db } from "../db/index.js";

const router = Router();

// POST /api/applications - Multi-step Patron Concierge Application
router.post("/", (req, res) => {
  try {
    const {
      patronType,
      collectingFocus,
      budgetHorizon,
      fullName,
      email,
      phone,
      jurisdiction,
      confidentialNotes,
      preferredConsultation
    } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({
        success: false,
        message: "Full name and confidential contact email are required."
      });
    }

    const application = db.submitApplication({
      patronType: patronType || "Private Collector",
      collectingFocus: collectingFocus || ["Post-War & Modern Blue-Chip"],
      budgetHorizon: budgetHorizon || "$1M — $5M",
      fullName,
      email,
      phone: phone || "Undisclosed",
      jurisdiction: jurisdiction || "Europe / North America",
      confidentialNotes: confidentialNotes || "Standard membership consideration",
      preferredConsultation: preferredConsultation || "Secure Video Consultation"
    });

    res.status(201).json({
      success: true,
      message: "Application submitted to the Aureum Membership Board.",
      referenceNumber: application.id,
      data: application
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/applications/:refId - Check application status
router.get("/status/:refId", (req, res) => {
  try {
    const application = db.getApplication(req.params.refId);
    if (!application) {
      return res.status(404).json({ success: false, message: "Application reference not found." });
    }
    res.json({ success: true, data: application });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

