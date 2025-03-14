import { config } from "dotenv";
import jwt from "jsonwebtoken";

import { apiError } from "./apiError";

config();

//sign the Token

const SERECT_KEY = process.env.JWT_SECRET;
const signToken = (data, token) => {

  const verify = verifyToken(token)
  if (verify) {
    return res.json(new apiError(200, "Not a Valid/ Expired Token", "Expired Token"))
  }

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

function refreshToken (refreshToken) {


  return null;
}

export { signToken, verifyToken, refreshToken };
