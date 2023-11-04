const express = require("express");
const authenticateToken = require("../Middleware/Auth");
const router = express.Router();

const {getProfile,updateProfile} = require("../Controller/ProfileController");



router.use(authenticateToken);
router.get('/', getProfile);
router.post('/update-profile', updateProfile);

module.exports = router;