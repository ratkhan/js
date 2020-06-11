const bcrypt = require('bcrypt');
const User = require('../model/user');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('secret', 10);
        const user = new User({username: 'root',name:'Ratkhan', passwordHash});
        await user.save();
    });

    test('creation succeeds with a new username', async() => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'ratkhan',
            name: 'Ratkhan Sagibazarov',
            password: 'secret'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);

    });

    test('creating fails with status code 400 if username already exists', async() => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen'
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('`username` to be unique');

        const userAtEnd = await helper.usersInDb();
        expect(userAtEnd).toHaveLength(usersAtStart.length);
    });


});
