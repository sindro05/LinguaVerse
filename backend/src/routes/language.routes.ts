import { Router } from "express";
import {
  getLanguages,
  getLanguage,
  createLanguage,
  updateLanguage,
  deleteLanguage,
} from "../controllers/language.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Languages
 *   description: Language management
 */

/**
 * @swagger
 * /api/languages:
 *   get:
 *     summary: Get all languages
 *     tags: [Languages]
 *     responses:
 *       200:
 *         description: List of languages
 */
router.get("/", getLanguages);

/**
 * @swagger
 * /api/languages/{id}:
 *   get:
 *     summary: Get a language by ID
 *     tags: [Languages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Language found
 *       404:
 *         description: Language not found
 */
router.get("/:id", getLanguage);

/**
 * @swagger
 * /api/languages:
 *   post:
 *     summary: Create a language
 *     tags: [Languages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - name
 *             properties:
 *               code:
 *                 type: string
 *                 example: de
 *               name:
 *                 type: string
 *                 example: German
 *               nativeName:
 *                 type: string
 *                 example: Deutsch
 *               flag:
 *                 type: string
 *                 example: 🇩🇪
 *     responses:
 *       201:
 *         description: Language created
 *       409:
 *         description: Language code already exists
 */
router.post("/", createLanguage);

/**
 * @swagger
 * /api/languages/{id}:
 *   patch:
 *     summary: Update a language
 *     tags: [Languages]
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
 *               code:
 *                 type: string
 *                 example: de
 *               name:
 *                 type: string
 *                 example: German
 *               nativeName:
 *                 type: string
 *                 example: Deutsch
 *               flag:
 *                 type: string
 *                 example: 🇩🇪
 *     responses:
 *       200:
 *         description: Language updated
 *       404:
 *         description: Language not found
 */
router.patch("/:id", updateLanguage);

/**
 * @swagger
 * /api/languages/{id}:
 *   delete:
 *     summary: Delete a language
 *     tags: [Languages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Language deleted
 *       404:
 *         description: Language not found
 */
router.delete("/:id", deleteLanguage);

export default router;