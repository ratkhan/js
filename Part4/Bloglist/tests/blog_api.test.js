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
    await Blog.deleteMany({});
    await User.deleteMany({});


    let blogObject = new Blog(helper.initialBlogs[0]);
    await blogObject.save();

    blogObject = new Blog(helper.initialBlogs[1]);
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

describe('When a blog is posted to api', () => {
    let headers;

    beforeEach(async () => {
        const newUser = {
            username: 'alina',
            name: 'alina',
            password: 'password'
        };

        await api
            .post('/api/users')
            .send(newUser);

        const result = await api
            .post('/api/login')
            .send(newUser);

        headers = {
            'Authorization': `bearer ${result.body.token}`
        };

    });

    test('a valid blog can be added', async () => {
        const newBlog = {
            content: {
                title: 'Blog3',
                author: 'Ratkhan 1',
                url: 'local',
                likes: 26
            }
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set(headers)
            .expect(201)
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
            .set(headers)
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

    describe('and it is saved to database', () => {
        let result;
        beforeEach(async () => {
            const newBlog = {
                content: {
                    title: 'Great developer experience',
                    author: 'Hector Ramos',
                    url: 'https://jestjs.io/blog/2017/01/30/a-great-developer-experience',
                    likes: 7
                }
            };

            result = await api
                .post('/api/blogs')
                .send(newBlog)
                .set(headers);
        });

        test('it can be removed', async () => {
            const aBlog = result.body;

            const initialBlogs = await helper.blogsInDb();
            await api
                .delete(`/api/blogs/${aBlog.id}`)
                .set(headers)
                .expect(204);

            const blogsAtEnd = await helper.blogsInDb();
            expect(blogsAtEnd.length).toBe(initialBlogs.length - 1);

            const titles = blogsAtEnd.map(b => b.content.title);
            expect(titles).not.toContain(
                aBlog.title
            );
        });
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
            .set(headers)
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
            .set(headers)
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
});

afterAll(() => {
    mongoose.connection.close();
});