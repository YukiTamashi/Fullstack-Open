import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const RandomQuote = () => (setSelected(RandomNew()))

  const RandomNew = () => {
    const r = Math.floor(Math.random() * anecdotes.length)
    if (r !== selected){
      return r
    }
    else{
      return RandomNew()
    }
  } 

  const Vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    if ((copy[selected] > votes[highest]) ||
        highest === -1
      ){
      setHighest(selected)
    }
    setVote(copy)
  }

  const [highest, setHighest] = useState(-1)
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(new Uint8Array(anecdotes.length))

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote anecdotes={anecdotes} votes={votes} i={selected} />
      <Button func = {Vote} text = {"Vote"} />
      <Button func = {RandomQuote} text = {"Next anecdote"} />
      <h2>Anecdote with most votes</h2> 
      <Anecdote anecdotes={anecdotes} votes={votes} i={highest} />
    </div>
  )
}

const Button = ({func, text}) => {
  return <button onClick={func}>{text}</button>
}

const Anecdote = ({anecdotes, votes, i}) => {
  if (i !== -1){
    return(
      <div> 
        <p>{anecdotes[i]}</p>
        <p>has {votes[i]} votes</p>
      </div>
      )
  }
  else{
    return(
      <div>
        <p>No votes yet</p>
      </div>
    )
  }
}

export default App