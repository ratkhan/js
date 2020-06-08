import React, {useEffect, useState} from 'react'
import Filter from './components/Filter'
import PersonForm from "./components/PersonForm";
import PersonDisplay from "./components/PersonDisplay";
import Notification from "./components/Notification";
import personService from './service/persons';

import './index.css'

function Contains(persons, Name) {
    return persons.map(person => person.name).includes(Name)
}

const App = () => {
    const [persons, setPersons ] = useState([])
    const [ newName, setNewName] = useState('')
    const [ newPhone, setNewPhone]= useState('')
    const [ searchValue, setSearch] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [message, setMessage] = useState(null)

    const peopleFiltered = searchValue?
        persons.filter(person=>person.name.toLowerCase().startsWith(searchValue.toString().toLowerCase())):persons

    const changeNumber = id => {
        const person = persons.find(n => n.id === id)
        const changedPerson = {...person, number: newPhone}

        personService
            .update(id, changedPerson)
            .then(response => {
            setPersons(persons.map(person => person.id !== id? person : response.data))
        })
            .catch(error => {
                setErrorMessage(`Could not change number`)
                console.log(error.response.data)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
                personService
                    .getAll()
                    .then(response => {
                        setPersons(response.data)
                    })
            })
    }

    const erasePerson = id => {
        const person = persons.find(n => n.id === id)
        if (window.confirm(`Delete ${person.name}`)) {
            personService
                .erase(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                })
                .catch(error => {
                    setErrorMessage(`Information of '${person.name}' has already been removed from server`)
                    console.log(error.response.data)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                    setPersons(persons.filter(person => person.id !== id))
                })
        }
    }

    useEffect(() => {
        console.log('effect')
        personService
            .getAll()
            .then(response => {
                setPersons(response.data)
            })
    }, []);

    const addPerson = (event) => {
        event.preventDefault()
        const nameObject = {
            name: newName,
            number: newPhone
        }
        const person = persons.find(n => n.name === newName)
        if (!Contains(persons,newName)) {
            personService
                .create(nameObject)
                .then(response => {
                    setPersons(persons.concat(response.data))
                })
                .then(result => {
                    setMessage(`Added ${newName}`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setErrorMessage(`Entry could not be saved '${error.response.data.toString()}'`)
                    console.log('should display error')
                    console.log(error.response.data)
                    setTimeout(() => {
                        setErrorMessage(null)
                }, 5000)
            })
        } else {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
                changeNumber(person.id)
            }
        }

        setNewName('');
        setNewPhone('');

    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handlePhoneChange = (event) => {
        setNewPhone(event.target.value);
    }
    const handleFilter = (event) => {
        setSearch(event.target.value);
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={errorMessage} type={"error"} />
            <Notification message={message} type={"message"} />
            <Filter searchValue={searchValue} handleFilter={handleFilter}/>
            <h2>add a new</h2>
            <PersonForm id={newName} addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
                        newPhone={newPhone} handlePhoneChange={handlePhoneChange}/>
            <h2>Numbers</h2>
            <PersonDisplay peopleFiltered={peopleFiltered} changeNumber={erasePerson}/>
        </div>
    )
}


export default App


