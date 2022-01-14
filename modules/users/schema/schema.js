const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type: String ,
         required : true ,
          min:6 ,
           max: 100 },

    email:{type: String ,
        required : true ,
        min:6 ,
        max: 100},

    password:{type: String ,
        required : true ,
        min:6 ,
        max: 100} ,
    
    date: {type: Date , 
            default: Date.now },
            
    role:{type: String,
         enum:['admin' , 'editor', 'viewer'] ,
        default:'viewer'},

})



module.exports = userSchema