import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('');

  const [errorMessage, setErrorMessage] = useState(null)

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  console.log('render', persons.length, 'persons')

  const handleNameInputChange = (event) =>
  {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberInputChange = (event) =>
  {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const handleFilterInputChange = (event) => {
    setFilter(event.target.value);
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    const confirmation = window.confirm(`Delete ${personToDelete.name}?`);

    if (confirmation) 
    {
      const updatedPersons = persons.filter((person) => person.id !== id);
      personService
      .remove(id)
      .then(() => {
        setPersons(updatedPersons)
      })
    }
  }
  
  const filteredPersons = persons.filter((person) => {
    return(    
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
  })

  const addContact = (event) => {
    event.preventDefault();
  
    const isNameExist = persons.some((person) => person.name === newName);
    const personToAdd = persons.find((person) => person.name === newName);
  
    if (isNameExist) {
      const replaceConfirmation = window.confirm(
        `${personToAdd.name} is already added to the phonebook, replace the old number with a new one?`
      );
  
      if (replaceConfirmation) {
        const updatedPerson = {
          ...personToAdd,
          number: newNumber,
        };
  
        personService
          .update(personToAdd.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === personToAdd.id ? response.data : person
              )
            );
            setNewName('');
            setNewNumber('');
            setIsSuccess(true);
            setErrorMessage(`Updated ${personToAdd.name}`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setIsSuccess(false);
            setErrorMessage(
              `Error: Information of ${personToAdd.name} has already been removed from the server`
              );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      const contactObject = {
        name: newName,
        number: newNumber,
      };
  
      personService
        .create(contactObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('');
          setIsSuccess(true);
          setErrorMessage(`Added ${newName}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setIsSuccess(false);
          setErrorMessage(
            `Failed to update information.`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };
  
  
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} isSuccess={isSuccess}/>
      <Filter filter={filter} handleFilterInputChange={handleFilterInputChange}/>

      <h2>add a new</h2>
      <PersonForm 
      addContact={addContact} 
      newName={newName} 
      handleNameInputChange={handleNameInputChange}
      newNumber={newNumber}
      handleNumberInputChange={handleNumberInputChange}/>

      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person =>
          <Person key={person.id} person={person} onDelete={() => handleDelete(person.id)}/>)}
      </ul>
    </div>
  )
}

export default App