const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true, unique: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
})

const Article = sequelize.define('article', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true, unique: true},
    author: {type: DataTypes.INTEGER},
    text: {type: DataTypes.TEXT}
})

User.hasMany(Article, {as: 'article', foreignKey: 'author'})
Article.belongsTo(User,{as: 'user', foreignKey: 'author'})

module.exports = {
    User, Article
}