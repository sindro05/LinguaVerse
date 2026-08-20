import { PrismaClient } from "../generated/prisma/client.js";

import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export const unlockAchievement = async (userId: string, achievementId: string) => {
  const achievement = await prisma.achievement.findUnique({
    where: { id: achievementId },
  });

  if (!achievement) {
    throw new Error("ACHIEVEMENT_NOT_FOUND");
  }

  const existing = await prisma.userAchievement.findUnique({
    where: {
      userId_achievementId: { userId, achievementId },
    },
  });

  if (existing) {
    throw new Error("ALREADY_UNLOCKED");
  }

  return prisma.userAchievement.create({
    data: { userId, achievementId },
    include: { achievement: true },
  });
};

export const getUserAchievements = async (userId: string) => {
  return prisma.userAchievement.findMany({
    where: { userId },
    include: { achievement: true },
    orderBy: { unlockedAt: "desc" },
  });
};

export const getAchievementUnlockers = async (achievementId: string) => {
  return prisma.userAchievement.findMany({
    where: { achievementId },
    include: {
      user: { select: { id: true, username: true, email: true } },
    },
    orderBy: { unlockedAt: "desc" },
  });
};

export const hasUserUnlocked = async (userId: string, achievementId: string) => {
  return prisma.userAchievement.findUnique({
    where: {
      userId_achievementId: { userId, achievementId },
    },
    include: { achievement: true },
  });
};

export const revokeAchievement = async (id: string) => {
  return prisma.userAchievement.delete({
    where: { id },
  });
};