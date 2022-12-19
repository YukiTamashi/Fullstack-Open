import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', 
      id: 1,
    }
  ]) 
  const [newName, setNewName] = useState('')

  const handleName = (e) => setNewName(e.target.value)
  const addPerson = (e) => {
    e.preventDefault();
    if (persons.some(person => IncludesInsensitive(person.name, newName))){
      alert(`${newName} already on the list`);
    }
    else{
      setPersons(persons.concat({name: newName, id: persons.length + 1}));
    }
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <input value={newName} onChange={handleName}/>
        </div>
        <div>
          <button onClick={addPerson} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <List persons={persons} />
    </div>
  )
}

const List = ({persons}) => (
  <ul>
  {persons.map((person)=><Number key={person.id} person={person} />)}
  </ul>
)

const Number =({person}) => (
  <li>{person.name}</li>
)

const IncludesInsensitive = (toCompare, compared) => (
  toCompare.toLowerCase() === compared.toLowerCase()
)

export default App