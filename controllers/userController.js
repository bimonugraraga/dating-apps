const {gender} = require('../constants/gender')
const UserService = require('../services/userService')
class UserController {
    static registerUserController = async(req, res, next) => {
        try {
            let params = req.parameters
            params = params.permit("email", "name", "password", "gender", "age").value()
            if (!params.email || !params.name || !params.password || !params.gender) {
                throw {
                    code: 400,
                    message: "Email, Name, Password, Gender are Required"
                }
            }
            switch (params.gender.toUpperCase()) {
                case gender.male:
                    params.prefer = gender.female
                    break;
                case gender.female:
                    params.prefer = gender.male
                    break;
                default:
                    throw {
                        code: 400,
                        message: "Gender Only Accept Male and Female"
                    }
                    break;
            }
            let created = await UserService.registerUserService(params, next)
            if (created) {
                delete created.password
                res.status(201).json({
                    message: "Success Create User",
                    status_code: 201,
                    data: {...created}
                })
                return
            }
        } catch (error) {
            next(error)
        }
    }

    static loginUserController = async (req, res, next) => {
        try {
            let params = req.parameters
            params = params.permit("email", "password").value()
            if (!params.email || !params.password) {
                throw {
                    code: 400,
                    message: "Email and Password are Required"
                }
            }
            let logged = await UserService.loginUserService(params, next)
            if (logged) {
                res.status(200).json({
                    message: "Success Login",
                    status_code: 200,
                    data: {
                        access_token: logged
                    }
                })
                return
            }
        } catch (error) {
            next(error)
        }
    }

    static goPremiumController = async (req, res, next) => {
        try {
            const params = {...req.user}
            const premium = await UserService.goPremiumService(params, next)
            if (premium) {
                res.status(200).json({
                    status_code: 200,
                    message: "Success Become Premium",
                    data: premium
                })
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController