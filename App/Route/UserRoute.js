const express = require("express");
const router = express.Router();
const authenticateToken = require("../Middleware/Auth");



router.use(authenticateToken);
router.post('/register');