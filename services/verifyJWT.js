// middleware/verifyJWT.js
import { verifyToken } from "../utils/JWT.js";
import { apiError } from "../utils/apiError.js";

export const verifyJWT = async (req, res, next) => {
  console.log("Hello2");
  const token = req.body?.token;
  const result = verifyToken(token);
  if (!result) {
    return res.json(new apiError(401, "...Unauthorized", "Token Not Valid"));
  }
  console.log("Hello1");
  console.log("Hello4");
  req.user = await result._doc;

  console.log("Log...::", req.user);

  next();
  console.log("Hello3");
};
