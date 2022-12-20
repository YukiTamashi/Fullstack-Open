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



const NumbersList = ({countries}) => {
  const [filter, setFilter] = useState('')
  const handleFilter = (e) => setFilter(e.target.value)
  return (
  <div>
    <h3>Filter Countries</h3>
    <Input value={filter} event={handleFilter} />
    <List data={countries} filter={filter} />
  </div>
  )
}

const List = ({data, filter}) => {
  const filteredData = data
  .filter((data) => 
    IncludesInsensitive(data.name.common, filter));
  if (filteredData.length > 10){
    return(
      <p>Too many matches</p>
    )
  }
  else  if (filteredData.length === 1){
    return <Country country={filteredData[0]} />
  }
  else{
    return (
      <ul>{
        filteredData.map((data)=>
          <CountryShort key={data.flag} country={data} />)
      }
      </ul>)
  }
}

const CountryShort = ({country}) => (
  <li>{country.name.common}</li>
)

const Country = ({country}) => {
  console.log(country.languages)
return (
  <div>
    <h1>{country.name.common}</h1>

    <p>Capital: {country.capital}</p>
    <p>Area: {country.area}</p>

    <h3>Languages</h3>
    <ul>
      {country.languages.values().map((lang) => <li>{lang}</li>)}
    </ul>
  </div>
)
}

const IncludesInsensitive = (toCompare, filter) => (
  toCompare.toLowerCase().includes(filter.toLowerCase())
)

const Input = ({value, event}) => (
  <input value={value} onChange={event}/>
)

export default App