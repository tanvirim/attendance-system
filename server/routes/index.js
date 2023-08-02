const router = require("express").Router();
const verifytoken = require("../middleware/verifyToken");

const authRoutes = require("./auth");
const userRoutes = require("./user");
const adminAttendanceRoutes = require("./admin-attendance");

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/users", verifytoken, userRoutes);
router.use("/api/v1/admin/attendance", verifytoken, adminAttendanceRoutes);

module.exports = router;
