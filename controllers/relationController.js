const RelationService = require('../services/relationService')
const {gender} = require('../constants/gender')
const {action} = require('../constants/action')
class RelationController {
    static likeDislikeController = async (req, res, next) => {
        try {
            let params = req.parameters
            params = params.permit("target_id", "action").value()
            if (params.target_id == req.user.id || (params.action.toUpperCase() != action.like && params.action.toUpperCase() != action.dislike)) {
                throw {
                    code: 400,
                    message: "Invalid Input"
                }
            }
            let payload = {...req.user}
            if (payload.gender == gender.female) {
                payload.targetGender = gender.male
            } else {
                payload.targetGender = gender.female
            }
            payload.targetId = params.target_id
            payload.action = params.action.toUpperCase()
            let created
            if (payload.action == action.like) {
                created = await RelationService.likeService(payload,next)
            } else {
                created = await RelationService.dislikeService(payload, next)
            }
            if (created) {
                res.status(200).json({
                    status_code:200,
                    message: "Success Update Relation"
                })
            }
        } catch (error) {
            next(error)
        }
    }

    static getListMatches = async (req, res, next) => {
        try {
            const params = {...req.user}
            const list = await RelationService.matchesListService(params)
            if (list) {
                res.status(200).json({
                    status_code:200,
                    message: "Success Fetch Relation",
                    data: list
                })
                return
            }
        } catch (error) {
            next(error)
        }
    }

    static getLikedBy = async (req, res, next) => {
        try {
            const params = {...req.user}
            const list = await RelationService.likedByService(params)
            if (list) {
                res.status(200).json({
                    status_code:200,
                    message: "Success Fetch Relation",
                    data: list
                })
                return
            }
        } catch (error) {
            next(error)
        }
    }

    static getListOfUserController = async (req, res, next) => {
        try {
            let {
                page,
                limit,
                start_age,
                end_age
            } = req.query
            let params = {...req.user}
            params.page = !page ? 0 : +page - 1
            params.limit = !limit ? 10 : +limit
            params.start_age = !start_age ? null : +start_age
            params.end_age = !end_age ? null : +end_age
            if (params.end_age < params.start_age) {
                throw {
                    code: 400,
                    message: "Invalid Query"
                }
            }
            const list = await RelationService.getListService(params, next)
            res.status(200).json({
                status_code: 200,
                message: "Success Fetch Data",
                data: list
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = RelationController