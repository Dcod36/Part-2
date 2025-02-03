import { useState, useEffect } from "react";
import personsService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch initial data from the server
  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  // Function to add a new person
  const addPerson = (event) => {
    event.preventDefault();
    const personExists = persons.find(person => person.name === newName);

    if (personExists) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    personsService.create(newPerson).then(returnedPerson => {
      setPersons([...persons, returnedPerson]);
      setNewName('');
      setNewNumber('');
    });
  };

  // Function to delete a person
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this person?");
    if (confirmed) {
      personsService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id));
      });
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
