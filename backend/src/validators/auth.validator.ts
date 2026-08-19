import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),

  username: z
    .string()
    .min(3, "Username must contain at least 3 characters")
    .max(30, "Username must contain at most 30 characters"),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters"),

  firstName: z.string().min(1).max(50).optional(),

  lastName: z.string().min(1).max(50).optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;