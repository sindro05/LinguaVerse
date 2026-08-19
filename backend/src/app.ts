import express, { Application } from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import languageRoutes from "./routes/language.routes.js";
import levelRoutes from "./routes/level.routes.js";
import lessonRoutes from "./routes/lesson.routes.js";

const app: Application = express();

// =====================================================
// MIDDLEWARES
// =====================================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// =====================================================
// SWAGGER
// =====================================================

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// =====================================================
// API ROOT
// =====================================================

app.get("/", (_req, res) => {
  res.json({
    message: "Welcome to LinguaVerse API 🚀",
    status: "OK",
  });
});

// =====================================================
// API ROUTES
// =====================================================

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/languages", languageRoutes);

app.use("/api/levels", levelRoutes);

app.use("/api/lessons", lessonRoutes);

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "LinguaVerse API is running",
  });
});

// =====================================================
// 404
// =====================================================

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;