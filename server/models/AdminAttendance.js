const { model, Schema } = require("mongoose");

const adminAttendanceSchema = new Schema(
  {
    timeLimit: {
      type: Number,
      required: true,
      max: 30,
      min: 5,
      default: 5,
    },
    status: {
      type: String,
      enum: ["RUNNING", "ABSENT"],
      default: "RUNNING",
    },
  },

  { timestamps: true }
);

const AdminAttendance = model("AdminAttendance", adminAttendanceSchema);

module.exports = AdminAttendance;
