const express = require("express");
const {
  applyDoctor,
  approveDoctor,
  getApprovedDoctors,
} = require("../controllers/doctorC");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/apply", authMiddleware, applyDoctor);
router.post("/approve", authMiddleware, approveDoctor);
router.get("/approved", authMiddleware, getApprovedDoctors);

module.exports = router;
