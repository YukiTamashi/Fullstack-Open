const Course = ({course}) => (
    <div>
      <Header course={course} />
      <Content course={course.parts} />
      <Total course={course} />
    </div>
)

const Header = (props) => (
    <h1>{props.course.name}</h1>
)

const Content = ({course}) => (
    <div>
        {course.map(part => <Part key={part.id} part={part} />)}
    </div>
)
  
const Part = (props) => (
      <div>
        <p>
          {props.part.name} {props.part.exercises}
        </p>
      </div>
)

  
const Total = (props) => (
    <div>
      <p>Number of exercises {sumExercises(props.course.parts)}</p>
    </div>
)
  
function sumExercises(a){
    let sum = 0;
    for (let item of a){
      sum += item.exercises;
    }
    return sum;
}

export default Course