import { useState, useEffect } from 'react'
import Form from './Form'
import Server from './Services'

const App = () => {
  const [persons, setPersons] = useState([]) 
  

  useEffect(() => {
      Server
        .getPersons()
        .then(data =>
          setPersons(data))
    }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Form.Form persons={persons} set={setPersons} />
      <NumbersList persons={persons} setPersons={setPersons} /> 
    </div>
  )
}



const NumbersList = ({persons, setPersons}) => {
  const [filter, setFilter] = useState('')
  const handleFilter = (e) => setFilter(e.target.value)
  return (
  <div>
    <h3>Numbers</h3>
    <Form.Input name={'Filter'} value={filter} event={handleFilter} />
    <List persons={persons} filter={filter} setPersons={setPersons} />
  </div>
  )
}

const List = ({persons, filter, setPersons}) => (
  <ul>
  {persons
    .filter((person) => 
      IncludesInsensitive(person.name, filter))
    .map((person)=>{
      const remove = () => {
        Server
          .deletePerson(person)
          .then(() =>
            setPersons(persons.filter(a => a.id !== person.id)))
          .catch(() => {
            alert("Person already removed")
            setPersons(persons.filter(a => a.id !== person.id))})
      }
      return <Number key={person.id} person={person} remove={remove}/>
    }
      )
  }
  </ul>
)

const Number =({person, remove}) => {
  
  return(
  <li>{person.name} - {person.number}<button onClick={remove}></button></li>
)
  }

const IncludesInsensitive = (toCompare, filter) => (
  toCompare.toLowerCase().includes(filter.toLowerCase())
)

export default App