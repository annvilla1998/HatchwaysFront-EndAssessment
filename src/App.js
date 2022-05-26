import { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [students, setStudents] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [query, setQuery] = useState("")
  // const [text, setText] = useState("")


  useEffect(() => {
    async function getData() {
    try{
      const response = await fetch(`https://api.hatchways.io/assessment/students`)
      if(!response.ok) {
        throw new Error('Server Error')
      }
      let data = await response.json();
      setStudents(data.students);
    }catch(err) {
      console.log(err.message)
      setStudents(null)
    }
    setIsLoading(true)
  }
  getData()
   }, []);


   const searchStudent = (query, students) => {
      if(!query) return students

      return students.filter(student => {
        return (student.lastName.toLowerCase().includes(query.toLowerCase()) ||
        (student.firstName.toLowerCase().includes(query.toLowerCase())) ||
        `${student.firstName.toLowerCase()} ${student.lastName.toLowerCase()}`.includes(query.toLowerCase()))
   })
   }
  
   const filteredStudents = searchStudent(query, students)
    
  //  const search = document.querySelector(".search-input")
  //  search.addEventListener("click",(e => {
  //    e.preventDefault()
  //    search.style.borderBottom = "1px solid rgb(0, 0, 0, 0.5)"
  //  }))

  return (
    <>
      {isLoading && (
        <div className="all-students">
          <input
          type="text"
          onChange={e => {setQuery(e.target.value)}}
          placeholder="Search by name"
          autocomplete="off"
          className="search-input"
          />
          {filteredStudents.map((student, i) => {
          const average = student.grades.reduce((sum, curr) => sum + Number(curr), 0) / student.grades.length
            return (
              <div className="student-container" key={i}>
                <div className="student-image">
                  <img src={student.pic} />
                </div>
                <div className="student-text">
                  <h1 style={{textTransform: "uppercase"}}>{student.firstName} {student.lastName}</h1>
                  <div>Email: {student.email}</div>
                  <div>Company: {student.company}</div>
                  <div>Skill: {student.skill}</div>
                  <div>Average: {average}%</div>
                </div>
              </div>
            )
            })}
        </div>
      )}
    </>
  );
}

export default App;
