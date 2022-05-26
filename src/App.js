import { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [students, setStudents] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    async function getData() {
    try{
      const response = await fetch(`https://api.hatchways.io/assessment/students`)
      if(!response.ok) {
        throw new Error('Server Error')
      }
      let data = await response.json();
      setStudents(data.students);
      setError(null)
    }catch(err) {
      setError(err.message)
      setStudents(null)
    }
    setIsLoading(true)
  }
  getData()
   }, []);
   
  
    
  return (
    <>
      {isLoading && (
        <div className="all-students">
          {students.map((student, i) => {
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
