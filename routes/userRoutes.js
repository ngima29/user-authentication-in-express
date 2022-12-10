const express = require('express')
const UserController = require('../controllers/userController.js')
const router = express.Router()
const userController = require('../controllers/userController.js')
const  checkUserAuth  = require('../middleware/authMiddleware.js')


/// route level middleware - to protect router

router.use('/changpassword', checkUserAuth)
router.use('/loggeduser', checkUserAuth)

/// public Routes
router.post('/register',userController.userRegistration)
router.post('/login',UserController.login)
router.post('/sendpasswordrestemail',UserController.sendPasswordResetEmail)

//protected Routes
router.post('/changpassword', UserController.changePassword)
router.get('/loggeduser',UserController.loggedUser)

module.exports = router