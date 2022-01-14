const Router = require('express').Router()
const {getAllPosts,createPost, getPost , updatePost , deletePost } = 
require('../controller/post-controller')
const {restrict} = require('../../users/controller/controller')
const path=require('path')
const auth = require('../../users/authorization/authorization')


// Router.route('/post').post(validator(registerJoi), register)

Router
.route('/')
.get(auth ,restrict('admin', 'editor', 'viewer'),getAllPosts)
.post(auth ,restrict('admin', 'editor'),createPost);

Router
.route('/:id')
.get(auth ,restrict('admin', 'editor', 'viewer'),getPost)
.patch(auth ,restrict('admin', 'editor'),updatePost)
.delete(auth ,restrict('admin'),deletePost)


// Router.route('/')
// .get( getAllPosts)
// .post(auth, createPost);

// Router
// .route('/:id')
// .get(getPost)
// .patch(updatePost)
// .delete(deletePost);

module.exports = Router