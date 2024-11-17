const express = require("express");
const { signup } = require("../controllers/userController.js");
const upload = require("../middleware/upload.js");

const router = express.Router();

// Route for user signup with profile image upload
router.post("/signup", upload.single("profileImage"), signup);

module.exports = router;
