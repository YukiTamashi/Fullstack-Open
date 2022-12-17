import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const plusGood = () => (setGood(good + 1))

  return (
    <div>
      <h2>give feedback</h2>
      <Button event ={() => setGood(good + 1)} text = {"good"} />
      <Button event ={() => setNeutral(neutral + 1)} text = {"neutral"} />
      <Button event ={() => setBad(bad + 1)} text = {"bad"} />
      <h2>statistics</h2>
      <Display good={good} />
      <Display neutral={neutral} />
      <Display bad={bad} />
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.event}>{props.text}</button>
)

const Display = (props) => {
  for (let key in props){ 
  return <p>{key} {props[key]}</p>
  }
}

export default App