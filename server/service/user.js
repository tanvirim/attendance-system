const User = require("../models/user");
const error = require("../util/customerror");

//find user service
const findUsers = () => {
  return User.find();
};

const findUserByProperty = (key, value) => {
  if (key == "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

//create user service
const createNewUser = ({ name, email, password, role, accountStatus }) => {
  const newUser = new User({
    name,
    email,
    password,
    roles: role ? role : "STUDENT",
    accountStatus: accountStatus ? accountStatus : "PENDING",
  });

  return newUser.save();
};

//updating user

const updateUser = async (id, data) => {
  const user = await findUserByProperty("email", data.email);
  if (user) {
    throw error("email already exist", 400);
  }
  return User.findByIdAndUpdate(
    id,
    { ...data },
    {
      new: true,
    }
  );
};

module.exports = { findUserByProperty, createNewUser, findUsers, updateUser };
