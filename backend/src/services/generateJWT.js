import jwt from "jsonwebtoken";
export const generateJWT = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};
