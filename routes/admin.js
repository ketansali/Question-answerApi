const { getAllUsers, getSingleUser ,getBlockUser,deleteUser} = require('../controller/admin')
const { checkUserExist } = require('../middlewares/database/databaseErrorHelpers')
const { userQueryMiddleware } = require('../middlewares/query/userQueryMiddleware')
const User = require('../models/User')

const router = require('express').Router()

router.get("/users",userQueryMiddleware(User),getAllUsers)
router.get("/user/:id",checkUserExist,getSingleUser);
router.get("/block/:id",checkUserExist,getBlockUser);
router.delete("/user/:id",checkUserExist,deleteUser);

module.exports = router