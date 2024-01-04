const express = require('express')
const router = express.Router()
const userRoute = require("./user")
const relRoute = require("./relation")

router.use("/user", userRoute)
router.use("/relation", relRoute)



module.exports = router