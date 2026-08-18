import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Test route
app.get("/", (_req, res) => {
  res.json({
    message: "Welcome to LinguaVerse API 🚀",
    status: "OK"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 LinguaVerse API running on http://localhost:${PORT}`);
});