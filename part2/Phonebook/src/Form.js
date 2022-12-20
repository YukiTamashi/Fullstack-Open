import { useState } from 'react'
import Server from './Services'

const Form = ({persons, set}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const handleName = e => setNewName(e.target.value)
    const handleNumber = e => setNewNumber(e.target.value)
    const MatchesInsensitive = (toCompare, compared) => (
      toCompare.toLowerCase() === compared.toLowerCase())
    const addPerson = (e) => {
      e.preventDefault();
      const filtered = persons.filter(person => MatchesInsensitive(person.name, newName))
      if (filtered.length !== 0){
        const newArray = persons.filter(person => person.id !== filtered[0].id) 
        Server
          .updatePerson({name: newName, number: newNumber})
          .then(data => set(newArray.concat(data)))
      }
      else{
        Server
          .newPerson({name: newName, number: newNumber})
          .then(data => set(persons.concat(data)))
      }
      setNewNumber('');
      setNewName('');
    }
  
    return (
    <form>
      <h3>Add new</h3>
      <Input name={'Name'} value={newName} event={handleName} />
      <Input name={'Number'} value={newNumber} event={handleNumber} />
      <div><button onClick={addPerson}>add</button></div>
    </form>
    )
}

const Input = ({name, value, event}) => (
    <div>{name}: <input value={value} onChange={event}/></div>
  )

export default Form