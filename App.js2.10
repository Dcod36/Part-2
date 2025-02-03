import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 };
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  };

  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />

      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
