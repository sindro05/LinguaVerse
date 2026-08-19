import { Request, Response } from "express";
import * as languageService from "../services/language.service.js";

/**
 * Get all languages
 */
export const getLanguages = async (
  _req: Request,
  res: Response,
) => {
  try {
    const languages = await languageService.getAllLanguages();

    return res.status(200).json({
      success: true,
      data: languages,
    });
  } catch (error) {
    console.error("Get languages error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve languages",
    });
  }
};

/**
 * Get language by ID
 */
export const getLanguage = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = req.params.id as string;

    const language = await languageService.getLanguageById(id);

    if (!language) {
      return res.status(404).json({
        success: false,
        message: "Language not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: language,
    });
  } catch (error) {
    console.error("Get language error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve language",
    });
  }
};

/**
 * Create language
 */
export const createLanguage = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      code,
      name,
      nativeName,
      flag,
    } = req.body;

    if (!code || !name) {
      return res.status(400).json({
        success: false,
        message: "Code and name are required",
      });
    }

    const language = await languageService.createLanguage({
      code,
      name,
      nativeName,
      flag,
    });

    return res.status(201).json({
      success: true,
      message: "Language created successfully",
      data: language,
    });
  } catch (error: any) {
    console.error("Create language error:", error);

    // Prisma unique constraint
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Language code already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create language",
    });
  }
};

/**
 * Update language
 */
export const updateLanguage = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = req.params.id as string;

    const {
      code,
      name,
      nativeName,
      flag,
    } = req.body;

    const language = await languageService.updateLanguage(id, {
      code,
      name,
      nativeName,
      flag,
    });

    return res.status(200).json({
      success: true,
      message: "Language updated successfully",
      data: language,
    });
  } catch (error: any) {
    console.error("Update language error:", error);

    // Language not found
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Language not found",
      });
    }

    // Duplicate code
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Language code already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update language",
    });
  }
};

/**
 * Delete language
 */
export const deleteLanguage = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = req.params.id as string;

    await languageService.deleteLanguage(id);

    return res.status(200).json({
      success: true,
      message: "Language deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete language error:", error);

    // Language not found
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Language not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete language",
    });
  }
};