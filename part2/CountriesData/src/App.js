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
    <CountryData country={country} />
    <Weather country={country} />
  </div>
)


const IncludesInsensitive = (toCompare, filter) => (
  toCompare.toLowerCase().includes(filter.toLowerCase())
)

const CountryData = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>

    <p>Capital: {country.capital}</p>
    <p>Area: {country.area} m²</p>

    <h3>Languages</h3>
    <ul>
      {Object.entries(country.languages).map((lang) => <li key={lang[0]}>{lang[1]}</li>)}
    </ul>
    <img src={country.flags['png']} alt={country.name.common + " flag"}/>
  </div>
)

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({})
  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
  axios
    .get('https://api.openweathermap.org/data/2.5/weather?lat='+
      country.capitalInfo['latlng'][0]+
      '&lon='+
      country.capitalInfo['latlng'][1]+
      '&units=metric&appid='+api_key)
    .then(response => {
      setWeather(response.data)
  })
  }, )

  if (Object.keys(weather).length === 0){
    return <div>Loading weather data...</div>
  }
  else{
    return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>Temperature is {weather.main['temp']} Celsius</p>
      <img src={'https://openweathermap.org/img/wn/'+weather.weather[0].icon+'@2x.png'} alt={weather.weather[0].description} />
      <p>Wind: {weather.wind['speed']} m/s</p>
    </div>
  )
  }
}

const Input = ({ value, event }) => (
  <input value={value} onChange={event} />
)

export default App