import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

import {
  DifficultyLevel,
  LessonType,
} from "../generated/prisma/enums.js";


interface CreateLessonData {
  languageId: string;
  levelId?: string;
  title: string;
  description?: string;
  type: LessonType;
  difficulty: DifficultyLevel;
  order: number;
  xpReward?: number;
  duration?: number;
}

interface UpdateLessonData {
  languageId?: string;
  levelId?: string | null;
  title?: string;
  description?: string;
  type?: LessonType;
  difficulty?: DifficultyLevel;
  order?: number;
  xpReward?: number;
  duration?: number;
}

export const getAllLessons = async () => {
  return prisma.lesson.findMany({
    orderBy: [
      {
        languageId: "asc",
      },
      {
        order: "asc",
      },
    ],
    include: {
      language: true,
      level: true,
    },
  });
};

export const getLessonById = async (id: string) => {
  return prisma.lesson.findUnique({
    where: {
      id,
    },
    include: {
      language: true,
      level: true,
      vocabulary: true,
      exercises: {
        include: {
          options: true,
        },
        orderBy: {
          order: "asc",
        },
      },
    },
  });
};

export const getLessonsByLanguage = async (languageId: string) => {
  return prisma.lesson.findMany({
    where: {
      languageId,
    },
    orderBy: {
      order: "asc",
    },
    include: {
      level: true,
    },
  });
};

export const getLessonsByLevel = async (levelId: string) => {
  return prisma.lesson.findMany({
    where: {
      levelId,
    },
    orderBy: {
      order: "asc",
    },
    include: {
      language: true,
    },
  });
};

export const createLesson = async (data: CreateLessonData) => {
  const language = await prisma.language.findUnique({
    where: {
      id: data.languageId,
    },
  });

  if (!language) {
    throw new Error("Language not found");
  }

  if (data.levelId) {
    const level = await prisma.level.findUnique({
      where: {
        id: data.levelId,
      },
    });

    if (!level) {
      throw new Error("Level not found");
    }

    if (level.languageId !== data.languageId) {
      throw new Error("Level does not belong to this language");
    }
  }

  const existingLesson = await prisma.lesson.findFirst({
    where: {
      languageId: data.languageId,
      order: data.order,
    },
  });

  if (existingLesson) {
    throw new Error(
      "A lesson with this order already exists for this language"
    );
  }

  return prisma.lesson.create({
    data: {
      languageId: data.languageId,
      levelId: data.levelId,
      title: data.title,
      description: data.description,
      type: data.type,
      difficulty: data.difficulty,
      order: data.order,
      xpReward: data.xpReward ?? 10,
      duration: data.duration,
    },
    include: {
      language: true,
      level: true,
    },
  });
};

export const updateLesson = async (
  id: string,
  data: UpdateLessonData
) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id,
    },
  });

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  const languageId = data.languageId ?? lesson.languageId;
  const levelId =
    data.levelId !== undefined ? data.levelId : lesson.levelId;

  if (data.languageId) {
    const language = await prisma.language.findUnique({
      where: {
        id: data.languageId,
      },
    });

    if (!language) {
      throw new Error("Language not found");
    }
  }

  if (levelId) {
    const level = await prisma.level.findUnique({
      where: {
        id: levelId,
      },
    });

    if (!level) {
      throw new Error("Level not found");
    }

    if (level.languageId !== languageId) {
      throw new Error("Level does not belong to this language");
    }
  }

  if (data.order !== undefined) {
    const existingLesson = await prisma.lesson.findFirst({
      where: {
        languageId,
        order: data.order,
        NOT: {
          id,
        },
      },
    });

    if (existingLesson) {
      throw new Error(
        "A lesson with this order already exists for this language"
      );
    }
  }

  return prisma.lesson.update({
    where: {
      id,
    },
    data: {
      languageId: data.languageId,
      levelId: data.levelId,
      title: data.title,
      description: data.description,
      type: data.type,
      difficulty: data.difficulty,
      order: data.order,
      xpReward: data.xpReward,
      duration: data.duration,
    },
    include: {
      language: true,
      level: true,
    },
  });
};

export const deleteLesson = async (id: string) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id,
    },
  });

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  return prisma.lesson.delete({
    where: {
      id,
    },
  });
};