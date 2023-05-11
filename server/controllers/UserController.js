const {User} = require('../models/models')

class UserController{
    async foo(){
        let user = await User.findAll()
    }
}

module.exports = new UserController()