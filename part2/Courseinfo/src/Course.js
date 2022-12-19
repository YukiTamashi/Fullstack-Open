const Course = ({course}) => (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
)

const Header = (props) => (
    <h1>{props.course.name}</h1>
)

const Content = ({parts}) => (
    <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
)
  
const Part = (props) => (
      <div>
        <p>
          {props.part.name} {props.part.exercises}
        </p>
      </div>
)

  
const Total = ({parts}) => (
    <div>
      <p>Number of exercises 
        {parts.reduce((a, b) =>Number(a+b.exercises), 0)}
      </p>
    </div>
)

export default Course