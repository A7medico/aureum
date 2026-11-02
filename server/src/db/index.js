import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  initialArtworks,
  privateViewingRoomArtworks,
  editorialInsights,
  demoPatronVault
} from "./seedData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, "../../data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial state
const defaultStore = {
  artworks: initialArtworks,
  pvrArtworks: privateViewingRoomArtworks,
  editorialInsights: editorialInsights,
  patronVault: demoPatronVault,
  inquiries: [],
  applications: [],
  pvrTokens: ["AUREUM-VIP", "PATRON2024", "LEGACY", "CURATOR-EXCLUSIVE"]
};

// Load or initialize store
function loadStore() {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const content = fs.readFileSync(STORE_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error("Failed to read store.json, re-initializing:", err.message);
  }
  saveStore(defaultStore);
  return defaultStore;
}

function saveStore(data) {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write to store.json:", err.message);
  }
}

let store = loadStore();

export const db = {
  getArtworks: ({ category, status, query } = {}) => {
    let list = [...store.artworks];
    if (category && category !== "all") {
      list = list.filter((art) => art.category.toLowerCase() === category.toLowerCase());
    }
    if (status && status !== "all") {
      list = list.filter((art) => art.statusType === status);
    }
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (art) =>
          art.title.toLowerCase().includes(q) ||
          art.artist.toLowerCase().includes(q) ||
          art.medium.toLowerCase().includes(q)
      );
    }
    return list;
  },

  getArtworkById: (id) => {
    // Check public list first, then PVR list
    const foundPublic = store.artworks.find((a) => a.id === id);
    if (foundPublic) return foundPublic;
    return store.pvrArtworks.find((a) => a.id === id) || null;
  },

  verifyPVRAccess: (passcode) => {
    if (!passcode) return false;
    const clean = passcode.trim().toUpperCase();
    return store.pvrTokens.includes(clean);
  },

  getPVRArtworks: () => {
    return store.pvrArtworks;
  },

  submitInquiry: (data) => {
    const inquiry = {
      id: `INQ-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: "Under Review by Senior Advisory",
      ...data
    };
    store.inquiries.unshift(inquiry);
    saveStore(store);
    return inquiry;
  },

  getInquiries: () => {
    return store.inquiries;
  },

  submitApplication: (data) => {
    const refCode = `AUR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const application = {
      id: refCode,
      createdAt: new Date().toISOString(),
      status: "Vetted — In Curatorial Review",
      ...data
    };
    store.applications.unshift(application);
    saveStore(store);
    return application;
  },

  getApplication: (refCode) => {
    return store.applications.find((a) => a.id === refCode) || null;
  },

  getEditorialInsights: () => {
    return store.editorialInsights;
  },

  getInsightById: (id) => {
    return store.editorialInsights.find((i) => i.id === id) || null;
  },

  authenticatePatronVault: (email, password) => {
    // Demo credentials: patron@aureum.art / legacy2024 or demo button
    if (
      (email === "patron@aureum.art" && password === "legacy2024") ||
      password === "demo"
    ) {
      return store.patronVault;
    }
    return null;
  },

  getPatronVault: () => {
    return store.patronVault;
  }
};

