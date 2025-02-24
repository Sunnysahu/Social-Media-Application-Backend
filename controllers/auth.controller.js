import { apiError, apiResponse } from "../utils/apiError.js";
import User from "../models/user.model.js";
async function registerUser(req, res) {
  // get data from req.body

  const { username, fullname, password, email, profilePhoto } = req.body;

  // username pass is not empty

  if (!username || !password || !fullname || !email) {
    return res.json(
      new apiError(
        404,
        ["Data Not Found"],
        "Please complete the Details before Sumbitting !!!!"
      )
    );
  }

  // check if username already exists in the database

  const dataCheck = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (dataCheck) {
    console.log("::log", dataCheck);
    console.log("Enteredn Here 28:::::::");

    return res.json(
      new apiError(
        409,
        ["Username or Email Already Exist"],
        "Please change the Username or email!!!!"
      )
    );
  }

  // create a new user in the database

  console.log("Enteredn There 42:::::::", dataCheck);
  const user = await User.create({
    username,
    fullname,
    password,
    email,
    profilePhoto,
  });
  // send success response

  return res.json(new apiResponse(200, user, "All Success..."));
}
async function loginUser(req, res) {
  // get data from req.body

  const { email, password } = req.body;

  console.log("Enteredn There 59:::::::", dataCheck);
  // username pass is not empty

  if (!password || !email) {
    return res.json(
      new apiError(
        404,
        ["Data Not Found"],
        "Please complete the Details before Sumbitting !!!!"
      )
    );
  }

  const dataCheck = await User.find({
    email: email,
    password: password,
  });

  if (dataCheck && !dataCheck.length == 0) {
    console.log("::log", dataCheck);

    return res.json(new apiResponse(200, dataCheck, "Data Found.... Enjoy"));
  } else {
    return res.json(
      new apiError(201, ["No user Found"], "User Not Found !!!!")
    );
  }
}

export { registerUser, loginUser };
