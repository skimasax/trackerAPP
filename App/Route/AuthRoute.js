const express = require("express");
const router = express.Router();

const {register,login,verifyEmail,resendOtp} = require("../Controller/AuthController");

router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/resend-otp', resendOtp);

module.exports = router;