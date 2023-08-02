const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("./user");
const error = require("../util/customerror");

const registerService = async ({
  name,
  email,
  password,
  roles,
  accountStatus,
}) => {
  const user = await userService.findUserByProperty("email", email);

  if (user) {
    throw error("user already exists", 400);
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return await userService.createNewUser({
    name,
    email,
    password: hash,
    roles,
    accountStatus,
  });
};

const loginService = async ({ email, password }) => {
  const user = await userService.findUserByProperty("email", email);

  if (!user) {
    throw error("invalid Credential", 400);
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw error("invalid Credential", 400);
  }

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };
  const token = jwt.sign(payload, "my-secret-key", {
    expiresIn: "24h",
  });

  return token;
};

module.exports = { registerService, loginService };
