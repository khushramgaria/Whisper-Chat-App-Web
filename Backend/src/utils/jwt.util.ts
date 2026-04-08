import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string) => {
  const payload = { id: userId };
  const secret = process.env.JWT_SECRET as jwt.Secret;
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, secret, options);
};

export const verifyAccessToken = (token: string) => {
  const secret = process.env.JWT_SECRET as jwt.Secret;
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    return null;
  }
};
