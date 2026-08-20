import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "LinguaVerse API",
      version: "1.0.0",
      description:
        "REST API for LinguaVerse - Language learning platform",
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],

    // =====================================================
    // COMPONENTS
    // =====================================================

    components: {
      // ===================================================
      // SECURITY
      // ===================================================

      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      // ===================================================
      // SCHEMAS
      // ===================================================

      schemas: {
        // =================================================
        // USER
        // =================================================

        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "cm123abc456",
            },
            email: {
              type: "string",
              format: "email",
              example: "user@example.com",
            },
            username: {
              type: "string",
              example: "john123",
            },
            firstName: {
              type: "string",
              nullable: true,
              example: "John",
            },
            lastName: {
              type: "string",
              nullable: true,
              example: "Doe",
            },
            avatarUrl: {
              type: "string",
              nullable: true,
              example: "https://example.com/avatar.jpg",
            },
            role: {
              type: "string",
              enum: ["USER", "ADMIN"],
              example: "USER",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        // =================================================
        // LANGUAGE
        // =================================================

        Language: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "cm123language",
            },
            code: {
              type: "string",
              example: "en",
            },
            name: {
              type: "string",
              example: "English",
            },
            nativeName: {
              type: "string",
              nullable: true,
              example: "English",
            },
            flag: {
              type: "string",
              nullable: true,
              example: "🇬🇧",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreateLanguageRequest: {
          type: "object",
          required: ["code", "name"],
          properties: {
            code: {
              type: "string",
              example: "fr",
            },
            name: {
              type: "string",
              example: "French",
            },
            nativeName: {
              type: "string",
              example: "Français",
            },
            flag: {
              type: "string",
              example: "🇫🇷",
            },
          },
        },

        UpdateLanguageRequest: {
          type: "object",
          properties: {
            code: {
              type: "string",
              example: "fr",
            },
            name: {
              type: "string",
              example: "French",
            },
            nativeName: {
              type: "string",
              example: "Français",
            },
            flag: {
              type: "string",
              example: "🇫🇷",
            },
          },
        },

        // =================================================
        // LEVEL
        // =================================================

        Level: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "cm123level",
            },
            languageId: {
              type: "string",
              example: "cm123language",
            },
            name: {
              type: "string",
              example: "Beginner",
            },
            description: {
              type: "string",
              nullable: true,
              example: "Basic level for new learners",
            },
            difficulty: {
              type: "string",
              enum: [
                "BEGINNER",
                "ELEMENTARY",
                "INTERMEDIATE",
                "UPPER_INTERMEDIATE",
                "ADVANCED",
                "EXPERT",
              ],
              example: "BEGINNER",
            },
            order: {
              type: "integer",
              example: 1,
            },
            requiredXp: {
              type: "integer",
              example: 0,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreateLevelRequest: {
          type: "object",
          required: [
            "languageId",
            "name",
            "difficulty",
            "order",
          ],
          properties: {
            languageId: {
              type: "string",
              example: "cm123language",
            },
            name: {
              type: "string",
              example: "Beginner",
            },
            description: {
              type: "string",
              example: "Basic level for new learners",
            },
            difficulty: {
              type: "string",
              enum: [
                "BEGINNER",
                "ELEMENTARY",
                "INTERMEDIATE",
                "UPPER_INTERMEDIATE",
                "ADVANCED",
                "EXPERT",
              ],
              example: "BEGINNER",
            },
            order: {
              type: "integer",
              example: 1,
            },
            requiredXp: {
              type: "integer",
              example: 0,
            },
          },
        },

        UpdateLevelRequest: {
          type: "object",
          properties: {
            languageId: {
              type: "string",
              example: "cm123language",
            },
            name: {
              type: "string",
              example: "Beginner",
            },
            description: {
              type: "string",
              example: "Basic level for new learners",
            },
            difficulty: {
              type: "string",
              enum: [
                "BEGINNER",
                "ELEMENTARY",
                "INTERMEDIATE",
                "UPPER_INTERMEDIATE",
                "ADVANCED",
                "EXPERT",
              ],
              example: "BEGINNER",
            },
            order: {
              type: "integer",
              example: 1,
            },
            requiredXp: {
              type: "integer",
              example: 0,
            },
          },
        },

        // =================================================
        // LESSON
        // =================================================

        Lesson: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "cm123lesson",
            },
            languageId: {
              type: "string",
              example: "cm123language",
            },
            levelId: {
              type: "string",
              nullable: true,
              example: "cm123level",
            },
            title: {
              type: "string",
              example: "Basic Greetings",
            },
            description: {
              type: "string",
              nullable: true,
              example: "Learn basic greetings in English",
            },
            type: {
              type: "string",
              enum: [
                "VOCABULARY",
                "GRAMMAR",
                "LISTENING",
                "READING",
                "SPEAKING",
                "WRITING",
                "MIXED",
              ],
              example: "VOCABULARY",
            },
            difficulty: {
              type: "string",
              enum: [
                "BEGINNER",
                "ELEMENTARY",
                "INTERMEDIATE",
                "UPPER_INTERMEDIATE",
                "ADVANCED",
                "EXPERT",
              ],
              example: "BEGINNER",
            },
            order: {
              type: "integer",
              example: 1,
            },
            xpReward: {
              type: "integer",
              example: 10,
            },
            duration: {
              type: "integer",
              nullable: true,
              example: 15,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreateLessonRequest: {
          type: "object",
          required: [
            "languageId",
            "title",
            "type",
            "difficulty",
            "order",
          ],
          properties: {
            languageId: {
              type: "string",
              example: "cm123language",
            },
            levelId: {
              type: "string",
              nullable: true,
              example: "cm123level",
            },
            title: {
              type: "string",
              example: "Basic Greetings",
            },
            description: {
              type: "string",
              example: "Learn basic greetings in English",
            },
            type: {
              type: "string",
              enum: [
                "VOCABULARY",
                "GRAMMAR",
                "LISTENING",
                "READING",
                "SPEAKING",
                "WRITING",
                "MIXED",
              ],
              example: "VOCABULARY",
            },
            difficulty: {
              type: "string",
              enum: [
                "BEGINNER",
                "ELEMENTARY",
                "INTERMEDIATE",
                "UPPER_INTERMEDIATE",
                "ADVANCED",
                "EXPERT",
              ],
              example: "BEGINNER",
            },
            order: {
              type: "integer",
              example: 1,
            },
            xpReward: {
              type: "integer",
              example: 10,
            },
            duration: {
              type: "integer",
              example: 15,
            },
          },
        },

        UpdateLessonRequest: {
          type: "object",
          properties: {
            languageId: {
              type: "string",
              example: "cm123language",
            },
            levelId: {
              type: "string",
              nullable: true,
              example: "cm123level",
            },
            title: {
              type: "string",
              example: "Basic Greetings",
            },
            description: {
              type: "string",
              example: "Learn basic greetings in English",
            },
            type: {
              type: "string",
              enum: [
                "VOCABULARY",
                "GRAMMAR",
                "LISTENING",
                "READING",
                "SPEAKING",
                "WRITING",
                "MIXED",
              ],
              example: "GRAMMAR",
            },
            difficulty: {
              type: "string",
              enum: [
                "BEGINNER",
                "ELEMENTARY",
                "INTERMEDIATE",
                "UPPER_INTERMEDIATE",
                "ADVANCED",
                "EXPERT",
              ],
              example: "BEGINNER",
            },
            order: {
              type: "integer",
              example: 1,
            },
            xpReward: {
              type: "integer",
              example: 20,
            },
            duration: {
              type: "integer",
              example: 20,
            },
          },
        },

        // =================================================
        // VOCABULARY
        // =================================================

        Vocabulary: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "cm123vocabulary",
            },
            languageId: {
              type: "string",
              example: "cm123language",
            },
            lessonId: {
              type: "string",
              nullable: true,
              example: "cm123lesson",
            },
            word: {
              type: "string",
              example: "Hello",
            },
            translation: {
              type: "string",
              example: "Bonjour",
            },
            pronunciation: {
              type: "string",
              nullable: true,
              example: "heh-loh",
            },
            example: {
              type: "string",
              nullable: true,
              example: "Hello, how are you?",
            },
            audioUrl: {
              type: "string",
              nullable: true,
              example:
                "https://example.com/audio/hello.mp3",
            },
            difficulty: {
              type: "string",
              enum: [
                "BEGINNER",
                "ELEMENTARY",
                "INTERMEDIATE",
                "UPPER_INTERMEDIATE",
                "ADVANCED",
                "EXPERT",
              ],
              example: "BEGINNER",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreateVocabularyRequest: {
          type: "object",
          required: [
            "languageId",
            "word",
            "translation",
          ],
          properties: {
            languageId: {
              type: "string",
              example: "cm123language",
            },
            lessonId: {
              type: "string",
              nullable: true,
              example: "cm123lesson",
            },
            word: {
              type: "string",
              example: "Hello",
            },
            translation: {
              type: "string",
              example: "Bonjour",
            },
            pronunciation: {
              type: "string",
              example: "heh-loh",
            },
            example: {
              type: "string",
              example: "Hello, how are you?",
            },
            audioUrl: {
              type: "string",
              example:
                "https://example.com/audio/hello.mp3",
            },
            difficulty: {
              type: "string",
              enum: [
                "BEGINNER",
                "ELEMENTARY",
                "INTERMEDIATE",
                "UPPER_INTERMEDIATE",
                "ADVANCED",
                "EXPERT",
              ],
              example: "BEGINNER",
            },
          },
        },

        UpdateVocabularyRequest: {
          type: "object",
          properties: {
            languageId: {
              type: "string",
              example: "cm123language",
            },
            lessonId: {
              type: "string",
              nullable: true,
              example: "cm123lesson",
            },
            word: {
              type: "string",
              example: "Hello",
            },
            translation: {
              type: "string",
              example: "Bonjour",
            },
            pronunciation: {
              type: "string",
              example: "heh-loh",
            },
            example: {
              type: "string",
              example: "Hello, how are you?",
            },
            audioUrl: {
              type: "string",
              example:
                "https://example.com/audio/hello.mp3",
            },
            difficulty: {
              type: "string",
              enum: [
                "BEGINNER",
                "ELEMENTARY",
                "INTERMEDIATE",
                "UPPER_INTERMEDIATE",
                "ADVANCED",
                "EXPERT",
              ],
              example: "BEGINNER",
            },
          },
        },

        // =================================================
        // EXERCISE
        // =================================================

        Exercise: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "cm123exercise",
            },
            lessonId: {
              type: "string",
              example: "cm123lesson",
            },
            type: {
              type: "string",
              enum: [
                "MULTIPLE_CHOICE",
                "TRANSLATION",
                "FILL_BLANK",
                "LISTENING",
                "SPEAKING",
                "MATCHING",
                "TRUE_FALSE",
                "ORDER_WORDS",
              ],
              example: "MULTIPLE_CHOICE",
            },
            question: {
              type: "string",
              example:
                "What is the French translation of Hello?",
            },
            answer: {
              type: "string",
              example: "Bonjour",
            },
            explanation: {
              type: "string",
              nullable: true,
              example:
                "Hello means Bonjour in French.",
            },
            points: {
              type: "integer",
              example: 10,
            },
            order: {
              type: "integer",
              example: 1,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreateExerciseRequest: {
          type: "object",
          required: [
            "lessonId",
            "type",
            "question",
            "answer",
            "order",
          ],
          properties: {
            lessonId: {
              type: "string",
              example: "cm123lesson",
            },
            type: {
              type: "string",
              enum: [
                "MULTIPLE_CHOICE",
                "TRANSLATION",
                "FILL_BLANK",
                "LISTENING",
                "SPEAKING",
                "MATCHING",
                "TRUE_FALSE",
                "ORDER_WORDS",
              ],
              example: "MULTIPLE_CHOICE",
            },
            question: {
              type: "string",
              example:
                "What is the French translation of Hello?",
            },
            answer: {
              type: "string",
              example: "Bonjour",
            },
            explanation: {
              type: "string",
              nullable: true,
              example:
                "Hello means Bonjour in French.",
            },
            points: {
              type: "integer",
              example: 10,
            },
            order: {
              type: "integer",
              example: 1,
            },
          },
        },

        UpdateExerciseRequest: {
          type: "object",
          properties: {
            lessonId: {
              type: "string",
              example: "cm123lesson",
            },
            type: {
              type: "string",
              enum: [
                "MULTIPLE_CHOICE",
                "TRANSLATION",
                "FILL_BLANK",
                "LISTENING",
                "SPEAKING",
                "MATCHING",
                "TRUE_FALSE",
                "ORDER_WORDS",
              ],
              example: "TRANSLATION",
            },
            question: {
              type: "string",
              example: "Translate Good morning",
            },
            answer: {
              type: "string",
              example: "Bonjour",
            },
            explanation: {
              type: "string",
              nullable: true,
              example:
                "Good morning means Bonjour.",
            },
            points: {
              type: "integer",
              example: 10,
            },
            order: {
              type: "integer",
              example: 2,
            },
          },
        },

        // =================================================
        // EXERCISE OPTION
        // =================================================

        ExerciseOption: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "cm123option",
            },
            exerciseId: {
              type: "string",
              example: "cm123exercise",
            },
            text: {
              type: "string",
              example: "Bonjour",
            },
            isCorrect: {
              type: "boolean",
              example: true,
            },
            order: {
              type: "integer",
              example: 1,
            },
          },
        },

        CreateExerciseOptionRequest: {
          type: "object",
          required: [
            "exerciseId",
            "text",
            "order",
          ],
          properties: {
            exerciseId: {
              type: "string",
              example: "cm123exercise",
            },
            text: {
              type: "string",
              example: "Bonjour",
            },
            isCorrect: {
              type: "boolean",
              example: true,
            },
            order: {
              type: "integer",
              example: 1,
            },
          },
        },

        UpdateExerciseOptionRequest: {
          type: "object",
          properties: {
            exerciseId: {
              type: "string",
              example: "cm123exercise",
            },
            text: {
              type: "string",
              example: "Bonjour",
            },
            isCorrect: {
              type: "boolean",
              example: true,
            },
            order: {
              type: "integer",
              example: 1,
            },
          },
        },

        // =================================================
        // LESSON PROGRESS
        // =================================================

        LessonProgress: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "cm123progress",
            },
            userId: {
              type: "string",
              example: "cm123user",
            },
            lessonId: {
              type: "string",
              example: "cm123lesson",
            },
            status: {
              type: "string",
              enum: [
                "NOT_STARTED",
                "IN_PROGRESS",
                "COMPLETED",
              ],
              example: "IN_PROGRESS",
            },
            progress: {
              type: "integer",
              minimum: 0,
              maximum: 100,
              example: 50,
            },
            score: {
              type: "integer",
              example: 80,
            },
            completedAt: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreateLessonProgressRequest: {
          type: "object",
          required: [
            "userId",
            "lessonId",
          ],
          properties: {
            userId: {
              type: "string",
              example: "cm123user",
            },
            lessonId: {
              type: "string",
              example: "cm123lesson",
            },
            status: {
              type: "string",
              enum: [
                "NOT_STARTED",
                "IN_PROGRESS",
                "COMPLETED",
              ],
              example: "NOT_STARTED",
            },
            progress: {
              type: "integer",
              minimum: 0,
              maximum: 100,
              example: 0,
            },
            score: {
              type: "integer",
              example: 0,
            },
            completedAt: {
              type: "string",
              format: "date-time",
              nullable: true,
              example: null,
            },
          },
        },

        UpdateLessonProgressRequest: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: [
                "NOT_STARTED",
                "IN_PROGRESS",
                "COMPLETED",
              ],
              example: "COMPLETED",
            },
            progress: {
              type: "integer",
              minimum: 0,
              maximum: 100,
              example: 100,
            },
            score: {
              type: "integer",
              example: 90,
            },
            completedAt: {
              type: "string",
              format: "date-time",
              nullable: true,
              example:
                "2026-08-19T18:00:00.000Z",
            },
          },
        },

        // =================================================
        // EXERCISE ATTEMPT
        // =================================================

        ExerciseAttempt: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "cm123attempt",
            },
            userId: {
              type: "string",
              example: "cm123user",
            },
            exerciseId: {
              type: "string",
              example: "cm123exercise",
            },
            answer: {
              type: "string",
              example: "Bonjour",
            },
            isCorrect: {
              type: "boolean",
              example: true,
            },
            score: {
              type: "integer",
              example: 10,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreateExerciseAttemptRequest: {
          type: "object",
          required: [
            "userId",
            "exerciseId",
            "answer",
          ],
          properties: {
            userId: {
              type: "string",
              example: "cm123user",
            },
            exerciseId: {
              type: "string",
              example: "cm123exercise",
            },
            answer: {
              type: "string",
              example: "Bonjour",
            },
          },
        },

        // =================================================
        // VOCABULARY PROGRESS
        // =================================================

        VocabularyProgress: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "cm123progress",
            },
            userId: {
              type: "string",
              example: "cm123user",
            },
            vocabularyId: {
              type: "string",
              example: "cm123vocab",
            },
            correctCount: {
              type: "integer",
              example: 4,
            },
            incorrectCount: {
              type: "integer",
              example: 1,
            },
            mastery: {
              type: "integer",
              minimum: 0,
              maximum: 100,
              example: 35,
            },
            lastReviewedAt: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            nextReviewAt: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        RecordVocabularyReviewRequest: {
          type: "object",
          required: [
            "userId",
            "vocabularyId",
            "isCorrect",
          ],
          properties: {
            userId: {
              type: "string",
              example: "cm123user",
            },
            vocabularyId: {
              type: "string",
              example: "cm123vocab",
            },
            isCorrect: {
              type: "boolean",
              example: true,
            },
          },
        },

        // =================================================
        // ACHIEVEMENT
        // =================================================

        Achievement: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "cm123achievement",
            },
            name: {
              type: "string",
              example: "First Lesson Completed",
            },
            description: {
              type: "string",
              example: "Complete your first lesson",
            },
            icon: {
              type: "string",
              nullable: true,
              example: "🏆",
            },
            xpReward: {
              type: "integer",
              example: 50,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreateAchievementRequest: {
          type: "object",
          required: ["name", "description"],
          properties: {
            name: {
              type: "string",
              example: "First Lesson Completed",
            },
            description: {
              type: "string",
              example: "Complete your first lesson",
            },
            icon: {
              type: "string",
              example: "🏆",
            },
            xpReward: {
              type: "integer",
              example: 50,
            },
          },
        },

        UpdateAchievementRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "First Lesson Completed",
            },
            description: {
              type: "string",
              example: "Complete your first lesson",
            },
            icon: {
              type: "string",
              example: "🏆",
            },
            xpReward: {
              type: "integer",
              example: 50,
            },
          },
        },

        // =================================================
        // USER ACHIEVEMENT
        // =================================================

        UserAchievement: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "cm123userachievement",
            },
            userId: {
              type: "string",
              example: "cm123user",
            },
            achievementId: {
              type: "string",
              example: "cm123achievement",
            },
            unlockedAt: {
              type: "string",
              format: "date-time",
            },
            achievement: {
              $ref: "#/components/schemas/Achievement",
            },
          },
        },

        UnlockAchievementRequest: {
          type: "object",
          required: ["userId", "achievementId"],
          properties: {
            userId: {
              type: "string",
              example: "cm123user",
            },
            achievementId: {
              type: "string",
              example: "cm123achievement",
            },
          },
        },

        // =================================================
        // USER STREAK
        // =================================================

        UserStreak: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "cm123streak",
            },
            userId: {
              type: "string",
              example: "cm123user",
            },
            currentStreak: {
              type: "integer",
              example: 5,
            },
            longestStreak: {
              type: "integer",
              example: 12,
            },
            lastActivity: {
              type: "string",
              format: "date-time",
              nullable: true,
              example: "2026-08-19T10:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        RecordActivityRequest: {
          type: "object",
          required: ["userId"],
          properties: {
            userId: {
              type: "string",
              example: "cm123user",
            },
          },
        },

        // =================================================
        // DASHBOARD
        // =================================================

        DashboardUserLanguage: {
          type: "object",
          properties: {
            language: {
              $ref: "#/components/schemas/Language",
            },
            currentLevel: {
              type: "string",
              enum: [
                "BEGINNER",
                "ELEMENTARY",
                "INTERMEDIATE",
                "UPPER_INTERMEDIATE",
                "ADVANCED",
                "EXPERT",
              ],
              example: "ELEMENTARY",
            },
            xp: {
              type: "integer",
              example: 320,
            },
            status: {
              type: "string",
              enum: ["LEARNING", "COMPLETED", "PAUSED"],
              example: "LEARNING",
            },
          },
        },

        DashboardContinueLesson: {
          type: "object",
          nullable: true,
          properties: {
            lesson: {
              $ref: "#/components/schemas/Lesson",
            },
            progress: {
              type: "integer",
              example: 60,
            },
            score: {
              type: "integer",
              example: 40,
            },
          },
        },

        DashboardTodayStats: {
          type: "object",
          properties: {
            exercisesCompletedToday: {
              type: "integer",
              example: 8,
            },
            xpToday: {
              type: "integer",
              example: 90,
            },
          },
        },

        DashboardRecentAchievement: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "cm123userachievement",
            },
            unlockedAt: {
              type: "string",
              format: "date-time",
            },
            achievement: {
              $ref: "#/components/schemas/Achievement",
            },
          },
        },

        DashboardResponse: {
          type: "object",
          properties: {
            user: {
              type: "object",
              properties: {
                id: { type: "string", example: "cm123user" },
                username: { type: "string", example: "john123" },
                firstName: { type: "string", nullable: true, example: "John" },
                lastName: { type: "string", nullable: true, example: "Doe" },
                avatarUrl: {
                  type: "string",
                  nullable: true,
                  example: "https://example.com/avatar.jpg",
                },
              },
            },
            streak: {
              $ref: "#/components/schemas/UserStreak",
            },
            languages: {
              type: "array",
              items: {
                $ref: "#/components/schemas/DashboardUserLanguage",
              },
            },
            continueLesson: {
              $ref: "#/components/schemas/DashboardContinueLesson",
            },
            todayStats: {
              $ref: "#/components/schemas/DashboardTodayStats",
            },
            recentAchievements: {
              type: "array",
              items: {
                $ref: "#/components/schemas/DashboardRecentAchievement",
              },
            },
            dueVocabularyCount: {
              type: "integer",
              example: 12,
            },
          },
        },

        // =================================================
        // AUTHENTICATION
        // =================================================

        RegisterRequest: {
          type: "object",
          required: [
            "email",
            "username",
            "password",
          ],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            username: {
              type: "string",
              example: "john123",
            },
            password: {
              type: "string",
              format: "password",
              example: "Password123!",
            },
            firstName: {
              type: "string",
              example: "John",
            },
            lastName: {
              type: "string",
              example: "Doe",
            },
          },
        },

        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "Password123!",
            },
          },
        },

        AuthResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Authentication successful",
            },
            token: {
              type: "string",
              example:
                "eyJhbGciOiJIUzI1NiIs...",
            },
            user: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
    },

    // =====================================================
    // TAGS
    // =====================================================

    tags: [
      {
        name: "Authentication",
        description: "User authentication",
      },
      {
        name: "Users",
        description: "User management",
      },
      {
        name: "Languages",
        description: "Language management",
      },
      {
        name: "Levels",
        description: "Level management",
      },
      {
        name: "Lessons",
        description: "Lesson management",
      },
      {
        name: "Vocabulary",
        description: "Vocabulary management",
      },
      {
        name: "Exercises",
        description: "Exercise management",
      },
      {
        name: "Exercise Options",
        description: "Exercise option management",
      },
      {
        name: "Lesson Progress",
        description: "Lesson learning progress management",
      },
      {
        name: "Exercise Attempts",
        description: "Exercise answer and scoring management",
      },
      {
        name: "Vocabulary Progress",
        description: "Spaced-repetition vocabulary review tracking",
      },
      {
        name: "Achievements",
        description: "Achievement catalog management",
      },
      {
        name: "User Achievements",
        description: "Unlocked achievements per user",
      },
      {
        name: "User Streaks",
        description: "Daily activity streak tracking",
      },
      {
        name: "Dashboard",
        description: "Aggregated home screen data",
      },
    ],
  },

  // =======================================================
  // ROUTES
  // =======================================================

  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);