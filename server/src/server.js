import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import artworksRoutes from "./routes/artworks.js";
import pvrRoutes from "./routes/pvr.js";
import inquiriesRoutes from "./routes/inquiries.js";
import applicationsRoutes from "./routes/applications.js";
import vaultRoutes from "./routes/vault.js";
import insightsRoutes from "./routes/insights.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve images statically from client/public/images or root images
const publicImagesPath = path.resolve(__dirname, "../../client/public/images");
const rootImagesPath = path.resolve(__dirname, "../../images");
app.use("/images", express.static(publicImagesPath));
app.use("/images", express.static(rootImagesPath));

// API Routes
app.use("/api/artworks", artworksRoutes);
app.use("/api/pvr", pvrRoutes);
app.use("/api/inquiries", inquiriesRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/vault", vaultRoutes);
app.use("/api/insights", insightsRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    brand: "AUREUM Private Art Advisory",
    system: "Core Advisory Engine v2.0",
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found in Aureum API registry." });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err);
  res.status(500).json({ success: false, message: "Internal Curatorial Server Error." });
});

app.listen(PORT, () => {
  console.log(`✨ AUREUM Core Advisory Engine listening at http://localhost:${PORT}`);
});

