import express, { Application } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import languageRoutes from "./routes/language.routes.js";
import levelRoutes from "./routes/level.routes.js";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/languages", languageRoutes);
app.use("/api/levels", levelRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "LinguaVerse API is running" });
});

export default app;