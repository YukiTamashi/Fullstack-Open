import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleName = (e) => setNewName(e.target.value)
  const handleNumber = (e) => setNewNumber(e.target.value)
  const handleFilter = (e) => setFilter(e.target.value)
  const addPerson = (e) => {
    e.preventDefault();
    if (persons.some(person => MatchesInsensitive(person.name, newName))){
      alert(`${newName} already on the list`);
    }
    else{
      setPersons(persons.concat({name: newName, number: newNumber, id: persons.length + 1}));
    }
    setNewNumber('');
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add new</h3>
      <form>
        <Input name={'Name'} value={newName} event={handleName} />
        <Input name={'Number'} value={newNumber} event={handleNumber} />
        <div><button onClick={addPerson}>add</button></div>
      </form>
      <h3>Numbers</h3>
      <Input name={'Filter'} value={filter} event={handleFilter} />
      <List persons={persons} filter={filter} />
    </div>
  )
}

const List = ({persons, filter}) => (
  <ul>
  {persons
    .filter((person) => 
      IncludesInsensitive(person.name, filter))
    .map((person)=>
      <Number key={person.id} person={person} />)
  }
  </ul>
)

const Number =({person}) => (
  <li>{person.name} - {person.number}</li>
)

const MatchesInsensitive = (toCompare, compared) => (
  toCompare.toLowerCase() === compared.toLowerCase()
)

const IncludesInsensitive = (toCompare, filter) => (
  toCompare.toLowerCase().includes(filter.toLowerCase())
)

const Input = ({name, value, event}) => (
  <div>{name}: <input value={value} onChange={event}/></div>
)

export default App