const Router = require('express')
const router = new Router()
const UserController = require('../controllers/UserController')

router.post('/user/register', UserController.registerUser)
router.post('/user/login', UserController.loginUser)
router.get('/user/auth', UserController.checkAuth)


module.exports = router