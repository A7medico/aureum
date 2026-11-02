import { Router } from "express";
import { db } from "../db/index.js";

const router = Router();

// POST /api/vault/login - Patron Vault Authentication
router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const vault = db.authenticatePatronVault(email, password);

    if (!vault) {
      return res.status(401).json({
        success: false,
        message: "Invalid Patron credentials. Please contact your Senior Advisory Liaison or use the Demo Access."
      });
    }

    res.json({
      success: true,
      message: "Welcome to your Aureum Patron Vault.",
      sessionToken: `VAULT-SESSION-${Date.now()}`,
      vault
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/vault - Fetch current patron vault
router.get("/portfolio", (req, res) => {
  try {
    const vault = db.getPatronVault();
    res.json({ success: true, vault });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

