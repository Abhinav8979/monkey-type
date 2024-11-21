const express = require("express");
const { signup, login } = require("../controllers/userController.js");
const upload = require("../middleware/upload.js");
const { authorize } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/register", upload.single("profileImage"), signup);
router.post("/login", login);
// router.post("/sign-out", authorize,isBlacked ,signOut);

module.exports = router;
