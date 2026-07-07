import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fallback = JSON.parse(
  readFileSync(path.join(__dirname, "data", "content.json"), "utf-8")
);

const app = express();
app.use(cors());
app.use(express.json());

/* ---------- MongoDB (optional — falls back to JSON) ---------- */

let dbReady = false;

const songSchema = new mongoose.Schema({
  slug: String, titleSi: String, titleEn: String, year: String, tone: Number, note: String,
});
const albumSchema = new mongoose.Schema({
  slug: String, titleSi: String, titleEn: String, year: String, tone: Number,
});
const messageSchema = new mongoose.Schema(
  { name: String, email: String, message: String },
  { timestamps: true }
);

const Song = mongoose.model("Song", songSchema);
const Album = mongoose.model("Album", albumSchema);
const Message = mongoose.model("Message", messageSchema);

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log("ℹ  No MONGODB_URI set — serving JSON fallback data.");
    return;
  }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 4000 });
    dbReady = true;
    console.log("✔  MongoDB connected");
    // Seed if empty
    if ((await Song.countDocuments()) === 0) {
      await Song.insertMany(fallback.songs);
      await Album.insertMany(fallback.albums);
      console.log("✔  Seeded songs & albums from content.json");
    }
  } catch (err) {
    console.log("⚠  MongoDB unavailable (" + err.message + ") — using JSON fallback.");
  }
}
connectDB();

/* ---------- API routes ---------- */

app.get("/api/health", (_req, res) =>
  res.json({ ok: true, db: dbReady ? "mongodb" : "json-fallback" })
);

app.get("/api/songs", async (_req, res) => {
  const songs = dbReady ? await Song.find().lean() : fallback.songs;
  res.json(songs);
});

app.get("/api/albums", async (_req, res) => {
  const albums = dbReady ? await Album.find().lean() : fallback.albums;
  res.json(albums);
});

app.get("/api/timeline", (_req, res) => res.json(fallback.timeline));
app.get("/api/catalog", (_req, res) => res.json(fallback.catalog));
app.get("/api/gallery", (_req, res) => res.json(fallback.gallery));
app.get("/api/concerts", (_req, res) => res.json(fallback.concerts));

app.post("/api/messages", async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email and message are required" });
  }
  if (dbReady) {
    const saved = await Message.create({ name, email, message });
    return res.status(201).json({ ok: true, id: saved._id });
  }
  console.log("📩 Message (not persisted — no DB):", { name, email, message });
  res.status(201).json({ ok: true, persisted: false });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🎙  Kapuge API running at http://localhost:${PORT}`)
);
