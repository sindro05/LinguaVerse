import { PrismaClient } from "../generated/prisma/client.js";

import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export interface CreateAchievementData {
  name: string;
  description: string;
  icon?: string | null;
  xpReward?: number;
}

export interface UpdateAchievementData {
  name?: string;
  description?: string;
  icon?: string | null;
  xpReward?: number;
}

export const createAchievement = async (data: CreateAchievementData) => {
  return prisma.achievement.create({
    data: {
      name: data.name,
      description: data.description,
      icon: data.icon ?? null,
      xpReward: data.xpReward ?? 0,
    },
  });
};

export const getAllAchievements = async () => {
  return prisma.achievement.findMany({
    orderBy: { createdAt: "asc" },
  });
};

export const getAchievementById = async (id: string) => {
  return prisma.achievement.findUnique({
    where: { id },
  });
};

export const updateAchievement = async (id: string, data: UpdateAchievementData) => {
  return prisma.achievement.update({
    where: { id },
    data,
  });
};

export const deleteAchievement = async (id: string) => {
  return prisma.achievement.delete({
    where: { id },
  });
};