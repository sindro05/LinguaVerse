import { DifficultyLevel } from "../generated/prisma/enums.js";
import { prisma } from "../config/prisma.js";

interface CreateVocabularyData {
  languageId: string;
  lessonId?: string | null;
  word: string;
  translation: string;
  pronunciation?: string;
  example?: string;
  audioUrl?: string;
  difficulty?: DifficultyLevel;
}

interface UpdateVocabularyData {
  languageId?: string;
  lessonId?: string | null;
  word?: string;
  translation?: string;
  pronunciation?: string;
  example?: string;
  audioUrl?: string;
  difficulty?: DifficultyLevel;
}

// =====================================================
// GET ALL VOCABULARY
// =====================================================

export const getAllVocabulary = async () => {
  return prisma.vocabulary.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      language: true,
      lesson: true,
    },
  });
};

// =====================================================
// GET VOCABULARY BY ID
// =====================================================

export const getVocabularyById = async (id: string) => {
  return prisma.vocabulary.findUnique({
    where: {
      id,
    },
    include: {
      language: true,
      lesson: true,
      progress: true,
    },
  });
};

// =====================================================
// GET VOCABULARY BY LANGUAGE
// =====================================================

export const getVocabularyByLanguage = async (
  languageId: string
) => {
  return prisma.vocabulary.findMany({
    where: {
      languageId,
    },
    orderBy: {
      word: "asc",
    },
    include: {
      lesson: true,
    },
  });
};

// =====================================================
// GET VOCABULARY BY LESSON
// =====================================================

export const getVocabularyByLesson = async (
  lessonId: string
) => {
  return prisma.vocabulary.findMany({
    where: {
      lessonId,
    },
    orderBy: {
      word: "asc",
    },
    include: {
      language: true,
    },
  });
};

// =====================================================
// CREATE VOCABULARY
// =====================================================

export const createVocabulary = async (
  data: CreateVocabularyData
) => {
  // Vérifier que la langue existe
  const language = await prisma.language.findUnique({
    where: {
      id: data.languageId,
    },
  });

  if (!language) {
    throw new Error("Language not found");
  }

  // Vérifier la lesson si elle est fournie
  if (data.lessonId) {
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: data.lessonId,
      },
    });

    if (!lesson) {
      throw new Error("Lesson not found");
    }

    // Vérifier que la lesson appartient à la même langue
    if (lesson.languageId !== data.languageId) {
      throw new Error(
        "Lesson does not belong to this language"
      );
    }
  }

  // Vérifier si le mot existe déjà dans cette langue
  const existingVocabulary =
    await prisma.vocabulary.findFirst({
      where: {
        languageId: data.languageId,
        word: data.word,
      },
    });

  if (existingVocabulary) {
    throw new Error(
      "This word already exists for this language"
    );
  }

  return prisma.vocabulary.create({
    data: {
      languageId: data.languageId,
      lessonId: data.lessonId ?? null,
      word: data.word,
      translation: data.translation,
      pronunciation: data.pronunciation,
      example: data.example,
      audioUrl: data.audioUrl,
      difficulty: data.difficulty ?? DifficultyLevel.BEGINNER,
    },
    include: {
      language: true,
      lesson: true,
    },
  });
};

// =====================================================
// UPDATE VOCABULARY
// =====================================================

export const updateVocabulary = async (
  id: string,
  data: UpdateVocabularyData
) => {
  const vocabulary = await prisma.vocabulary.findUnique({
    where: {
      id,
    },
  });

  if (!vocabulary) {
    throw new Error("Vocabulary not found");
  }

  const languageId =
    data.languageId ?? vocabulary.languageId;

  const lessonId =
    data.lessonId !== undefined
      ? data.lessonId
      : vocabulary.lessonId;

  // Vérifier la langue
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

  // Vérifier la lesson
  if (lessonId) {
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
    });

    if (!lesson) {
      throw new Error("Lesson not found");
    }

    if (lesson.languageId !== languageId) {
      throw new Error(
        "Lesson does not belong to this language"
      );
    }
  }

  // Vérifier l'unicité du mot
  if (data.word) {
    const existingVocabulary =
      await prisma.vocabulary.findFirst({
        where: {
          languageId,
          word: data.word,
          NOT: {
            id,
          },
        },
      });

    if (existingVocabulary) {
      throw new Error(
        "This word already exists for this language"
      );
    }
  }

  return prisma.vocabulary.update({
    where: {
      id,
    },
    data: {
      languageId: data.languageId,
      lessonId: data.lessonId,
      word: data.word,
      translation: data.translation,
      pronunciation: data.pronunciation,
      example: data.example,
      audioUrl: data.audioUrl,
      difficulty: data.difficulty,
    },
    include: {
      language: true,
      lesson: true,
    },
  });
};

// =====================================================
// DELETE VOCABULARY
// =====================================================

export const deleteVocabulary = async (
  id: string
) => {
  const vocabulary = await prisma.vocabulary.findUnique({
    where: {
      id,
    },
  });

  if (!vocabulary) {
    throw new Error("Vocabulary not found");
  }

  return prisma.vocabulary.delete({
    where: {
      id,
    },
  });
};