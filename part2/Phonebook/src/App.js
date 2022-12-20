import { useState, useEffect } from 'react'
import Form from './Form'
import Input from './Form'
import Server from './Services'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const remove = (data) => {
    Server
      .deletePerson(data)
      .then(removed =>
        setPersons(persons.filter(person => person.id !== removed.id)))
  }

  useEffect(() => {
      Server
        .getPersons()
        .then(data =>
          setPersons(data))
    }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Form persons={persons} set={setPersons} />
      <NumbersList persons={persons} remove={remove} /> 
    </div>
  )
}



const NumbersList = ({persons, remove}) => {
  const [filter, setFilter] = useState('')
  const handleFilter = (e) => setFilter(e.target.value)
  return (
  <div>
    <h3>Numbers</h3>
    <Input name={'Filter'} value={filter} event={handleFilter} />
    <List persons={persons} filter={filter} remove={remove} />
  </div>
  )
}

const List = ({persons, filter, remove}) => (
  <ul>
  {persons
    .filter((person) => 
      IncludesInsensitive(person.name, filter))
    .map((person)=>
      <Number key={person.id} person={person} remove={remove}/>)
  }
  </ul>
)

const Number =({person, remove}) => (
  <li>{person.name} - {person.number}<button onClick={remove}></button></li>
)

const IncludesInsensitive = (toCompare, filter) => (
  toCompare.toLowerCase().includes(filter.toLowerCase())
)

export default App