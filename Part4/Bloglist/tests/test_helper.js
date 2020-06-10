const Blog = require('../model/blog');

const initialBlogs = [
    {
        title: 'Blog1',
        author: 'Ratkhan Saginbazarov',
        url: 'local',
        likes: 24
    },
    {
        title: 'Blog2',
        author: 'Ratkhan Saginbazarov',
        url: 'local',
        likes: 25
    }
];

const notExistingId = async () => {
    const blog = new Blog({title: 'EmptyBlog'});
    await blog.save();
    await blog.remove();

    return blog._id.toString();
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

module.exports = {
    initialBlogs,
    notExistingId,
    blogsInDb
};