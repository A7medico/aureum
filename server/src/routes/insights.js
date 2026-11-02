import { Router } from "express";
import { db } from "../db/index.js";

const router = Router();

// GET /api/insights - Curatorial monographs & market essays
router.get("/", (req, res) => {
  try {
    const insights = db.getEditorialInsights();
    res.json({ success: true, count: insights.length, data: insights });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/insights/:id
router.get("/:id", (req, res) => {
  try {
    const insight = db.getInsightById(req.params.id);
    if (!insight) {
      return res.status(404).json({ success: false, message: "Monograph not found." });
    }
    res.json({ success: true, data: insight });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

