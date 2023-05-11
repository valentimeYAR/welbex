const express = require('express');
const sequelize = require('./db')
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors());

const server = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(3000, () => console.log('Server listening on port 3000'))
    } catch (e) {
        console.log(e)
    }
}

server()
