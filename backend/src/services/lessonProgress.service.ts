import { PrismaClient, ProgressStatus } from "../generated/prisma/client.js";

import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export interface CreateLessonProgressData {
  userId: string;
  lessonId: string;
  status?: ProgressStatus;
  progress?: number;
  score?: number;
  completedAt?: Date | null;
}

export interface UpdateLessonProgressData {
  status?: ProgressStatus;
  progress?: number;
  score?: number;
  completedAt?: Date | null;
}

// CREATE
export const createLessonProgress = async (
  data: CreateLessonProgressData
) => {
  return prisma.lessonProgress.create({
    data: {
      userId: data.userId,
      lessonId: data.lessonId,
      status: data.status ?? "NOT_STARTED",
      progress: data.progress ?? 0,
      score: data.score ?? 0,
      completedAt: data.completedAt ?? null,
    },
    include: {
      lesson: true,
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

// GET ALL
export const getAllLessonProgress = async () => {
  return prisma.lessonProgress.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      lesson: true,
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

// GET BY ID
export const getLessonProgressById = async (
  id: string
) => {
  return prisma.lessonProgress.findUnique({
    where: {
      id,
    },
    include: {
      lesson: true,
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

// GET BY USER
export const getLessonProgressByUser = async (
  userId: string
) => {
  return prisma.lessonProgress.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      lesson: true,
    },
  });
};

// GET BY LESSON
export const getLessonProgressByLesson = async (
  lessonId: string
) => {
  return prisma.lessonProgress.findMany({
    where: {
      lessonId,
    },
    orderBy: {
      updatedAt: "desc",
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
  });
};

// GET USER + LESSON
export const getUserLessonProgress = async (
  userId: string,
  lessonId: string
) => {
  return prisma.lessonProgress.findUnique({
    where: {
      userId_lessonId: {
        userId,
        lessonId,
      },
    },
    include: {
      lesson: true,
    },
  });
};

// UPDATE
export const updateLessonProgress = async (
  id: string,
  data: UpdateLessonProgressData
) => {
  return prisma.lessonProgress.update({
    where: {
      id,
    },
    data,
    include: {
      lesson: true,
    },
  });
};

// DELETE
export const deleteLessonProgress = async (
  id: string
) => {
  return prisma.lessonProgress.delete({
    where: {
      id,
    },
  });
};