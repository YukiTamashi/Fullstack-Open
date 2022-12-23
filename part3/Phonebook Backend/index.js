const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

let persons = [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
    ];

morgan.token('body', req => (JSON.stringify(req.body)));

app.use(express.static('build'))
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', 
  {skip: (request, response) => (
    request.method !== 'POST')}));


app.get('/info', (request, response) =>{
    const size = persons.length;
    const date = new Date();
    response.send(`<p>Phonebook has info for ${size} people</p>
    <p>${date}</p>`);
})

app.get('/api/persons', (request, response) =>{
    response.json(persons);
})

app.get('/api/persons/:id', (request, response) =>{
    const id = Number(request.params.id);
    const person = persons.find(p => p.id === id);
    if (person) {
        response.json(person);
    }
    else{
        response.status(404).end();
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
  
    response.status(204).end()
  })

app.post('/api/persons', (request, response) =>{
    const data = request.body;
    const newId = getNewId();
    const name = data.name;
    const number = data.number;
    if (name === undefined){
      return response
              .status(400)
              .statusMessage('name field empty')
              .end();
    }
    if (number === undefined){
      return response
              .status(400)
              .statusMessage('number field empty')
              .end();
    }
    if (nonUnique(name)){
      return response
              .status(400)
              .statusMessage('name must be unique')
              .end();
    }

    const person = {
        name,
        number,
        id: newId
    };

    persons.push(person);

    response.json(person);

});

function getNewId() {
    return Math.floor(Math.random() * 10000000) 
}

function nonUnique(name) {
    persons.includes(name)
}

app.listen(3001);