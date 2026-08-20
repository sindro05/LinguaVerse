import { PrismaClient } from "../generated/prisma/client.js";

import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export interface RecordReviewData {
  userId: string;
  vocabularyId: string;
  isCorrect: boolean;
}

function computeMastery(currentMastery: number, isCorrect: boolean): number {
  const delta = isCorrect ? 10 : -15;
  const next = currentMastery + delta;

  return Math.min(100, Math.max(0, next));
}

function computeNextReviewAt(mastery: number): Date {
  let days = 1;

  if (mastery >= 80) {
    days = 14;
  } else if (mastery >= 50) {
    days = 7;
  } else if (mastery >= 20) {
    days = 3;
  }

  const nextReviewAt = new Date();
  nextReviewAt.setDate(nextReviewAt.getDate() + days);

  return nextReviewAt;
}

// CREATE OR UPDATE (review a word)
export const recordVocabularyReview = async (data: RecordReviewData) => {
  const vocabulary = await prisma.vocabulary.findUnique({
    where: { id: data.vocabularyId },
  });

  if (!vocabulary) {
    throw new Error("VOCABULARY_NOT_FOUND");
  }

  const existing = await prisma.vocabularyProgress.findUnique({
    where: {
      userId_vocabularyId: {
        userId: data.userId,
        vocabularyId: data.vocabularyId,
      },
    },
  });

  const currentMastery = existing?.mastery ?? 0;
  const mastery = computeMastery(currentMastery, data.isCorrect);
  const nextReviewAt = computeNextReviewAt(mastery);
  const now = new Date();

  return prisma.vocabularyProgress.upsert({
    where: {
      userId_vocabularyId: {
        userId: data.userId,
        vocabularyId: data.vocabularyId,
      },
    },
    create: {
      userId: data.userId,
      vocabularyId: data.vocabularyId,
      correctCount: data.isCorrect ? 1 : 0,
      incorrectCount: data.isCorrect ? 0 : 1,
      mastery,
      lastReviewedAt: now,
      nextReviewAt,
    },
    update: {
      correctCount: { increment: data.isCorrect ? 1 : 0 },
      incorrectCount: { increment: data.isCorrect ? 0 : 1 },
      mastery,
      lastReviewedAt: now,
      nextReviewAt,
    },
    include: { vocabulary: true },
  });
};

// GET ALL FOR A USER
export const getVocabularyProgressByUser = async (userId: string) => {
  return prisma.vocabularyProgress.findMany({
    where: { userId },
    include: { vocabulary: true },
    orderBy: { updatedAt: "desc" },
  });
};

// GET ALL FOR A VOCABULARY WORD
export const getVocabularyProgressByVocabulary = async (vocabularyId: string) => {
  return prisma.vocabularyProgress.findMany({
    where: { vocabularyId },
    include: {
      user: { select: { id: true, username: true, email: true } },
    },
    orderBy: { updatedAt: "desc" },
  });
};

// GET ONE (user + vocabulary)
export const getVocabularyProgressForUserAndWord = async (
  userId: string,
  vocabularyId: string
) => {
  return prisma.vocabularyProgress.findUnique({
    where: {
      userId_vocabularyId: { userId, vocabularyId },
    },
    include: { vocabulary: true },
  });
};

// GET WORDS DUE FOR REVIEW
export const getDueVocabularyForUser = async (userId: string) => {
  return prisma.vocabularyProgress.findMany({
    where: {
      userId,
      OR: [{ nextReviewAt: { lte: new Date() } }, { nextReviewAt: null }],
    },
    include: { vocabulary: true },
    orderBy: { nextReviewAt: "asc" },
  });
};

// GET BY ID
export const getVocabularyProgressById = async (id: string) => {
  return prisma.vocabularyProgress.findUnique({
    where: { id },
    include: {
      vocabulary: true,
      user: { select: { id: true, username: true, email: true } },
    },
  });
};

// DELETE
export const deleteVocabularyProgress = async (id: string) => {
  return prisma.vocabularyProgress.delete({ where: { id } });
};