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
  const [successMessage, setSuccessMessage] = useState(null);  // State for success message

  // Fetch initial data from the server
  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  // Function to add or update a person
  const addPerson = (event) => {
    event.preventDefault();

    const personExists = persons.find(person => person.name === newName);

    if (personExists) {
      const confirmUpdate = window.confirm(`${newName} is already in the phonebook. Do you want to update the number?`);

      if (confirmUpdate) {
        // Update the phone number if confirmed
        const updatedPerson = { ...personExists, number: newNumber };
        personsService.update(personExists.id, updatedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== personExists.id ? person : returnedPerson));
          setNewName('');
          setNewNumber('');

          // Show success message
          setSuccessMessage(`Updated ${newName}'s phone number`);
          setTimeout(() => setSuccessMessage(null), 3000); // Hide after 3 seconds
        });
      }
    } else {
      // Add a new person if they don't exist
      const newPerson = { name: newName, number: newNumber };
      personsService.create(newPerson).then(returnedPerson => {
        setPersons([...persons, returnedPerson]);
        setNewName('');
        setNewNumber('');

        // Show success message
        setSuccessMessage(`Added ${newName}`);
        setTimeout(() => setSuccessMessage(null), 3000); // Hide after 3 seconds
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
      
      {/* Success Message */}
      {successMessage && <div className="success">{successMessage}</div>}
      
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
