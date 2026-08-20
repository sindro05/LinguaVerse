import { Router } from "express";
import {
  reviewVocabulary,
  getProgressByUser,
  getProgressByVocabulary,
  getProgressForUserAndWord,
  getDueForUser,
  getProgressById,
  removeProgress,
} from "../controllers/vocabularyProgress.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";
import { requireOwnership } from "../middleware/ownership.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/vocabulary-progress:
 *   post:
 *     tags: [Vocabulary Progress]
 *     summary: Record a vocabulary review (creates or updates progress)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecordVocabularyReviewRequest'
 *     responses:
 *       201: { description: Review recorded successfully }
 *       400: { description: Invalid request }
 *       401: { description: Authentication required }
 *       403: { description: You can only record reviews for yourself }
 *       404: { description: Vocabulary not found }
 */
router.post(
  "/",
  authenticate,
  requireOwnership("body", "userId"),
  reviewVocabulary
);

/**
 * @swagger
 * /api/vocabulary-progress/user/{userId}:
 *   get:
 *     tags: [Vocabulary Progress]
 *     summary: Get all vocabulary progress for a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Progress retrieved successfully }
 *       401: { description: Authentication required }
 *       403: { description: You can only access your own data }
 */
router.get(
  "/user/:userId",
  authenticate,
  requireOwnership("params", "userId"),
  getProgressByUser
);

/**
 * @swagger
 * /api/vocabulary-progress/user/{userId}/due:
 *   get:
 *     tags: [Vocabulary Progress]
 *     summary: Get vocabulary words due for review for a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Due words retrieved successfully }
 *       401: { description: Authentication required }
 *       403: { description: You can only access your own data }
 */
router.get(
  "/user/:userId/due",
  authenticate,
  requireOwnership("params", "userId"),
  getDueForUser
);

/**
 * @swagger
 * /api/vocabulary-progress/user/{userId}/vocabulary/{vocabularyId}:
 *   get:
 *     tags: [Vocabulary Progress]
 *     summary: Get progress for a specific user and vocabulary word
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: vocabularyId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Progress retrieved successfully }
 *       401: { description: Authentication required }
 *       403: { description: You can only access your own data }
 *       404: { description: Progress not found }
 */
router.get(
  "/user/:userId/vocabulary/:vocabularyId",
  authenticate,
  requireOwnership("params", "userId"),
  getProgressForUserAndWord
);

/**
 * @swagger
 * /api/vocabulary-progress/vocabulary/{vocabularyId}:
 *   get:
 *     tags: [Vocabulary Progress]
 *     summary: Get all users' progress for a vocabulary word (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vocabularyId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Progress retrieved successfully }
 *       401: { description: Authentication required }
 *       403: { description: Admin access required }
 */
router.get(
  "/vocabulary/:vocabularyId",
  authenticate,
  requireAdmin,
  getProgressByVocabulary
);

/**
 * @swagger
 * /api/vocabulary-progress/{id}:
 *   get:
 *     tags: [Vocabulary Progress]
 *     summary: Get a vocabulary progress record by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Progress retrieved successfully }
 *       401: { description: Authentication required }
 *       404: { description: Progress not found }
 *   delete:
 *     tags: [Vocabulary Progress]
 *     summary: Delete a vocabulary progress record
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Progress deleted successfully }
 *       401: { description: Authentication required }
 */
router.get("/:id", authenticate, getProgressById);
router.delete("/:id", authenticate, removeProgress);

export default router;