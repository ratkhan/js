const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
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

beforeEach( async () => {
    await Blog.deleteMany({});

    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();

});

test('notes are returned as json', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(2);
});

test('the first blog title should be Blog1', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].title).toBe('Blog1');
});

afterAll(() => {
    mongoose.connection.close();
});