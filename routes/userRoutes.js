const express = require("express")
const {userControllers} = require ("../controllers")
const { verifyToken} = require("../middleware/auth");

const router = express.Router()

router.post("/register", userControllers.register)
router.post("/login", userControllers.login)


module.exports = router;