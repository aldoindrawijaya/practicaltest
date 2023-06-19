const express = require("express")
const {authController} = require ("../controllers")

const router = express.Router()

router.get("/", authController.fetchAllProduct)
router.get("/:id", authController.fetchProduct)
router.post("/delete", authController.deleteProduct)
router.post("/add", authController.addProduct)
router.put("/update", authController.updateProduct)


module.exports = router;