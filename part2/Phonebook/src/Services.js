import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'
const getPersons = () => (
   axios
      .get(baseUrl)
      .then(response => 
        response.data
      )
)

const newPerson = (data) => (
    axios
        .post(baseUrl, data)
        .then(response =>
            response.data)
)

const updatePerson = (data) => (
    axios
        .put(`${baseUrl}/${data.id}`, data)
        .then(response =>
            response.data)
)

const deletePerson = (data) => (
    axios
        .delete(`${baseUrl}/${data.id}`)
        .then(response =>
            response.data)
)

const Server = {
    getPersons,
    newPerson,
    updatePerson,
    deletePerson
}

export default Server