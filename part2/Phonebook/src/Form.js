import { useState } from 'react'

const Form = ({persons, set}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const handleName = e => setNewName(e.target.value)
    const handleNumber = e => setNewNumber(e.target.value)
    const MatchesInsensitive = (toCompare, compared) => (
      toCompare.toLowerCase() === compared.toLowerCase())
    const addPerson = (e) => {
      e.preventDefault();
      if (persons.some(person => MatchesInsensitive(person.name, newName))){
        alert(`${newName} already on the list`);
      }
      else{
        set(persons.concat({name: newName, number: newNumber, id: persons.length + 1}));
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