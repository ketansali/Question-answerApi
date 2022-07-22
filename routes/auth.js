const { register, login, logOut, getLoggedInUser, forgotPassword, resetPassword, updateDetails ,imageUpload} = require('../controller/auth')
const photoUpload = require('../helpers/libraries/multer')
const { getAccessToRoute } = require('../middlewares/authorization/auth')
const limitAccess = require('../middlewares/security/limitAccess')

const router = require('express').Router()


router.post('/register',register)
router.post('/login',limitAccess({
    windowMs: 60 * 1000, // 1 minutes
    max: 3,
    message: "Too much login attempt, please try again after 1 minutes"
}),login)
router.get('/logOut',getAccessToRoute,logOut)
router.get('/user',getAccessToRoute,getLoggedInUser)
router.post("/forgotPassword",forgotPassword)
router.post("/resetPassword",resetPassword)
router.post("/updateDetails",getAccessToRoute,updateDetails)
router.post("/upload",[getAccessToRoute,photoUpload.single("profile_image")],imageUpload)

module.exports =router