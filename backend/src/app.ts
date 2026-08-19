import express from "express";
import cors from "cors";
import helmet from "helmet";

import { prisma } from "./config/prisma.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// API root
app.get("/", (_req, res) => {
  res.json({
    message: "Welcome to LinguaVerse API 🚀",
    status: "OK",
  });
});

// Database health check
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

// Authentication
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app;