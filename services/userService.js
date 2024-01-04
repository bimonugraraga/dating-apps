const {
    User
} = require('../models')
const {verifPassword} = require('../utils/passHandler')
const {signToken} = require('../utils/tokenHandler')
class UserService {
    static registerUserService = async(params, next) => {
        try {
            let newUser = await User.create(params)
            if (!newUser) {
                throw {
                    code: 400,
                    message: newUser.message
                }
            }
            return newUser.dataValues
        } catch (error) {
            next(error)
        }
    }

    static loginUserService = async(params, next) => {
        try {
            console.log(params)
            let targetUser = await User.findOne({
                where: {
                    email: params.email
                }
            })
            if (!targetUser) {
                throw {
                    code: 404,
                    message: "Invalid Email or Password"
                }
            }
            const isPassword = verifPassword(params.password, targetUser.dataValues.password)
            if (!isPassword) {
                throw {
                    code: 404,
                    message: "Invalid Email or Password"
                }
            }
            const payload = {
                id: targetUser.dataValues.id,
                email: targetUser.dataValues.email,
                name: targetUser.dataValues.name
            }
            const accessToken = signToken(payload)
            return accessToken
        } catch (error) {
            next(error)
        }
    }

    static goPremiumService = async(params, next) => {
        try {
            const targetUser = await User.findOne({
                where: {
                    id: params.id
                },
                attributes: [
                    'name', 'email', 'id'
                ]
            })
            if(!targetUser) {
                throw {
                    code: 404,
                    message: 'User Not Found'
                }
            }
            let becomePremium = await User.update({
                premium: true,
                quota: 10 // reset, but wont be used
            }, {
                where: {
                    id: params.id
                },
                
            })
            if (becomePremium[0] != 1) {
                throw {
                    code: 500
                }
            }
            return targetUser.dataValues
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserService