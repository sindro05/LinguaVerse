import { Router } from "express";
import {
  recordActivityController,
  getUserStreakController,
  getStreakLeaderboardController,
  resetUserStreakController,
} from "../controllers/userStreak.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";
import { requireOwnership } from "../middleware/ownership.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/streaks/activity:
 *   post:
 *     tags: [User Streaks]
 *     summary: Record daily activity for a user (updates or creates their streak)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecordActivityRequest'
 *     responses:
 *       200: { description: Activity recorded successfully }
 *       401: { description: Authentication required }
 *       403: { description: You can only record activity for yourself }
 */
router.post(
  "/activity",
  authenticate,
  requireOwnership("body", "userId"),
  recordActivityController
);

/**
 * @swagger
 * /api/streaks/leaderboard:
 *   get:
 *     tags: [User Streaks]
 *     summary: Get the top streak leaderboard
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200: { description: Leaderboard retrieved successfully }
 */
router.get("/leaderboard", getStreakLeaderboardController);

/**
 * @swagger
 * /api/streaks/{userId}:
 *   get:
 *     tags: [User Streaks]
 *     summary: Get a user's streak
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Streak retrieved successfully }
 *       401: { description: Authentication required }
 *       403: { description: You can only access your own data }
 *       404: { description: Streak not found }
 */
router.get(
  "/:userId",
  authenticate,
  requireOwnership("params", "userId"),
  getUserStreakController
);

/**
 * @swagger
 * /api/streaks/{userId}/reset:
 *   put:
 *     tags: [User Streaks]
 *     summary: Reset a user's current streak (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Streak reset successfully }
 *       401: { description: Authentication required }
 *       403: { description: Admin access required }
 *       404: { description: Streak not found }
 */
router.put(
  "/:userId/reset",
  authenticate,
  requireAdmin,
  resetUserStreakController
);

export default router;