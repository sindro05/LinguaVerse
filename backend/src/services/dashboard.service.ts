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

export const getDashboard = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      avatarUrl: true,
    },
  });

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  const [streak, languages, inProgressLesson, recentAttempts, recentAchievements, dueVocabulary] =
    await Promise.all([
      // Streak
      prisma.userStreak.findUnique({ where: { userId } }),

      // Languages the user is learning
      prisma.userLanguage.findMany({
        where: { userId },
        include: { language: true },
        orderBy: { updatedAt: "desc" },
      }),

      // Most recently updated in-progress lesson ("Continue learning")
      prisma.lessonProgress.findFirst({
        where: { userId, status: "IN_PROGRESS" },
        include: { lesson: true },
        orderBy: { updatedAt: "desc" },
      }),

      // Today's exercise attempts (for XP/exercises done today)
      prisma.exerciseAttempt.findMany({
        where: { userId },
        include: { exercise: { select: { points: true } } },
        orderBy: { createdAt: "desc" },
        take: 100,
      }),

      // Recent achievements
      prisma.userAchievement.findMany({
        where: { userId },
        include: { achievement: true },
        orderBy: { unlockedAt: "desc" },
        take: 5,
      }),

      // Vocabulary due for review
      prisma.vocabularyProgress.count({
        where: {
          userId,
          OR: [{ nextReviewAt: { lte: new Date() } }, { nextReviewAt: null }],
        },
      }),
    ]);

  const now = new Date();
  const todaysAttempts = recentAttempts.filter((a) => isSameDay(a.createdAt, now));

  const todayStats = {
    exercisesCompletedToday: todaysAttempts.length,
    xpToday: todaysAttempts.reduce((sum, a) => sum + (a.isCorrect ? a.score : 0), 0),
  };

  return {
    user,
    streak: streak ?? { currentStreak: 0, longestStreak: 0, lastActivity: null },
    languages: languages.map((ul) => ({
      language: ul.language,
      currentLevel: ul.currentLevel,
      xp: ul.xp,
      status: ul.status,
    })),
    continueLesson: inProgressLesson
      ? {
          lesson: inProgressLesson.lesson,
          progress: inProgressLesson.progress,
          score: inProgressLesson.score,
        }
      : null,
    todayStats,
    recentAchievements: recentAchievements.map((ua) => ({
      id: ua.id,
      unlockedAt: ua.unlockedAt,
      achievement: ua.achievement,
    })),
    dueVocabularyCount: dueVocabulary,
  };
};