import { Router } from "express";
import { db } from "../db/index.js";

const router = Router();

// POST /api/inquiries - Submit private inquiry for specific artwork
router.post("/", (req, res) => {
  try {
    const { artworkId, artworkTitle, name, email, phone, representation, notes, timeline } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Patron name and email are mandatory." });
    }

    const inquiry = db.submitInquiry({
      artworkId,
      artworkTitle,
      name,
      email,
      phone: phone || "Confidential",
      representation: representation || "Private Individual",
      notes: notes || "Expressed acquisition interest",
      timeline: timeline || "Immediate (30-60 days)"
    });

    res.status(201).json({
      success: true,
      message: "Your inquiry has been received with strict discretion. A Senior Advisory Partner will contact you within 24 hours.",
      data: inquiry
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/inquiries - List all inquiries (internal advisory view)
router.get("/", (req, res) => {
  try {
    const inquiries = db.getInquiries();
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

