import User from "../models/user.model.js";

import { apiError, apiResponse } from "../utils/apiError.js";
async function getAllUsers(req, res) {
  //fetch all the user and retrun

  const data = await User.find();

  if (data.length !== 0)
    return res.json(new apiResponse(200, data, "All Data Sent Succesfully..."));

  // Return is there is 0 User

  return res.json(new apiError(404, data, "No Data Found!!!"));
}

async function getUserByID(req, res) {
  const { id } = req.params;

  try {
    const user = await User.find({
      username: id,
    });

    if (user.length !== 0)
      return res.json(
        new apiResponse(200, ...user, "User Details Sent Succesfully...")
      );

    return res.json(
      new apiError(404, "User Not Found", "Please Check the Data Again!!!")
    );
  } catch (error) {
    console.error("Error :: ", error);
    return res.json(
      new apiError(404, "Server Issue...", "Something is Wrong!!!")
    );
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  console.log("Deleting user with ID:", id);

  try {
    const user = await User.findOneAndDelete({ username: id });

    console.log("User :: ", user);

    if (!user) {
      return res.json(new apiError(404, user, "User Not Found!!!!"));
    }

    return res.json(
      new apiResponse(200, "Success", "User Details Deleted Succesfully...")
    );
  } catch (error) {
    console.error("Error :: ", error);
    return res.json(
      new apiError(500, "Server Issue...", "Something is Wrong!!!")
    );
  }
}
async function updateUser(req, res) {
  const { id } = await req.params;

  // console.log("id :: ", id);
  console.log("Params :: ", req.body);

  try {
    const user = await User.findOneAndUpdate(
      { username: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.json(new apiError(404, user, "User Not Found!!!!"));
    }

    return res.json(new apiResponse(200, user, "User Updated Succesfully..."));
  } catch (error) {
    console.error("Update Error :: ", error);
    return res.json(
      new apiError(500, "Server Issue...", "Something is Wrong!!!")
    );
  }
}

export { getAllUsers, getUserByID, updateUser, deleteUser };
