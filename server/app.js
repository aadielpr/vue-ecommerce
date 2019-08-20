if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const errhandler = require('./middlewares/errhandler')


mongoose.connect('mongodb://localhost:27017/e-commerce', { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log(err)
    }
    else {
        console.log('Database connected')
    }
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', routes)

app.use(errhandler)

module.exports = app