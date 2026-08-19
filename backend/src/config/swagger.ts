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

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
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

        RegisterRequest: {
          type: "object",
          required:
            [
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
          required:
            [
              "email",
              "password",
            ],
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

        CreateLanguageRequest: {
          type: "object",
          required:
            [
              "code",
              "name",
            ],
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
    ],
  },

  apis: [
    "./src/routes/*.ts",
    "./src/controllers/*.ts",
  ],
};

export const swaggerSpec = swaggerJsdoc(options);