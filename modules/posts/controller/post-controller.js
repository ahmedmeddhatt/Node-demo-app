const Post = require('../model/post-model')
const userModel = require('../../users/model/model')
const path=require('path')


const getAllPosts = async(req,res)=>{
    let{page,size}=req.query
    if(!page){page=1};
    if(!size){size=20};
    const limit=parseInt(size);
    const skip=(page-1)*size;
    const totalResult=await Post.count();
    const totalPages=Math.ceil(totalResult/limit);
    let data= await Post.find({}).limit(limit)
    .skip(skip).populate("userId","email",userModel)

    res.json({message:"all",page,size,totalResult,totalPages,data})
}


const createPost = async (req, res) =>{
    try {
        const newPost = await Post.create({ 
            title : req.body.title ,
            description: req.body.description ,
            userId: req.user._id ,
            role: req.body.role 
        }) ;
            console.log(req.user, "user");
         res.status(201).json
         ({ status : 'success' , data : { Post : newPost} }); 
        
    } catch (error) {
        console.log(req.user);

        res.status(404)
        .json({status: 'failed' , message: error.errors})
    }
        }




const getPost = async(req, res) => {
    const post = await Post.findById(req.params.id)
    if(!post){
        res.status(404)
        .json({status: 'failed' , message: 'Post not found'})
    }else{
        res.status(201).json
        ({ status : 'success' , data : { Post : post} }); 
    }
}

const updatePost = async(req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if(!post){
        res.status(404)
        .json({status: 'failed' , message: 'Post not found'})
    }else{
        res.status(201).json
        ({ status : 'success' , data : { Post : post} }); 
    }
}

const deletePost = async(req, res) => {
    await Post.findByIdAndDelete(req.params.id)

        res.status(204).
        json({status: 'success' })
    

}

module.exports = {
  getAllPosts,
  createPost,
  getPost ,
  updatePost ,
  deletePost 

}
