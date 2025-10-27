const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

router.get("/signin", authController.getSignin);
router.post("/signin", authController.postSignin);

router.get("/logout", authController.logout);

module.exports = router;