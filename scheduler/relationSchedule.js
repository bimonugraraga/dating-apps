const {
    User,
    Relation
} = require('../models')
async function resetQuota() {
    try {
        const reseted = await User.update({
            quota: 10
        }, {
            where: {
                premium: false
            }
        })
        if (reseted[0] == 0) {
            console.log('[ERROR]: FAILED TO UPDATE QUOTA')
            throw reseted
        }
        console.log('[SUCCESS]: SUCCESS UPDATE QUOTA')
        return true
    } catch (error) {
        return error
    }
}

async function resetRelationNoMatch() {
    try {
        const reseted = await Relation.update({
            liked_by_m: false,
            liked_by_f: false,
            dislike: false
        }, {
            where: {
                match: false
            }
        })
        if (reseted[0] == 0) {
            console.log('[ERROR]: FAILED TO UPDATE RELATION')
            throw reseted
        }
        console.log('[SUCCESS]: SUCCESS UPDATE RELATION')
        return true
    } catch (error) {
        return error
    }
}
module.exports = {
    resetQuota,
    resetRelationNoMatch
}