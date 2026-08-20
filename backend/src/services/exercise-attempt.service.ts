import { PrismaClient } from "../generated/prisma/client.js";

import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export const createExerciseAttempt = async (
  userId: string,
  exerciseId: string,
  answer: string
) => {
  const exercise = await prisma.exercise.findUnique({
    where: {
      id: exerciseId,
    },
  });

  if (!exercise) {
    throw new Error("EXERCISE_NOT_FOUND");
  }

  const isCorrect =
    answer.trim().toLowerCase() ===
    exercise.answer.trim().toLowerCase();

  const score = isCorrect ? exercise.points : 0;

  return prisma.exerciseAttempt.create({
    data: {
      userId,
      exerciseId,
      answer,
      isCorrect,
      score,
    },
    include: {
      exercise: true,
    },
  });
};

export const getExerciseAttemptsByUser = async (
  userId: string
) => {
  return prisma.exerciseAttempt.findMany({
    where: {
      userId,
    },
    include: {
      exercise: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getExerciseAttemptsByExercise = async (
  exerciseId: string
) => {
  return prisma.exerciseAttempt.findMany({
    where: {
      exerciseId,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getExerciseAttemptById = async (
  id: string
) => {
  return prisma.exerciseAttempt.findUnique({
    where: {
      id,
    },
    include: {
      exercise: true,
      user: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
    },
  });
};