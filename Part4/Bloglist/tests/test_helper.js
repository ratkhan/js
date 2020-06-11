const Blog = require('../model/blog');
const User = require('../model/user');

const initialBlogs = [{
    content: {
        title: 'Blog1',
        author: 'Ratkhan Saginbazarov',
        url: 'local',
        likes: 24
    },
    user: '5ee1ac2fa0cedc4a64d6aaa4'
},
{
    content: {
        title: 'Blog2',
        author: 'Ratkhan Saginbazarov',
        url: 'local',
        likes: 25
    },
    user: '5ee1ac2fa0cedc4a64d6aaa4'
}];




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

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(user => user.toJSON());
};

module.exports = {
    initialBlogs,
    notExistingId,
    blogsInDb,
    usersInDb
};