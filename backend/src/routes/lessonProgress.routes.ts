import { Router } from "express";

import {
  createLessonProgressController,
  getAllLessonProgressController,
  getLessonProgressByIdController,
  getLessonProgressByUserController,
  getLessonProgressByLessonController,
  getUserLessonProgressController,
  updateLessonProgressController,
  deleteLessonProgressController,
} from "../controllers/lessonProgress.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";
import { requireOwnership } from "../middleware/ownership.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/lesson-progress:
 *   post:
 *     summary: Create lesson progress
 *     tags:
 *       - Lesson Progress
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLessonProgressRequest'
 *     responses:
 *       201:
 *         description: Lesson progress created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Authentication required
 *       403:
 *         description: You can only create progress for yourself
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  authenticate,
  requireOwnership("body", "userId"),
  createLessonProgressController
);

/**
 * @swagger
 * /api/lesson-progress:
 *   get:
 *     summary: Get all lesson progress (admin only)
 *     tags:
 *       - Lesson Progress
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lesson progress retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 */
router.get(
  "/",
  authenticate,
  requireAdmin,
  getAllLessonProgressController
);

/**
 * @swagger
 * /api/lesson-progress/user/{userId}:
 *   get:
 *     summary: Get all lesson progress for a user
 *     tags:
 *       - Lesson Progress
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: cm123user
 *     responses:
 *       200:
 *         description: User lesson progress retrieved successfully
 *       400:
 *         description: User ID is required
 *       401:
 *         description: Authentication required
 *       403:
 *         description: You can only access your own data
 */
router.get(
  "/user/:userId",
  authenticate,
  requireOwnership("params", "userId"),
  getLessonProgressByUserController
);

/**
 * @swagger
 * /api/lesson-progress/lesson/{lessonId}:
 *   get:
 *     summary: Get all users' progress for a lesson (admin only)
 *     tags:
 *       - Lesson Progress
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *         example: cm123lesson
 *     responses:
 *       200:
 *         description: Lesson progress retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 */
router.get(
  "/lesson/:lessonId",
  authenticate,
  requireAdmin,
  getLessonProgressByLessonController
);

/**
 * @swagger
 * /api/lesson-progress/user/{userId}/lesson/{lessonId}:
 *   get:
 *     summary: Get a user's progress for a specific lesson
 *     tags:
 *       - Lesson Progress
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Progress retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: You can only access your own data
 *       404:
 *         description: Progress not found
 */
router.get(
  "/user/:userId/lesson/:lessonId",
  authenticate,
  requireOwnership("params", "userId"),
  getUserLessonProgressController
);

/**
 * @swagger
 * /api/lesson-progress/{id}:
 *   get:
 *     summary: Get lesson progress by ID
 *     tags:
 *       - Lesson Progress
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cm123progress
 *     responses:
 *       200:
 *         description: Progress retrieved successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Progress not found
 */
router.get(
  "/:id",
  authenticate,
  getLessonProgressByIdController
);

/**
 * @swagger
 * /api/lesson-progress/{id}:
 *   put:
 *     summary: Update lesson progress
 *     tags:
 *       - Lesson Progress
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cm123progress
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateLessonProgressRequest'
 *     responses:
 *       200:
 *         description: Progress updated successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Progress not found
 */
router.put(
  "/:id",
  authenticate,
  updateLessonProgressController
);

/**
 * @swagger
 * /api/lesson-progress/{id}:
 *   delete:
 *     summary: Delete lesson progress
 *     tags:
 *       - Lesson Progress
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cm123progress
 *     responses:
 *       200:
 *         description: Progress deleted successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Progress not found
 */
router.delete(
  "/:id",
  authenticate,
  deleteLessonProgressController
);

export default router;