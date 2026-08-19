import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "LinguaVerse API",
      version: "1.0.0",
      description: "REST API for LinguaVerse - Language learning platform",
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        // =========================================================
        // USER
        // =========================================================

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

        // =========================================================
        // LANGUAGE
        // =========================================================

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

        // =========================================================
        // LEVEL
        // =========================================================

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

        // =========================================================
        // LESSON
        // =========================================================

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

        // =========================================================
        // AUTHENTICATION
        // =========================================================

        RegisterRequest: {
          type: "object",
          required: ["email", "username", "password"],
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
              example: "eyJhbGciOiJIUzI1NiIs...",
            },
            user: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
    },

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
    ],
  },

  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);