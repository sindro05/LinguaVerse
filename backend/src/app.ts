import express, { Application } from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import languageRoutes from "./routes/language.routes.js";
import levelRoutes from "./routes/level.routes.js";
import lessonRoutes from "./routes/lesson.routes.js";
import vocabularyRoutes from "./routes/vocabulary.routes.js";
import exerciseRoutes from "./routes/exercise.routes.js";
import exerciseOptionRoutes from "./routes/exerciseOption.routes.js";
import lessonProgressRoutes from "./routes/lessonProgress.routes.js";
import exerciseAttemptRoutes from "./routes/exercise-attempt.routes.js";
import vocabularyProgressRoutes from "./routes/vocabularyProgress.routes.js";
import achievementRoutes from "./routes/achievement.routes.js";
import userAchievementRoutes from "./routes/userAchievement.routes.js";
import userStreakRoutes from "./routes/userStreak.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

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

app.use("/api/vocabulary", vocabularyRoutes);

app.use("/api/exercises", exerciseRoutes);

app.use("/api/exercise-options", exerciseOptionRoutes);

app.use("/api/lesson-progress", lessonProgressRoutes);

app.use("/api/exercise-attempts", exerciseAttemptRoutes);

app.use("/api/vocabulary-progress", vocabularyProgressRoutes);

app.use("/api/achievements", achievementRoutes);

app.use("/api/user-achievements", userAchievementRoutes);

app.use("/api/streaks", userStreakRoutes);

app.use("/api/dashboard", dashboardRoutes);

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