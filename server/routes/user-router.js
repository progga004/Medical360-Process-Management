const UserController = require("../controllers/user-controller")
const express = require("express")

const router = express.Router()

// NOTE: creating a general user is done by the auth-router's register function. Note
// that creating other things (such as equipment) is not

// update user route
router.put('/:id', UserController.updateUser)

router.put(`/notification/:id`, UserController.updateNotification)

router.post(`/get-notifications/:id`, UserController.getNotifications)

// send notification
router.post(`/notification/:id`, UserController.postNotification)

// get user route
router.post('/:id', UserController.getUser)

// get all users route
router.post('/', UserController.getAllUsers)

//  delete user route
router.delete('/:id', UserController.deleteUser)

//  delete notification route
router.delete('/notification/:id', UserController.deleteNotification)

// other routes if needed ANTEN ??

module.exports = router