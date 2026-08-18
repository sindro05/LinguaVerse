import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";

import { prisma } from "./config/prisma.js";

const app = express();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Test API
app.get("/", (_req, res) => {
  res.json({
    message: "Welcome to LinguaVerse API 🚀",
    status: "OK",
  });
});

// Test PostgreSQL + Prisma
app.get("/api/health/db", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: "OK",
      database: "connected",
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      status: "ERROR",
      database: "disconnected",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 LinguaVerse API running on http://localhost:${PORT}`);
});