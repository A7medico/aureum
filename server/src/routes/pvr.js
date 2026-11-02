import { Router } from "express";
import { db } from "../db/index.js";

const router = Router();

// POST /api/pvr/unlock - Validate passcode and return exclusive pieces
router.post("/unlock", (req, res) => {
  try {
    const { passcode } = req.body;
    if (!passcode) {
      return res.status(400).json({ success: false, message: "A confidential access passcode is required." });
    }

    const isValid = db.verifyPVRAccess(passcode);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired access token. Contact your Senior Advisory liaison for entry."
      });
    }

    const privateArtworks = db.getPVRArtworks();
    res.json({
      success: true,
      message: "Access granted to AUREUM Private Viewing Room.",
      token: `PVR-SESSION-${Date.now()}`,
      data: privateArtworks
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/pvr/artworks - Direct fetch if authenticated
router.get("/artworks", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.includes("PVR-SESSION")) {
      return res.status(401).json({ success: false, message: "Unauthorized viewing session." });
    }
    const privateArtworks = db.getPVRArtworks();
    res.json({
      success: true,
      data: privateArtworks
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

