const cron = require('node-cron');
const {resetQuota, resetRelationNoMatch} = require('./relationSchedule')
const task = cron.schedule('0 0 * * *', function() {
    console.log("RUN SCHEDULER")
    resetQuota()
        .then(resp => {
            console.log("SCHEDULER SUCCESS: ", resp)
        })
        .catch(err => {
            console.log("SCHEDULER FAILED DUE: ", err)
        })
    resetRelationNoMatch()
        .then(resp => {
            console.log("SCHEDULER SUCCESS: ", resp)
        })
        .catch(err => {
            console.log("SCHEDULER FAILED DUE: ", err)
        })
});

module.exports = task