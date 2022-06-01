import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Student } from './Student'
import { getTags } from './store/tags'
import './App.css';

function App() {
  const [students, setStudents] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const dispatch = useDispatch()
  const [query, setQuery] = useState("")
  const [queryResults, setQueryResults] = useState([])
  const [tagQuery, setTagQuery] = useState("")
  const [tagQueryResults, setTagQueryResults] = useState([])
  const filteredStudents = [...queryResults, ...tagQueryResults]
  const tags = useSelector(state => state.tags)
  const tagsArr = Object.values(tags)


  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

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

      let studentsTag = []

      for(let tag of tagsArr){
      for(let student of students) {
          if(student.id === (tag.id + 1)){
            studentsTag.push(student)
          }
        }
      }
      console.log(studentsTag)
      return studentsTag.filter(tag => {
        return (tag.content.toLowerCase().includes(query.toLowerCase()))
   })
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
                    <>
                      <Student i={i} tags={tagsArr} student={student} average={average}/>
                    </>
                    )
                    })}
              </>
            ):(
              <>
              {students.map((student, i) => {
                const average = student.grades.reduce((sum, curr) => sum + Number(curr), 0) / student.grades.length
                  return (
                    <>
                      <Student i={i} tags={tagsArr} student={student} average={average}/>
                    </>
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
