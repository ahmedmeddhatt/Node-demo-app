const User = require('../model/model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const register = async (req,res)=>{
    const {email} = req.body
    //check if email is already registered
    const checkUser = await User.findOne({email: email})
    if(checkUser){
        res.status(400)
        .json({status:'failed' , message:'Email has already registered'})
    } else{
        // hash the password
        const hashed = await bcrypt.hash(req.body.password,7)
       
        // create new user
        const user = new User({
            name: req.body.name , 
            email: req.body.email ,
            password : hashed ,
            role:req.body.role ,
        })
        try {
            const savedUser = await user.save();
            res.status(200).json({status:'success', data : {user: savedUser}})
        } catch (error) {
        
            res.status(400).json({status: 'failed' , message: error})
        }
        
    }
}


const login = async(req, res) => {
    const {email,password}= req.body
    if(!email || !password){
        res.status(400)
        .json({status: 'failed' , message: 'Please provide email and password'})
    }
    // check if email and pass are exist
    const user = await User.findOne({ email}).select('+password')
    if(!user || !await bcrypt.compare(password, user.password)) {
        res.status(401)
        .json({status: 'failed' , message: 'Incorrect email or password!'})
    }
    const token = jwt.sign({_id:user._id} , process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRE})
    res.status(200).header('auth-token',token)
    .json({status: 'success',token , message: {User :user}})

}

const  restrict = (...roles) => {
    return (req,res, next)=>{
        if(!roles.includes(req.user.role)){
            res.status(403)
            .json({status: 'failed' ,
             message: 'You do not have permission to perform this action'})
                }
        next()
    }
}

module.exports = {register , login , restrict}