const express = require('express')
const UserController = require('../controllers/userController')
const userAuthn = require('../middlewares/authn')
const router = express.Router()

router.post('/register', UserController.registerUserController)
router.post('/login', UserController.loginUserController)
router.use(userAuthn)
router.post('/go-premium', UserController.goPremiumController)
module.exports = router