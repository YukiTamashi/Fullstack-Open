import { useState} from 'react'
import Form from './Form'
import Server from './Services'

const NumbersList = ({persons, setPersons, setNotification}) => {
    const [filter, setFilter] = useState('')
    const handleFilter = (e) => setFilter(e.target.value)
    return (
    <div>
      <h3>Numbers</h3>
      <Form.Input name={'Filter'} value={filter} event={handleFilter} />
      <List persons={persons} filter={filter} setPersons={setPersons} setNotification={setNotification} />
    </div>
    )
  }
  
  const List = ({persons, filter, setPersons, setNotification}) => (
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
              setNotification({message:`${person.name} already removed`, type: 'Error'})
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
    <li>{person.name} - {person.number}<button onClick={remove}>Remove</button></li>
  )
    }
  
  const IncludesInsensitive = (toCompare, filter) => (
    toCompare.toLowerCase().includes(filter.toLowerCase())
  )

  export default NumbersList