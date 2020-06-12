const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const User = require('../model/user');
const Blog = require('../model/blog');
const bcrypt = require('bcrypt');
const logger = require('../utils/logger');

beforeEach( async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({username: 'root',name:'Ratkhan', passwordHash});
    const savedUser = await user.save();
    const userId = savedUser.id;
    logger.info('created user with id', userId);
    await Blog.deleteMany({});

    const userToLogin = {
        username: user.username,
        password: 'secret'
    };

    const loggedInUser = await api
        .post('/api/login')
        .send(userToLogin);

    const token = loggedInUser.token;

    let blogObject = new Blog(helper.initialBlogs[0]);
    blogObject.user = userId.toString();
    await blogObject.save();

    blogObject = new Blog(helper.initialBlogs[1]);
    blogObject.user = userId.toString();
    await blogObject.save();

});

test('blogs are returned as json', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('the first blog title should be Blog1', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].title).toBe(helper.initialBlogs[0].title);
});

test('a valid blog can be added', async () => {
    const users = await helper.usersInDb();
    logger.info(users);
    const user = users[0];
    const newBlog = {
        content: {
            title: 'Blog3',
            author: 'Ratkhan 1',
            url: 'local',
            likes: 26
        },
        user: user.id
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map(b => b.title);
    expect(contents).toContain(
        newBlog.title
    );
});

test('blog without content is not added', async () => {
    const newBlog = {
        content:
            {likes: 22}
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test('a specific blog can be viewed', async() => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-type', /application\/json/);
    expect(JSON.stringify(resultBlog.body)).toEqual(JSON.stringify(blogToView));
});

test('a blog can be deleted', async() => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const title = blogsAtEnd.map(b => b.content.title);
    expect(title).not.toContain(blogToDelete.content.title);
});

test('an id field is defined', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blog = blogsAtStart[0];
    console.log(blog.title);
    expect((blog.id));
});

test('cannot add a blog without title or url', async () => {
    const NoTitleBlog = {
        content: {
            author: 'Ratkhan',
            url: 'local',
            likes: 26
        }
    };

    await api
        .post('/api/blogs')
        .send(NoTitleBlog)
        .expect(400);

    let blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const NoUrlBlog = {
        content: {
            title: 'Blog8',
            author: 'Ratkhan',
            likes: 26
        }
    };

    await api
        .post('/api/blogs')
        .send(NoUrlBlog)
        .expect(400);

    blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

});

test('can change content of blog defined by title', async () => {
    const blogToChange = {
        title: 'Blog1',
        author: 'Ratkhan',
        url: 'local',
        likes: 26
    };

    await api
        .put(`/api/blogs/${blogToChange.title}`)
        .send(blogToChange)
        .expect(200)
        .expect('Content-Type', /application\/json/);
});


afterAll(() => {
    mongoose.connection.close();
});