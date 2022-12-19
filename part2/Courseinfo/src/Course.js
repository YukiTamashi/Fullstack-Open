const Course = ({course}) => (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
)

const Header = ({name}) => (<h3>{name}</h3>)

const Content = ({parts}) => (
    <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
)
  
const Part = ({part}) => (<p>{part.name} {part.exercises}</p>)


  
const Total = ({parts}) => (
    <p>
        <b>Total exercises: </b> 
        {parts.reduce((a, b) =>Number(a+b.exercises), 0)}
    </p>
)

export default Course