const { model, Schema } = require("mongoose");

const studentAttendanceSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  adminAttendance: {
    type: Schema.Types.ObjectId,
    ref: "AdminAttendance",
    required: true,
  },
});

const StudentAttendance = model("StudentAttendance", studentAttendanceSchema);

module.exports = StudentAttendance;
