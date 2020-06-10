const blogsRouter = require('express').Router();
const Blog = require('../model/blog');
require('express-async-errors');


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs.map(blogs => blogs.toJSON()));
});

blogsRouter.get('/:title', async(request, response, next) => {
    try{
        const blog = await Blog.findOne({title:request.params.title});
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
    if ((body.url && body.title)) {
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0
        });
        try {
            const savedBlog = await blog.save();
            response.json(savedBlog.toJSON());
        } catch (exception) {
            next(exception);
        }
    } else {
        response.status(400).end();
    }
});

blogsRouter.put('/:title', async (request, response) => {
    const body = request.body;

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    };

    const result = await Blog.findOneAndUpdate(request.params.title, blog, {new:true});
    response.json(result);
});

blogsRouter.delete('/:title', async(request, response) => {
    await Blog.findOneAndRemove({title:request.params.title});
    response.status(204).end();
});

module.exports = blogsRouter;
