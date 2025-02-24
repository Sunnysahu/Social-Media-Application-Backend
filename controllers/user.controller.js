import User from "../models/user.model.js";

import { apiError, apiResponse } from "../utils/apiError.js";
async function getAllUsers(req, res) {
  //fetch all the user and retrun

  const data = await User.find();

  if (data)
    return res.json(new apiResponse(200, data, "All Data Sent Succesfully..."));

  //   users: [
  //     { id: 1, name: "John Doe" },
  //     { id: 2, name: "Jane Smith" },
  //     //... more users
  //   ],
  // });
  return res.json(new apiError(404, data, "No Data Found!!!"));
}

async function getUserByID(req, res) {
  const { id } = req.params;

  console.log("path:", id);

  try {
    const user = await User.find({
      username: id,
    });

    console.log("User :: ", user);
    return res.json(
      new apiResponse(200, ...user, "User Details Sent Succesfully...")
    );
  } catch (error) {
    console.error("Error :: ", error);
    return res.json(new apiError(203, ...user, "User Details Not Found..."));
  }
  // res.send({
  //   users: [{ id: 1, name: "John Doe" }],
  // });

  console.log("User Sent");
}

async function deleteUser(req, res) {
  // res.send({
  //   users: [{ id: 1, name: "Johnnn Doe" }],
  // });
  console.log("user Sent");
  return res.json(
    new apiResponse(200, "Success", "User Details Sent Succesfully...")
  );
}

async function updateUser(req, res) {
  const param = req.params.id;

  console.log("Params :: ", param);

  const user = await User.find({
    username: param,
  });

  console.log("user :: ", user);

  if (!user || user.length === 0) {
    return res.json(new apiError(203, ...user, "User Details Not Found..."));
  }
  console.log("new :: ", user);

  const updateUser = await User.findByIdAndUpdate(user[0]._id, {
    $set: {
      username: "I'm new",
    },
  });

  console.log("updateUser :: ", updateUser);

  return res.json(
    new apiResponse(200, updateUser, "User Details Changed Succesfully...")
  );
}

export { getAllUsers, getUserByID, updateUser, deleteUser };
