const Router = require('express').Router()
const {register , login}= require('../controller/controller')
const validator = require('../../../validator/validator')
const {registerJoi , loginJoi} = require('../joi/joi')


Router.post('/register',validator(registerJoi), register)
Router.post('/login',validator(loginJoi), login)


module.exports = Router