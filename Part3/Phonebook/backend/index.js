require('dotenv').config();
const express = require('express');
const Person = require('./model/person');
const getDate = require('./date');
const cors = require('cors');
const app = express();
var morgan = require('morgan');
app.use(express.json());
app.use(cors());

//none essential


morgan.token('body', function(req) {
    if (req.method !== 'POST') { return ' ';}
    return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));




const generateId = () => {
    const maxId = Math.floor(Math.random() * Math.floor(100000000));
    return maxId;
};


const requestLogger = (request, response, next) => {
    console.log(getDate);
    next();
};
app.use(requestLogger);

app.get('/', (request, response) => {
    request.send('<h1>Hello world!</h1>');
});

app.get('/info', (request, response, next) => {
    Person.countDocuments()
        .then(result => {
            const message = `<p>Phonebook has info for ${result} people</p>
					<p> ${getDate}</p>`;
            response.send(message).end();
        })
        .catch(error => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
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


app.get('/api/persons', (request, response) => {
    Person.find({}).then(
        result => {
            response.json(result);
        });
});

app.post('/api/persons', (request, response, next) => {
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

app.delete('/api/persons/:id', (request, response,next) => {
    Person.findOneAndRemove({id : request.params.id})
        .then(result => {
            response.status(204).end();
        })
        .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
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


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'});
};
app.use(unknownEndpoint);


const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'});
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message});
    }

    next(error);
};

app.use(errorHandler);