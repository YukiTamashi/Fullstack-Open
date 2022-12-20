import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response.data);
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <NumbersList countries={countries} />
    </div>
  )
}



const NumbersList = ({ countries }) => {
  const [filter, setFilter] = useState('')
  const handleFilter = (e) => setFilter(e.target.value)
  return (
    <div>
      <h3>Filter Countries</h3>
      <Input value={filter} event={handleFilter} />
      <List data={countries} filter={filter} event={setFilter} />
    </div>
  )
}

const List = ({ data, filter, event }) => {
  const filteredData = data
    .filter((data) =>
      IncludesInsensitive(data.name.common, filter));
  if (filteredData.length > 10) {
    return (
      <p>Too many matches</p>
    )
  }
  else if (filteredData.length === 1) {
    return <Country country={filteredData[0]} />
  }
  else {
    return (
      <ul>{
        filteredData.map((data) =>
          <CountryShort key={data.flag} country={data} event={event} />)
      }
      </ul>)
  }
}

const CountryShort = ({ country, event }) => (
  <li>
    {country.name.common}
    <button onClick={() => event(country.name.common)}>show</button>
  </li>
)

const Country = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>

    <p>Capital: {country.capital}</p>
    <p>Area: {country.area}</p>

    <h3>Languages</h3>
    <ul>
      {Object.entries(country.languages).map((lang) => <li key={lang[0]}>{lang[1]}</li>)}
    </ul>
    <img src={country.flags['png']} alt={country.name.common + " flag"}/>
  </div>
)


const IncludesInsensitive = (toCompare, filter) => (
  toCompare.toLowerCase().includes(filter.toLowerCase())
)

const Input = ({ value, event }) => (
  <input value={value} onChange={event} />
)

export default App