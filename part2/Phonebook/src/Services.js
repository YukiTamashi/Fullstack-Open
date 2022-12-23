import axios from 'axios'

const baseUrl = '/api/persons'
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

const deletePerson = (data) => {
    console.log(data)
    return (
    axios
        .delete(`${baseUrl}/${data.id}`)
        .then(response =>
            response.data)
)
        }
const Server = {
    getPersons,
    newPerson,
    updatePerson,
    deletePerson
}

export default Server