const express = require("express");
const { registerUser, loginUser } = require("../controllers/userC");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// PROTECTED ROUTE (TEST)
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted",
    userId: req.userId,
  });
});

module.exports = router;
