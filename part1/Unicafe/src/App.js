import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button event ={() => setGood(good + 1)} text = {"good"} />
      <Button event ={() => setNeutral(neutral + 1)} text = {"neutral"} />
      <Button event ={() => setBad(bad + 1)} text = {"bad"} />
      <Statistics good ={good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.event}>{props.text}</button>
)

const StatisticLine = (props) => {
  for (let key in props){ 
  return <tr><td>{key}</td><td>{props[key]}</td></tr>
  }
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  const average = (good - bad)/total
  const positive = good/total;
  if (total !== 0){
    return(
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine good={good} />
          <StatisticLine neutral={neutral} />
          <StatisticLine bad={bad} />
          <StatisticLine total={total} />
          <StatisticLine average={average} />
          <StatisticLine positive={positive + " %"} />
        </tbody>
      </table>
    </div> )
  }
  else{
    return (
    <div>
      <h2>statistics</h2>
      <p>No feedback given</p>
    </div>
    )
  }
}

export default App