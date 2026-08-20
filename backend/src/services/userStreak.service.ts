import { PrismaClient } from "../generated/prisma/client.js";

import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isYesterday(date: Date, reference: Date): boolean {
  const yesterday = new Date(reference);
  yesterday.setDate(yesterday.getDate() - 1);

  return isSameDay(date, yesterday);
}

// RECORD ACTIVITY (call this whenever a user completes a lesson/exercise)
export const recordActivity = async (userId: string) => {
  const now = new Date();

  const existing = await prisma.userStreak.findUnique({
    where: { userId },
  });

  if (!existing) {
    return prisma.userStreak.create({
      data: {
        userId,
        currentStreak: 1,
        longestStreak: 1,
        lastActivity: now,
      },
    });
  }

  // Already recorded today, no change
  if (existing.lastActivity && isSameDay(existing.lastActivity, now)) {
    return existing;
  }

  let newCurrentStreak = 1;

  if (existing.lastActivity && isYesterday(existing.lastActivity, now)) {
    newCurrentStreak = existing.currentStreak + 1;
  }

  const newLongestStreak = Math.max(existing.longestStreak, newCurrentStreak);

  return prisma.userStreak.update({
    where: { userId },
    data: {
      currentStreak: newCurrentStreak,
      longestStreak: newLongestStreak,
      lastActivity: now,
    },
  });
};

// GET STREAK FOR A USER
export const getUserStreak = async (userId: string) => {
  const streak = await prisma.userStreak.findUnique({
    where: { userId },
  });

  if (!streak) {
    return null;
  }

  // If the streak is stale (missed a day), reflect that live without writing yet
  const now = new Date();

  if (
    streak.lastActivity &&
    !isSameDay(streak.lastActivity, now) &&
    !isYesterday(streak.lastActivity, now)
  ) {
    return { ...streak, currentStreak: 0 };
  }

  return streak;
};

// GET LEADERBOARD (top streaks)
export const getStreakLeaderboard = async (limit: number = 10) => {
  return prisma.userStreak.findMany({
    orderBy: { currentStreak: "desc" },
    take: limit,
    include: {
      user: { select: { id: true, username: true, avatarUrl: true } },
    },
  });
};

// RESET (admin / testing)
export const resetUserStreak = async (userId: string) => {
  return prisma.userStreak.update({
    where: { userId },
    data: {
      currentStreak: 0,
      lastActivity: null,
    },
  });
};