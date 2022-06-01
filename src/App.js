import { useState, useEffect } from 'react'
import { Student } from './Student'
import './App.css';

function App() {
  const [students, setStudents] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [query, setQuery] = useState("")
  const [queryResults, setQueryResults] = useState([])
  const [tagQuery, setTagQuery] = useState("")
  const [tagQueryResults, setTagQueryResults] = useState([])
  const filteredStudents = [...queryResults, ...tagQueryResults]


  useEffect(() => {
    async function getData() {
    try{
      const response = await fetch(`https://api.hatchways.io/assessment/students`)
      if(!response.ok) {
        throw new Error('Server Error')
      }
      let data = await response.json();
      const students = data.students
      students.forEach((student) => {
        student.tags = [];
      });
      setStudents(students);
    }catch(err) {
      setStudents(null)
    }
    setIsLoading(true)
  }
  getData()
   }, []);

   const searchStudent = (query, studentsArr, setResults) => {
      if(!query) return setResults([])

      let students = studentsArr.filter(student => {
          return (student.lastName.toLowerCase().includes(query.toLowerCase()) ||
          (student.firstName.toLowerCase().includes(query.toLowerCase())) ||
          `${student.firstName.toLowerCase()} ${student.lastName.toLowerCase()}`.includes(query.toLowerCase()))
        })

      setResults(students)      
   }
   
   const searchTag = (query, students, setResults) => {
      if(!query) return setResults([])

      let result = []
      let studentsWTags = students.filter(student => {
        return student.tags.length > 0
   })

     studentsWTags.forEach(student => {
       let tagExists = false
       student.tags.forEach(tag => {
         if(tag.content.toLowerCase().includes(query.toLowerCase())){
           tagExists = true
        }
      })
      if(tagExists || !query){
        result.push(student);
      }
    })
      setResults(result)
  }

  return (
      <>
        {isLoading && (
          <div className="all-students">
            <input
            type="text"
            onChange={e => {setQuery(e.target.value)}}
            placeholder="Search by name"
            autoComplete="off"
            className="search-input"
            onKeyUp={e => 
            searchStudent(e.target.value,students, setQueryResults)
            }
            />
            <input
            type="text"
            onChange={e => {setTagQuery(e.target.value)}}
            placeholder="Search by tag"
            autoComplete="off"
            className="search-input"
            onKeyUp={e => 
              searchTag(e.target.value,students, setTagQueryResults)
            }
            />
            {(filteredStudents && filteredStudents.length > 0) ? (
              <>
                {filteredStudents.map((student, i) => {
                const average = student.grades.reduce((sum, curr) => sum + Number(curr), 0) / student.grades.length
                  return (
                    <div key={i}>
                      <Student i={i} student={student} average={average}/>
                    </div>
                    )
                    })}
              </>
            ):(
              <>
              {students.map((student, i) => {
                const average = student.grades.reduce((sum, curr) => sum + Number(curr), 0) / student.grades.length
                  return (
                    <div key={i}>
                      <Student i={i} student={student} average={average}/>
                    </div>
                    )
                  })}
              </>
              )}
          </div>
        )}
      </>
  );
}

export default App;
