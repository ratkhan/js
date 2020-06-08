const personsRouter = require('express').Router();
const Person = require ('../model/person');
const getDate = require('../utils/date');

const generateId = () => {
    const maxId = Math.floor(Math.random() * Math.floor(100000000));
    return maxId;
};

personsRouter.get('/info', (request, response, next) => {
    Person.countDocuments()
        .then(result => {
            const message = `<p>Phonebook has info for ${result} people</p>
					<p> ${getDate}</p>`;
            response.send(message).end();
        })
        .catch(error => next(error));
});

personsRouter.get('/:id', (request, response, next) => {
    Person.findOne({id:request.params.id}).then(person => {
        if (person) {
            response.json(person);
        } else {
            response.status(404).end();
        }
    }).catch((error) => {
        next(error);
    });
});


personsRouter.get('/', (request, response) => {
    Person.find({}).then(
        result => {
            response.json(result);
        });
});

personsRouter.post('/', (request, response, next) => {
    const body = request.body;

    const person = new Person ({
        name: body.name,
        number: body.number,
        id: generateId()
    });

    person.save()
        .then(savedPerson => {
            return savedPerson.toJSON();
        })
        .then(savedAndFormatedPerson => {
            response.json(savedAndFormatedPerson);
        })
        .catch(error => next(error));
});

personsRouter.delete('/:id', (request, response,next) => {
    Person.findOneAndRemove({id : request.params.id})
        .then(result => {
            response.status(204).end();
        })
        .catch(error => next(error));
});

personsRouter.put('/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number,
        id: body.id,
    };

    Person.findOneAndUpdate(request.params.id, person, {new:true, runValidators: true } )
        .then(updatedPerson => {
            response.json(updatedPerson);
        })
        .catch(error => next(error));
});

module.exports = personsRouter;