const express = require('express')
const cors = require('cors')
const app = express()
var morgan = require('morgan')
app.use(express.json())
app.use(cors())

const password = process.argv[2]

const url =
	`mongodb+srv://appUser:${password}@cluster0-unjnw.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})



const Person = mongoose.model('Person', bookSchema)

morgan.token('body', function(req) {
	if (req.method !== 'POST') { return ' ' }
	return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


const generateId = () => {
	const maxId = Math.floor(Math.random() * Math.floor(100000000))
	return maxId
}

const getDateStringCustom = () => {
	const oDate = new Date()
	var sDate = ''
	if (oDate instanceof Date) {
		sDate = oDate.getYear() + 1900
			+ ':'
			+ ((oDate.getMonth() + 1 < 10) ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1)
			+ ':' + oDate.getDate()
			+ ':' + oDate.getHours()
			+ ':' + ((oDate.getMinutes() < 10) ? '0' + (oDate.getMinutes()) : oDate.getMinutes())
			+ ':' + ((oDate.getSeconds() < 10) ? '0' + (oDate.getSeconds()) : oDate.getSeconds());
	} else {
		throw new Error("oDate is not an instance of Date");
	}
	return sDate;
}

const requestLogger = (request, response, next) => {
	console.log('Method: ', request.method)
	console.log('Path: ', request.path)
	console.log('Body: ', request.body)
	console.log('Response Body: ', response.body)
	console.log('---')
	next()
}
app.use(requestLogger)

app.get('/', (req, res) => {
	res.send('<h1>Hello world!</h1>')
})

app.get('/info', (request, response) => {
	const text = `<p>Phonebook has info for ${persons.length} people</p>
					<p> ${getDateStringCustom()}</p>`
	response.send(text
	)
})

app.get('/api/persons/:id', (request, response) => {

	const id = Number(request.params.id)
	const person = persons.find(person => person.id === id)
	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})


app.get('/api/persons', (request, response) => {
	Person.find({}).then(
		result => {
			response.json(result)
		})
})
app.post('/api/persons', (request, response) => {
	const body = request.body
	if (!body.name ||
		!body.number) {
		return response.status(400).json({ error: 'content missing'})
	}
	if (persons.find(person => person.name === body.name)) {
		return response.status(400).json({ error: 'name must be unique'})
	}
	const person = {
		name: body.name,
		number:body.number,
		id: generateId()
	}

	persons = persons.concat(person)
	response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)
	response.status(204).end()

})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)