const ratelimit = require('express-rate-limit')
const limitAccess = (option)=>ratelimit(option)
module.exports = limitAccess