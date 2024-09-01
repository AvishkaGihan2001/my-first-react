import StudentType from "../types/StudentType"

function Student(props: StudentType) {
  return (
    <h1>
      {props.name}
      {props.age}
    </h1>
  )
}

export default Student;

