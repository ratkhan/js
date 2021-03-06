const usersRouter = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');

usersRouter.post('/', async(request, response) => {
    const body = request.body;

    const saltRounds = 10;
    if (!body.password){
        return response.status(400).json({
            error: 'password empty'
        });
    }
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    });

    const savedUser = await user.save();

    response.json(savedUser);
});

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', {content: 1, id: 1});
    response.json(users.map(user => user.toJSON()));
});

module.exports = usersRouter;