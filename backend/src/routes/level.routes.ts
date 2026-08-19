import { Router } from "express";
import {
  getLevels,
  getLevel,
  createLevel,
  updateLevel,
  deleteLevel,
} from "../controllers/level.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Levels
 *   description: Level management
 */

/**
 * @swagger
 * /api/levels:
 *   get:
 *     summary: Get all levels (optionally filtered by language)
 *     tags: [Levels]
 *     parameters:
 *       - in: query
 *         name: languageId
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of levels
 */
router.get("/", getLevels);

/**
 * @swagger
 * /api/levels/{id}:
 *   get:
 *     summary: Get a level by ID
 *     tags: [Levels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Level found
 *       404:
 *         description: Level not found
 */
router.get("/:id", getLevel);

/**
 * @swagger
 * /api/levels:
 *   post:
 *     summary: Create a level
 *     tags: [Levels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - languageId
 *               - name
 *               - order
 *             properties:
 *               languageId:
 *                 type: string
 *               name:
 *                 type: string
 *                 example: A1 - Débutant
 *               description:
 *                 type: string
 *               difficulty:
 *                 type: string
 *                 enum: [BEGINNER, ELEMENTARY, INTERMEDIATE, UPPER_INTERMEDIATE, ADVANCED, EXPERT]
 *               order:
 *                 type: integer
 *                 example: 1
 *               requiredXp:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       201:
 *         description: Level created
 *       409:
 *         description: Order already exists for this language
 */
router.post("/", createLevel);

/**
 * @swagger
 * /api/levels/{id}:
 *   patch:
 *     summary: Update a level
 *     tags: [Levels]
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               difficulty:
 *                 type: string
 *                 enum: [BEGINNER, ELEMENTARY, INTERMEDIATE, UPPER_INTERMEDIATE, ADVANCED, EXPERT]
 *               order:
 *                 type: integer
 *               requiredXp:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Level updated
 *       404:
 *         description: Level not found
 */
router.patch("/:id", updateLevel);

/**
 * @swagger
 * /api/levels/{id}:
 *   delete:
 *     summary: Delete a level
 *     tags: [Levels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Level deleted
 *       404:
 *         description: Level not found
 */
router.delete("/:id", deleteLevel);

export default router;