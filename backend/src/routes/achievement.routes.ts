import { Router } from "express";
import {
  createAchievementController,
  getAllAchievementsController,
  getAchievementByIdController,
  updateAchievementController,
  deleteAchievementController,
} from "../controllers/achievement.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/achievements:
 *   post:
 *     tags: [Achievements]
 *     summary: Create an achievement (admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAchievementRequest'
 *     responses:
 *       201: { description: Achievement created successfully }
 *       401: { description: Authentication required }
 *       403: { description: Admin access required }
 *       409: { description: Achievement name already exists }
 *   get:
 *     tags: [Achievements]
 *     summary: Get all achievements
 *     responses:
 *       200: { description: Achievements retrieved successfully }
 */
router.post("/", authenticate, requireAdmin, createAchievementController);
router.get("/", getAllAchievementsController);

/**
 * @swagger
 * /api/achievements/{id}:
 *   get:
 *     tags: [Achievements]
 *     summary: Get an achievement by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Achievement retrieved successfully }
 *       404: { description: Achievement not found }
 *   put:
 *     tags: [Achievements]
 *     summary: Update an achievement (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAchievementRequest'
 *     responses:
 *       200: { description: Achievement updated successfully }
 *       401: { description: Authentication required }
 *       403: { description: Admin access required }
 *       404: { description: Achievement not found }
 *   delete:
 *     tags: [Achievements]
 *     summary: Delete an achievement (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Achievement deleted successfully }
 *       401: { description: Authentication required }
 *       403: { description: Admin access required }
 *       404: { description: Achievement not found }
 */
router.get("/:id", getAchievementByIdController);
router.put("/:id", authenticate, requireAdmin, updateAchievementController);
router.delete("/:id", authenticate, requireAdmin, deleteAchievementController);

export default router;