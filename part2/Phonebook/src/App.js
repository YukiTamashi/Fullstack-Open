import { useState, useEffect } from 'react'
import Form from './Form'
import Server from './Services'
import NumbersList from './Numbers'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [notification, setNotification] = useState(null)
  
  useEffect(() => {
      Server
        .getPersons()
        .then(data =>
          setPersons(data))
    }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Form.Form persons={persons} set={setPersons} setNotification={setNotification} />
      <NumbersList persons={persons} setPersons={setPersons} setNotification={setNotification} /> 
    </div>
  )
}

export default App