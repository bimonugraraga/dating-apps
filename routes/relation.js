const express = require('express')
const router = express.Router()
const RelationController = require('../controllers/relationController')
const userAuthn = require('../middlewares/authn')

router.use(userAuthn)
router.get('/', RelationController.getListOfUserController)
router.post('/like-dislike', RelationController.likeDislikeController)
router.get('/matches', RelationController.getListMatches)
router.get('/liked-by', RelationController.getLikedBy)
module.exports = router