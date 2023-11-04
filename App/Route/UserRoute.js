const express = require("express");
const authenticateToken = require("../Middleware/Auth");
const router = express.Router();

const {getProfile} = require("../Controller/ProfileController");



router.use(authenticateToken);
router.post('/profile', getProfile);