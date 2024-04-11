const AuthController = require("../controllers/auth-controller")
const express = require("express")

const router = express.Router()

// ask if user logged in request
router.get('/loggedIn', AuthController.loggedIn)

// existing user login requests
router.post('/login', AuthController.login)

// logout user requests
router.get('/logout', AuthController.logout)

//  New user registration requests
router.post('/register', AuthController.register)

module.exports = router