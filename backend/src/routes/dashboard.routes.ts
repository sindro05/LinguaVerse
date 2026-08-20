import { Router } from "express";
import { getDashboardController } from "../controllers/dashboard.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/dashboard/{userId}:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get the aggregated dashboard data for a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardResponse'
 *       404: { description: User not found }
 */
router.get("/:userId", authenticate, getDashboardController);

export default router;