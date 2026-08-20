import { Router } from "express";

import {
  getVocabulary,
  getVocabularyItem,
  getVocabularyForLanguage,
  getVocabularyForLesson,
  createVocabularyController,
  updateVocabularyController,
  deleteVocabularyController,
} from "../controllers/vocabulary.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Vocabulary
 *     description: Vocabulary management
 */

/**
 * @swagger
 * /api/vocabulary:
 *   get:
 *     summary: Get all vocabulary
 *     tags: [Vocabulary]
 *     responses:
 *       200:
 *         description: List of vocabulary
 *       500:
 *         description: Server error
 */
router.get("/", getVocabulary);

/**
 * @swagger
 * /api/vocabulary/language/{languageId}:
 *   get:
 *     summary: Get vocabulary by language
 *     tags: [Vocabulary]
 *     parameters:
 *       - in: path
 *         name: languageId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vocabulary found
 *       400:
 *         description: Invalid language ID
 */
router.get(
  "/language/:languageId",
  getVocabularyForLanguage
);

/**
 * @swagger
 * /api/vocabulary/lesson/{lessonId}:
 *   get:
 *     summary: Get vocabulary by lesson
 *     tags: [Vocabulary]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vocabulary found
 *       400:
 *         description: Invalid lesson ID
 */
router.get(
  "/lesson/:lessonId",
  getVocabularyForLesson
);

/**
 * @swagger
 * /api/vocabulary/{id}:
 *   get:
 *     summary: Get vocabulary by ID
 *     tags: [Vocabulary]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vocabulary found
 *       404:
 *         description: Vocabulary not found
 */
router.get("/:id", getVocabularyItem);

/**
 * @swagger
 * /api/vocabulary:
 *   post:
 *     summary: Create vocabulary (admin only)
 *     tags: [Vocabulary]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateVocabularyRequest"
 *     responses:
 *       201:
 *         description: Vocabulary created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 */
router.post(
  "/",
  authenticate,
  requireAdmin,
  createVocabularyController
);

/**
 * @swagger
 * /api/vocabulary/{id}:
 *   put:
 *     summary: Update vocabulary (admin only)
 *     tags: [Vocabulary]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateVocabularyRequest"
 *     responses:
 *       200:
 *         description: Vocabulary updated successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Vocabulary not found
 */
router.put(
  "/:id",
  authenticate,
  requireAdmin,
  updateVocabularyController
);

/**
 * @swagger
 * /api/vocabulary/{id}:
 *   delete:
 *     summary: Delete vocabulary (admin only)
 *     tags: [Vocabulary]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vocabulary deleted successfully
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Vocabulary not found
 */
router.delete(
  "/:id",
  authenticate,
  requireAdmin,
  deleteVocabularyController
);

export default router;