const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    async registerUser(req, res) {
        const {login, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            login: login,
            password: hashedPassword
        })
        return res.status(200).json(user)
    }

    async loginUser(req, res) {
        const {login, password} = req.body
        const user = await User.findOne({
            where: {
                login: login
            }
        })
        const comparePassword = await bcrypt.hash(password, 10)
        if (comparePassword && user) {
            const token = jwt.sign({login: login}, "secret")
            return res.status(200).json({token, message: 'Authentication successful'})
        } else return res.status(403).json({message: 'Invalid login or password'})
    }

    async checkAuth(req, res) {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(" ")[1]

        const decoded = jwt.verify(token, 'secret')
        const {login} = decoded
        const user = await User.findOne({
            where: {
                login: login
            }
        })
        return res.status(200).json(user)
    }
}

module.exports = new UserController()