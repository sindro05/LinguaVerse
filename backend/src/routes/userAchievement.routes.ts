import { Router } from "express";
import {
  unlockAchievementController,
  getUserAchievementsController,
  getAchievementUnlockersController,
  checkUserAchievementController,
  revokeAchievementController,
} from "../controllers/userAchievement.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";
import { requireOwnership } from "../middleware/ownership.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/user-achievements:
 *   post:
 *     tags: [User Achievements]
 *     summary: Unlock an achievement for a user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UnlockAchievementRequest'
 *     responses:
 *       201: { description: Achievement unlocked successfully }
 *       401: { description: Authentication required }
 *       403: { description: You can only unlock achievements for yourself }
 *       404: { description: Achievement not found }
 *       409: { description: Achievement already unlocked }
 */
router.post(
  "/",
  authenticate,
  requireOwnership("body", "userId"),
  unlockAchievementController
);

/**
 * @swagger
 * /api/user-achievements/user/{userId}:
 *   get:
 *     tags: [User Achievements]
 *     summary: Get all achievements unlocked by a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Achievements retrieved successfully }
 *       401: { description: Authentication required }
 *       403: { description: You can only access your own data }
 */
router.get(
  "/user/:userId",
  authenticate,
  requireOwnership("params", "userId"),
  getUserAchievementsController
);

/**
 * @swagger
 * /api/user-achievements/user/{userId}/achievement/{achievementId}:
 *   get:
 *     tags: [User Achievements]
 *     summary: Check whether a user has unlocked a specific achievement
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: achievementId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Check result returned successfully }
 *       401: { description: Authentication required }
 *       403: { description: You can only access your own data }
 */
router.get(
  "/user/:userId/achievement/:achievementId",
  authenticate,
  requireOwnership("params", "userId"),
  checkUserAchievementController
);

/**
 * @swagger
 * /api/user-achievements/achievement/{achievementId}:
 *   get:
 *     tags: [User Achievements]
 *     summary: Get all users who unlocked a specific achievement (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: achievementId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Unlockers retrieved successfully }
 *       401: { description: Authentication required }
 *       403: { description: Admin access required }
 */
router.get(
  "/achievement/:achievementId",
  authenticate,
  requireAdmin,
  getAchievementUnlockersController
);

/**
 * @swagger
 * /api/user-achievements/{id}:
 *   delete:
 *     tags: [User Achievements]
 *     summary: Revoke a user achievement (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Achievement revoked successfully }
 *       401: { description: Authentication required }
 *       403: { description: Admin access required }
 *       404: { description: User achievement not found }
 */
router.delete("/:id", authenticate, requireAdmin, revokeAchievementController);

export default router;