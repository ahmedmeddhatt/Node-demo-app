const mongoose = require('mongoose');
const postSchema = require('../schema/post-schema');

const postModel = mongoose.model('Post',postSchema);

module .exports = postModel;