import { useState, useEffect } from 'react'
import Form from './Form'
import Input from './Form'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response)
        setPersons(response.data)
      })
    }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Form persons={persons} set={setPersons} />
      <NumbersList persons={persons} /> 
    </div>
  )
}



const NumbersList = ({persons, }) => {
  const [filter, setFilter] = useState('')
  const handleFilter = (e) => setFilter(e.target.value)
  return (
  <div>
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

const IncludesInsensitive = (toCompare, filter) => (
  toCompare.toLowerCase().includes(filter.toLowerCase())
)

export default App