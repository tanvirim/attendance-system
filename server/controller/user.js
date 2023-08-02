const userService = require("../service/user");
const error = require("../util/customerror");
const authService = require("../service/auth");
const { findByIdAndRemove } = require("../models/user");
const User = require("../models/user");

//get all users
const getUsers = async (req, res, next) => {
  try {
    const users = await userService.findUsers();
    console.log(" users= ", users);
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

// get all users by id
const getUserById = async (req, res, next) => {
  try {
    const user = await userService.findUserByProperty("_id", req.params.userId);

    if (!user) {
      throw error("no user found with this userId", 400);
    }
    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

//create new users
const postUsers = async (req, res, next) => {
  const { name, email, password, accountStatus, roles } = req.body;

  try {
    const newUser = await authService.registerService({
      name,
      email,
      password,
      accountStatus,
      roles,
    });
    console.log("new user :", newUser);
    return res.status(200).json({ newUser });
  } catch (error) {
    next(error);
  }
};

// user delete by id
const deleteUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await userService.findUserByProperty("_id", userId);

    console.log(user);
    if (!user) {
      throw error("user not found", 404);
    }

    await User.findByIdAndRemove(userId);
    return res.status(203).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

//update user by id

const patchUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { name, roles, accountStatus } = req.body;
  try {
    const user = await userService.findUserByProperty("_id", userId);

    if (!user) {
      throw error("user not found", 404);
    }

    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;

    await user.save();
    return res.status(200).json({ user });
    console.log(user);
  } catch (error) {
    next(error);
  }
};

//put controller
const putUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { email, name, roles, accountStatus } = req.body;
  try {
    console.log("userID :", userId);

    const user = await userService.updateUser(userId, {
      email,
      name,
      roles,
      accountStatus,
    });

    if (!user) {
      throw error("User not found", 404);
    }

    console.log("updatedUser :", user);

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  postUsers,
  patchUserById,
  putUserById,
  deleteUserById,
};
