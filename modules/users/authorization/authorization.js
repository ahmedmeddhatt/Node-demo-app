const jwt = require('jsonwebtoken')
const User = require('../model/model')

module.exports =async function (req, res, next) {
    let token
    if(req.headers.authorization &&  req.headers.authorization.startsWith('Bearer')){
     token = req.headers.authorization.split(' ')[1]
    }
    console.log('tokkk' , token);
        if(!token) {
        res.status(401)
        .json({status: 'failed' , message: 'You are not logged in!'})
    }
    try {
    const vertified = jwt.verify(token , process.env.JWT_SECRET);
    const currentUser = await User.findById(vertified._id)
    console.log(vertified);
    console.log(vertified._id);
    req.user = currentUser
    next()
    } catch (error) {
        res.status(401)
        .json({status: 'failed' , message: 'Invalid token!'})
    }
}