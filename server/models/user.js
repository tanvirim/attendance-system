const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Additional validation using regex for email format
    validate: {
      validator: (email) => {
        // Email regex pattern for basic email format validation
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return emailRegex.test(email);
      },
      message: (props) => `${props.email} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: String,
    enum: ["ADMIN", "STUDENT"], // Only allow "admin" or "STUDENT" as roles
    default: "STUDENT", // Set default value to "user" if not provided
  },
  accountStatus: {
    type: String,
    enum: ["ACTIVE", "REJECTED", "PENDING"], // Only allow "ACTIVE" or "INACTIVE" as account status
    default: "PENDING", // Set default value to "INACTIVE" if not provided
  },
});

const User = model("User", userSchema);

module.exports = User;
