const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  const parts = [part1, part2, part3]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={sumExercises(parts)} />
    </div>
  )
}

const Header = (props) => {
  return (<h1>{props.course}</h1>)
}

const Content = (props) => {
  
return(
  <div>
    <Part part = {props.parts[0]} />
    <Part part = {props.parts[1]} />
    <Part part = {props.parts[2]} />
  </div>)
}

const Part = (props) => {
  return(
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>

  )
}

const Total = (props) => {
  return(
  <div>
    <p>Number of exercises {props.total}</p>
  </div>)
}

function sumExercises(a){
  let sum = 0;
  for (let item of a){
    sum += item.exercises;
  }
  return sum;
}

export default App