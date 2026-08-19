import type { Request, Response } from "express";

import { registerSchema } from "../validators/auth.validator.js";
import { registerUser } from "../services/auth.service.js";
import { loginUser } from "../services/auth.service.js";

export async function register(req: Request, res: Response) {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        status: "ERROR",
        message: "Invalid request data",
        errors: result.error.flatten(),
      });

      return;
    }

    const user = await registerUser(result.data);

    res.status(201).json({
      status: "OK",
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "EMAIL_ALREADY_EXISTS") {
        res.status(409).json({
          status: "ERROR",
          message: "Email already exists",
        });

        return;
      }

      if (error.message === "USERNAME_ALREADY_EXISTS") {
        res.status(409).json({
          status: "ERROR",
          message: "Username already exists",
        });

        return;
      }
    }

    console.error("Register error:", error);

    res.status(500).json({
      status: "ERROR",
      message: "Internal server error",
    });
  }
}
export async function login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          status: "ERROR",
          message: "Email and password are required",
        });
      }
  
      const result = await loginUser(email, password);
  
      return res.status(200).json({
        status: "OK",
        message: "Login successful",
        ...result,
      });
    } catch (error) {
      console.error("Login error:", error);
  
      if (error instanceof Error) {
        if (error.message === "INVALID_CREDENTIALS") {
          return res.status(401).json({
            status: "ERROR",
            message: "Invalid email or password",
          });
        }
  
        if (error.message === "JWT_SECRET_NOT_CONFIGURED") {
          return res.status(500).json({
            status: "ERROR",
            message: "Server authentication configuration error",
          });
        }
      }
  
      return res.status(500).json({
        status: "ERROR",
        message: "Internal server error",
      });
    }
  }