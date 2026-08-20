import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "./auth.middleware.js";

type Source = "params" | "body";

export function requireOwnership(source: Source = "params", field: string = "userId") {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        status: "ERROR",
        message: "Authentication required",
      });
    }

    if (req.user.role === "ADMIN") {
      return next();
    }

    const targetUserId = source === "params" ? req.params[field] : req.body[field];

    if (!targetUserId) {
      return res.status(400).json({
        status: "ERROR",
        message: `Missing ${field}`,
      });
    }

    if (targetUserId !== req.user.userId) {
      return res.status(403).json({
        status: "ERROR",
        message: "You can only access your own data",
      });
    }

    next();
  };
}