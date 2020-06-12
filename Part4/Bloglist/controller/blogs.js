const blogsRouter = require('express').Router();
const Blog = require('../model/blog');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger')
require('express-async-errors');



blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', {name:1, id:1});
    response.json(blogs.map(blogs => blogs.toJSON()));
});

blogsRouter.get('/:id', async(request, response, next) => {
    try{
        const blog = await Blog.findById(request.params.id);
        if (blog) {
            response.json(blog.toJSON());
        } else {
            response.status(404).end();
        }
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.post('/',async (request, response, next) => {
    const body = request.body;
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if(!request.token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'});
    }

    const user = await User.findById(decodedToken.id);

    if ((body.content.url && body.content.title)) {
        const blog = new Blog({
            content: {
                title: body.content.title,
                author: body.content.author,
                url: body.content.url,
                likes: body.content.likes || 0
            },
            user: user._id
        });
        try {
            const savedBlog = await blog.save();
            user.blogs = user.blogs.concat(savedBlog._id);
            await user.save();
            response.status(201).json(savedBlog.toJSON());
        } catch (exception) {
            next(exception);
        }
    } else {
        response.status(400).end();
    }
});

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body;

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    };

    const result = await Blog.findOneAndUpdate(request.params._id, blog, {new:true});
    response.json(result);
});

blogsRouter.delete('/:id', async(request, response) => {
    const blogToDeleteId = await request.params.id;
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if(!request.token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'});
    }

    const user = await User.findById(decodedToken.id);
    const blogToDelete = await Blog.findById(blogToDeleteId);
    logger.info(blogToDelete);

    const userId = blogToDelete.user;
    if (!user.equals(userId)){
        return response.status(401).json({error: 'token missing or invalid'});
    }
    await Blog.findByIdAndRemove(blogToDeleteId);
    response.status(204).end();
});

module.exports = blogsRouter;
