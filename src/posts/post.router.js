const router = require('express').Router()
const passport = require('passport')

const postServices = require('./post.http')


router.route('/') //* /api/v1/posts/
    .get(postServices.getAllPosts)
    

    router.route('/:id')   
    .get(postServices.getPostById)
    


	
exports.router = router