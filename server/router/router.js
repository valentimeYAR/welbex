const Router = require('express')
const router = new Router()
const UserController = require('../controllers/UserController')
const ArticleController = require('../controllers/ArticleController')

// User
router.post('/user/register', UserController.registerUser)
router.post('/user/login', UserController.loginUser)
router.get('/user/auth', UserController.checkAuth)


// Article
router.post('/article/', ArticleController.addArticle)
router.get('/articles', ArticleController.getArticles)
router.get('/article/:id', ArticleController.getArticle)


module.exports = router