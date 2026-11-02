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

// Middleware
app.use(cors());
app.use(express.json());

// Static images fallback
const clientImagesPath = path.resolve(__dirname, "../../client/public/images");
const rootImagesPath = path.resolve(__dirname, "../../images");
app.use("/images", express.static(clientImagesPath));
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
    environment: process.env.VERCEL ? "vercel-serverless" : "standalone",
    timestamp: new Date().toISOString()
  });
});

export default app;

