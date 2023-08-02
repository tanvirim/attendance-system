const AdminAttendance = require("../models/AdminAttendance");
const error = require("../util/customerror");

const getEnable = async (req, res, next) => {
  try {
    const running = AdminAttendance.findOne({ status: "RUNNING" });
    if (running) {
      throw error("already running", 400);
    }
    const attendance = new AdminAttendance({});
    await attendance.save();

    return res.status(200).json({ message: "success", attendance });
  } catch (error) {
    next(error);
  }
};
const getDisable = async () => {};

module.exports = { getEnable, getDisable };
