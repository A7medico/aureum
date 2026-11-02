import { Router } from "express";
import { db } from "../db/index.js";

const router = Router();

// GET /api/artworks - list public artworks with optional category and search
router.get("/", (req, res) => {
  try {
    const { category, status, query } = req.query;
    const artworks = db.getArtworks({ category, status, query });
    res.json({
      success: true,
      count: artworks.length,
      data: artworks
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/artworks/:id - full provenance and specs
router.get("/:id", (req, res) => {
  try {
    const artwork = db.getArtworkById(req.params.id);
    if (!artwork) {
      return res.status(404).json({ success: false, message: "Artwork not found in Aureum archives" });
    }
    res.json({
      success: true,
      data: artwork
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

