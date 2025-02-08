import jwt from "jsonwebtoken";

export function generateAccessToken(userId: number) {
  const secret = process.env.JWT_ACCESS_SECRET as string;
  const token = jwt.sign({ userId }, secret, {
    expiresIn: "24h",
  });

  return { token };
}

export function generateToken(userId: number, jti: string) {
  const accessToken = generateAccessToken(userId);
  return { accessToken };
}

export function decodeToken(token: string) {
  try {
    const secret = process.env.JWT_ACCESS_SECRET as string;
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    return decoded.userId;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
