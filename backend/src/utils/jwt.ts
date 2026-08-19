import jwt from "jsonwebtoken";

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return secret;
};

export const generateAccessToken = (userId: string): string => {
  const secret: string = getJwtSecret();

  return jwt.sign(
    { userId },
    secret,
    {
      expiresIn: "15m",
    },
  );
};