const router = require('express').Router()
const auth = require('./auth')
const admin = require('./admin')
const question = require('./question')
const answer = require('./answer')

router.use('/auth',auth)
router.use('/admin',admin)
router.use('/question',question)
router.use('/answer',answer)

module.exports =router