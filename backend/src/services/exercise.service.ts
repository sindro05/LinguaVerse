import { PrismaClient } from "../generated/prisma/client.js";

import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export interface CreateExerciseData {
  lessonId: string;
  type:
    | "MULTIPLE_CHOICE"
    | "TRANSLATION"
    | "FILL_BLANK"
    | "LISTENING"
    | "SPEAKING"
    | "MATCHING"
    | "TRUE_FALSE"
    | "ORDER_WORDS";
  question: string;
  answer: string;
  explanation?: string;
  points?: number;
  order: number;
}

export interface UpdateExerciseData {
  lessonId?: string;
  type?:
    | "MULTIPLE_CHOICE"
    | "TRANSLATION"
    | "FILL_BLANK"
    | "LISTENING"
    | "SPEAKING"
    | "MATCHING"
    | "TRUE_FALSE"
    | "ORDER_WORDS";
  question?: string;
  answer?: string;
  explanation?: string;
  points?: number;
  order?: number;
}

export const createExercise = async (
  data: CreateExerciseData
) => {
  return prisma.exercise.create({
    data,
    include: {
      options: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
};

export const getAllExercises = async () => {
  return prisma.exercise.findMany({
    orderBy: [
      {
        lessonId: "asc",
      },
      {
        order: "asc",
      },
    ],
    include: {
      options: {
        orderBy: {
          order: "asc",
        },
      },
      lesson: {
        select: {
          id: true,
          title: true,
          languageId: true,
          levelId: true,
        },
      },
    },
  });
};

export const getExercisesByLesson = async (
  lessonId: string
) => {
  return prisma.exercise.findMany({
    where: {
      lessonId,
    },
    orderBy: {
      order: "asc",
    },
    include: {
      options: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
};

export const getExerciseById = async (
  id: string
) => {
  return prisma.exercise.findUnique({
    where: {
      id,
    },
    include: {
      options: {
        orderBy: {
          order: "asc",
        },
      },
      lesson: true,
    },
  });
};

export const updateExercise = async (
  id: string,
  data: UpdateExerciseData
) => {
  return prisma.exercise.update({
    where: {
      id,
    },
    data,
    include: {
      options: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
};

export const deleteExercise = async (
  id: string
) => {
  return prisma.exercise.delete({
    where: {
      id,
    },
  });
};