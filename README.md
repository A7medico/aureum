# AUREUM — Private Art Advisory & Collection Curation

> *Where vision meets legacy.*

An exclusive, full-stack private art advisory and digital curation platform built for discerning patrons, family offices, and foundations worldwide. AUREUM curates extraordinary blue-chip acquisitions, bespoke commissions, and generational legacy preservation.

---

## ✨ Features & Architecture

### 🎨 Frontend Experience (`/client`)
- **Editorial Luxury Aesthetic**: Curated obsidian & midnight palette (`#08080D`), gilded champagne gold accents (`#D4AF37`), Art Deco sunbursts, and bespoke typography (*Playfair Display*, *Cormorant Garamond*, *Poiret One*, *Outfit*).
- **Interactive Curated Collection Catalog**: Dynamic filtering by category (Contemporary Geometric, Modern Blue-Chip, Sculptural Works, Private Commissions) and real-time search.
- **Interactive Provenance Dossier & Modal**: Full historical ownership chain, curatorial essays, condition reports, and authentication certificates.
- **"View on Wall" Salon Scale Simulator**: Real-world visualizer rendering artworks against architectural salon backdrops (Obsidian Velvet, Midnight Navy, Warm Limestone) with metric scale references.
- **Gated Private Viewing Room (PVR)**: Passcode-protected access chamber for confidential off-market blue-chip masterpieces *(Demo Passcode: `AUREUM-VIP`)*.
- **Multi-Step Patron Concierge Application**: 4-step intake wizard covering Patron Classification, Curatorial Focus, Acquisition Horizon, and Swiss-grade confidential contact details.
- **Authenticated VIP Patron Vault**: Collector portal with real-time portfolio appraisal ($14.85M, +16.8% YoY), holding registry, and Lloyds insurance certificates *(Demo Login: Lord Harrison Sterling)*.
- **Curatorial Monographs & Journal**: Scholarly research essays on art market dynamics, capital resilience, and conservation science.

### 🏛️ Backend Engine (`/server`)
- **Node.js & Express REST API**: Modular controllers, clean route definitions, CORS handling, and file-backed database storage (`/server/data/store.json`).
- **REST Endpoints**:
  - `GET /api/artworks`: Filterable public collection catalog.
  - `GET /api/artworks/:id`: Detailed provenance dossier and room scale metrics.
  - `POST /api/pvr/unlock`: Passcode verification and confidential inventory release.
  - `POST /api/applications`: Multi-step patron concierge submissions with unique dossier reference IDs.
  - `POST /api/inquiries`: Discreet acquisition inquiries pre-linked to specific artworks.
  - `POST /api/vault/login`: Authenticated patron portfolio access.
  - `GET /api/insights`: Curatorial monographs and market intelligence essays.
  - `GET /api/health`: Core advisory engine status.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Quick Start (Single Command)

From the project root:

```bash
# Run both Backend API and Frontend Dev Server concurrently:
npm run dev
```

Or run them individually:

```bash
# Terminal 1 — Start the Backend Engine (port 5000)
npm run dev:server

# Terminal 2 — Start the Frontend Application (port 3000)
npm run dev:client
```

Open **`http://localhost:3000`** in your browser.

---

## 🔑 Demo Access Credentials

- **Private Viewing Room Passcode**: `AUREUM-VIP` (or click "Insert AUREUM-VIP Key" inside the modal)
- **Patron Vault Demo**: Click "Enter as Lord Harrison Sterling" (or login with `patron@aureum.art` / `legacy2024`)

---

## 📄 License
This project is licensed under the MIT License.
