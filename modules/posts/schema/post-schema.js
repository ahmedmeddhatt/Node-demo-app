const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{type: String ,
         required : true ,
          min:6 ,
           max: 100 },

    description:{type: String ,
        required : true ,
        min:6 ,
        max: 100},

    date: {type: Date , 
            default: Date.now } , 

    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},

    postImgUrl:{type:String} ,
    
    },
    {
    toJSON:{virtuals:true},
    toObject: {virtuals:true},
    }
)

module.exports = postSchema