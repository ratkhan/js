const blogsRouter = require('express').Router();
const Blog = require('../model/blog');


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs.map(blogs => blogs.toJSON()));
});

blogsRouter.post('/',async (request, response) => {
    const blog = new Blog(request.body);

    const result = await blog.save();
    response.status(201).json(result);
});

module.exports = blogsRouter;