import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../config/prisma.js";
import type { RegisterInput } from "../validators/auth.validator.js";

export async function registerUser(data: RegisterInput) {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: data.email,
        },
        {
          username: data.username,
        },
      ],
    },
  });

  if (existingUser) {
    if (existingUser.email === data.email) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }

    if (existingUser.username === data.username) {
      throw new Error("USERNAME_ALREADY_EXISTS");
    }
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
    },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      avatarUrl: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
}
export async function loginUser(
    email: string,
    password: string
  ) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
  
    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }
  
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );
  
    if (!passwordMatch) {
      throw new Error("INVALID_CREDENTIALS");
    }
  
    const JWT_SECRET = process.env.JWT_SECRET;
  
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET_NOT_CONFIGURED");
    }
  
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
  
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl,
        role: user.role,
      },
    };
  }