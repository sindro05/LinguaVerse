import { PrismaClient } from "../generated/prisma/client.js";

import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export interface CreateExerciseOptionData {
  exerciseId: string;
  text: string;
  isCorrect?: boolean;
  order: number;
}

export interface UpdateExerciseOptionData {
  exerciseId?: string;
  text?: string;
  isCorrect?: boolean;
  order?: number;
}

// CREATE
export const createExerciseOption = async (
  data: CreateExerciseOptionData
) => {
  return prisma.exerciseOption.create({
    data: {
      exerciseId: data.exerciseId,
      text: data.text,
      isCorrect: data.isCorrect ?? false,
      order: data.order,
    },
  });
};

// GET ALL
export const getAllExerciseOptions = async () => {
  return prisma.exerciseOption.findMany({
    orderBy: {
      order: "asc",
    },
    include: {
      exercise: true,
    },
  });
};

// GET BY EXERCISE
export const getExerciseOptionsByExercise = async (
  exerciseId: string
) => {
  return prisma.exerciseOption.findMany({
    where: {
      exerciseId,
    },
    orderBy: {
      order: "asc",
    },
  });
};

// GET BY ID
export const getExerciseOptionById = async (
  id: string
) => {
  return prisma.exerciseOption.findUnique({
    where: {
      id,
    },
    include: {
      exercise: true,
    },
  });
};

// UPDATE
export const updateExerciseOption = async (
  id: string,
  data: UpdateExerciseOptionData
) => {
  return prisma.exerciseOption.update({
    where: {
      id,
    },
    data,
  });
};

// DELETE
export const deleteExerciseOption = async (
  id: string
) => {
  return prisma.exerciseOption.delete({
    where: {
      id,
    },
  });
};