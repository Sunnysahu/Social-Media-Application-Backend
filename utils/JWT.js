import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

//sign the Token

const SERECT_KEY = process.env.JWT_SECRET;
const signToken = (data) => {
  try {
    return jwt.sign(data, SERECT_KEY, { expiresIn: "1h" });
  } catch (error) {
    console.error("Error signing token :: ", error);
    return null;
  }
};

//verify the Token

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SERECT_KEY);
  } catch (error) {
    console.error("Error verifying token :: ", error);
    return null;
  }
};
