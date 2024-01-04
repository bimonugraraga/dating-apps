const {User, Relation} = require('../models')
const {gender} = require('../constants/gender')
const {action} = require('../constants/action')
const { Op, Sequelize } = require('sequelize');
class RelationService {
    static likeService = async(params, next) => {
        try {
            if (params.quota == 0 && params.premium != true) {
                throw {
                    code: 400,
                    message: 'Out Of Likes'
                }
            }
            let targetUser = await User.findOne({
                where: {
                    id: params.targetId,
                    gender: params.targetGender
                }
            })
            if (!targetUser) {
                throw {
                    code: 404,
                    message: 'User Not Found'
                }
            }
            let whereRelation = {
                male_user: params.gender == gender.male ? params.id : params.targetId,
                female_user: params.gender == gender.female ? params.id : params.targetId,
            }
            let payload = {
                male_user: params.gender == gender.male ? params.id : params.targetId,
                female_user: params.gender == gender.female ? params.id : params.targetId,
                liked_by_m: params.gender == gender.male ? true : false,
                liked_by_f: params.gender == gender.female ? true : false,
                dislike: false
            }
            let targetRelation = await Relation.findOne({
                where: whereRelation
            })
            if (!targetRelation) {
                let createRelation = await Relation.create(payload)
                if (!createRelation) {
                    throw {
                        code: 500
                    }
                }
            } else {
                if (targetRelation.female_user == params.id) {
                    delete payload.liked_by_m
                    payload.liked_by_f = targetRelation.liked_by_f == false && targetRelation.female_user == params.id ? true : false
                } else if (targetRelation.male_user == params.id) {
                    delete payload.liked_by_f
                    payload.liked_by_m = targetRelation.liked_by_m == false && targetRelation.male_user == params.id ? true : false 
                }
                payload.match = true
                let updateRelation =  await Relation.update(payload, {
                    where: whereRelation
                })
                if (!updateRelation) {
                    throw {
                        code: 500
                    }
                }
            }
            if (params.premium != true) {
                targetUser = await User.update({
                    quota: params.quota - 1
                }, {
                    where: {
                        id: params.id
                    }
                })
            }
            if (!targetUser) {
                throw {
                    code: 500
                }
            }
            return targetUser
        } catch (error) {
            next(error)
        }
    }

    static dislikeService = async(params, next) => {
        try {
            if (params.quota == 0 && params.premium != true) {
                throw {
                    code: 400,
                    message: 'Out Of Likes'
                }
            }
            const targetUser = await User.findOne({
                where: {
                    id: params.targetId,
                    gender: params.targetGender
                }
            })
            if (!targetUser) {
                throw {
                    code: 404,
                    message: 'User Not Found'
                }
            }
            let whereRelation = {
                male_user: params.gender == gender.male ? params.id : params.targetId,
                female_user: params.gender == gender.female ? params.id : params.targetId,
            }
            let payload = {
                male_user: params.gender == gender.male ? params.id : params.targetId,
                female_user: params.gender == gender.female ? params.id : params.targetId,
                dislike: true
            }
            let targetRelation = await Relation.findOne({
                where: whereRelation
            })
            if (!targetRelation) {
                let createRelation = await Relation.create(payload)
                if (!createRelation) {
                    throw {
                        code: 500
                    }
                }
            } else {
                let updateRelation =  await Relation.update(payload, {
                    where: whereRelation
                })
                if (!updateRelation) {
                    throw {
                        code: 500
                    }
                }
            }
            if (params.premium != true) {
                targetUser = await User.update({
                    quota: params.quota - 1
                }, {
                    where: {
                        id: params.id
                    }
                })
            }
            if (!targetUser) {
                throw {
                    code: 500
                }
            }
            return targetUser
        } catch (error) {
            next(error)
        }
    }

    static matchesListService = async(params, next) => {
        try {
            let whereRelation = {
                liked_by_m: true,
                liked_by_f: true,
                match: true
            }
            if (params.gender == gender.female) {
                whereRelation.female_user = params.id
            } else {
                whereRelation.male_user = params.id
            }
            const list = await Relation.findAll({
                where: whereRelation,
                include:[
                    {
                        model:User,
                        attributes: ['name', 'profile']
                    }
                ]
            })
            return list
        } catch (error) {
            next(error)
        }
    }

    static likedByService = async (params, next) => {
        try {
            console.log(params)
            let whereRelation = {}
            if (params.gender == gender.female) {
                whereRelation.female_user = params.id
                whereRelation.liked_by_m = true
                whereRelation.liked_by_f = false
            } else {
                whereRelation.male_user = params.id
                whereRelation.liked_by_f = true
                whereRelation.liked_by_m = false
            }
            const list = await Relation.findAll({
                where: whereRelation,
                include:[
                    {
                        model:User,
                        attributes: ['name', 'profile']
                    }
                ]
            })
            return list
        } catch (error) {
            next(error)
        }
    }

    static getListService = async (params, next) => {
        try {
            let offset = params.limit * params.page
            let temp = {
                liked_by_f: params.gender == gender.female ? true : false,
                liked_by_m: params.gender == gender.male ? true : false,
                dislike: false,
                match: false
            }
            if (params.gender == gender.male) {
                temp.male_user = params.id
            } else {
                temp.female_user = params.id
            }
          
            let list = await User.findAll({
                where: {
                    id: {
                        [Op.not]: params.id
                    },
                    gender: params.gender == gender.male ? gender.female : gender.male,
                    age: {
                        [Op.between]: [
                            !params.start_age ? params.age : params.start_age, 
                            !params.end_age ? params.age : params.end_age
                        ]
                    },
                },
                include: [
                    {
                        model: Relation,
                        where: {
                            [Op.or]: [
                                {
                                    female_user: params.id
                                },
                                {
                                    male_user: params.id
                                }
                            ],
                            match: true
                        },
                        required: true,
                        attributes: []
                    }
                ],
                attributes: {
                    exclude: ['password'],
                },
                limit : params.limit? params.limit: null,
                offset: offset,
                required: false
            })
            console.log(list)

            let list2 = await User.findAll({
                where: {
                    id: {
                        [Op.not]: params.id
                    },
                    gender: params.gender == gender.male ? gender.female : gender.male,
                    age: {
                        [Op.between]: [
                            !params.start_age ? params.age : params.start_age, 
                            !params.end_age ? params.age : params.end_age
                        ]
                    },
                },
                include: [
                    {
                        model: Relation,
                        where: temp,
                        required: true,
                        attributes: []
                    }
                ],
                attributes: {
                    exclude: ['password'],
                },
                limit : params.limit? params.limit: null,
                offset: offset,
                required: false
            })
            const idList = []
            for (let i = 0; i < list.length; i++) {
                idList.push(list[i].id)
            }
            for (let i = 0; i < list2.length; i++) {
                idList.push(list2[i].id)
            }
            console.log(idList)
            let noRelationList = await User.findAll({
                where: {
                    gender: params.gender == gender.female ? gender.male : gender.female,
                    id: {
                        [Op.notIn]: idList
                    }
                },
                attributes: {
                    exclude: ['password'],
                },
            })
            let result = [...noRelationList]
            return result
        } catch (error) {
            next(error)
        }
    }
}

module.exports = RelationService