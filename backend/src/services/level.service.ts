import { prisma } from "../config/prisma.js";

export interface CreateLevelData {
  languageId: string;
  name: string;
  description?: string;
  difficulty?: "BEGINNER" | "ELEMENTARY" | "INTERMEDIATE" | "UPPER_INTERMEDIATE" | "ADVANCED" | "EXPERT";
  order: number;
  requiredXp?: number;
}

export interface UpdateLevelData {
  name?: string;
  description?: string;
  difficulty?: "BEGINNER" | "ELEMENTARY" | "INTERMEDIATE" | "UPPER_INTERMEDIATE" | "ADVANCED" | "EXPERT";
  order?: number;
  requiredXp?: number;
}

export const getAllLevels = async (languageId?: string) => {
  return prisma.level.findMany({
    where: languageId ? { languageId } : undefined,
    orderBy: {
      order: "asc",
    },
  });
};

export const getLevelById = async (id: string) => {
  return prisma.level.findUnique({
    where: { id },
    include: {
      language: true,
    },
  });
};

export const createLevel = async (data: CreateLevelData) => {
  return prisma.level.create({
    data: {
      languageId: data.languageId,
      name: data.name,
      description: data.description,
      difficulty: data.difficulty,
      order: data.order,
      requiredXp: data.requiredXp,
    },
  });
};

export const updateLevel = async (id: string, data: UpdateLevelData) => {
  return prisma.level.update({
    where: { id },
    data,
  });
};

export const deleteLevel = async (id: string) => {
  return prisma.level.delete({
    where: { id },
  });
};