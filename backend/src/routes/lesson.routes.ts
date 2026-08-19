import { Router } from "express";

import {
  getLessons,
  getLesson,
  getLessonsForLanguage,
  getLessonsForLevel,
  createLessonController,
  updateLessonController,
  deleteLessonController,
} from "../controllers/lesson.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Lessons
 *     description: Lesson management
 */

/**
 * @swagger
 * /api/lessons:
 *   get:
 *     summary: Get all lessons
 *     tags: [Lessons]
 *     responses:
 *       200:
 *         description: List of lessons
 *       500:
 *         description: Server error
 */
router.get("/", getLessons);

/**
 * @swagger
 * /api/lessons/language/{languageId}:
 *   get:
 *     summary: Get lessons by language
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: languageId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lessons found
 *       400:
 *         description: Invalid language ID
 */
router.get(
  "/language/:languageId",
  getLessonsForLanguage
);

/**
 * @swagger
 * /api/lessons/level/{levelId}:
 *   get:
 *     summary: Get lessons by level
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: levelId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lessons found
 *       400:
 *         description: Invalid level ID
 */
router.get(
  "/level/:levelId",
  getLessonsForLevel
);

/**
 * @swagger
 * /api/lessons/{id}:
 *   get:
 *     summary: Get lesson by ID
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson found
 *       404:
 *         description: Lesson not found
 */
router.get("/:id", getLesson);

/**
 * @swagger
 * /api/lessons:
 *   post:
 *     summary: Create a lesson
 *     tags: [Lessons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateLessonRequest"
 *     responses:
 *       201:
 *         description: Lesson created successfully
 *       400:
 *         description: Invalid request
 */
router.post("/", createLessonController);

/**
 * @swagger
 * /api/lessons/{id}:
 *   put:
 *     summary: Update a lesson
 *     tags: [Lessons]
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
 *             $ref: "#/components/schemas/UpdateLessonRequest"
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Lesson not found
 */
router.put("/:id", updateLessonController);

/**
 * @swagger
 * /api/lessons/{id}:
 *   delete:
 *     summary: Delete a lesson
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lesson deleted successfully
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Lesson not found
 */
router.delete("/:id", deleteLessonController);

export default router;