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
  const [tagQuery, setTagQuery] = useState("")
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


   const searchStudent = (query, students) => {
      if(!query) return students

      if(query){
        return students.filter(student => {
          return (student.lastName.toLowerCase().includes(query.toLowerCase()) ||
          (student.firstName.toLowerCase().includes(query.toLowerCase())) ||
          `${student.firstName.toLowerCase()} ${student.lastName.toLowerCase()}`.includes(query.toLowerCase()))
        })
      }
      // if(tagQuery) {
      //   return students.filter(student => {
      //     tagsArr.forEach(tag => {
      //       return tag.content.toLowerCase().includes(tagQuery.toLowerCase())
      //     })
      //   })
      // }
        
   }
   
  //  const searchTag = (query, tags) => {
  //     if(!tagQuery) return tags

  //     return tags.filter(tag => {
  //       return (tag.content.toLowerCase().includes(tagQuery.toLowerCase()))
  //  })
  //  }
  //  const filteredTags = searchTag(tagQuery, tags)
   const filteredStudents = searchStudent(query, students)
    

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
            />
            <input
            type="text"
            onChange={e => {setTagQuery(e.target.value)}}
            placeholder="Search by tag"
            autoComplete="off"
            className="search-input"
            />
            {filteredStudents.map((student, i) => {
            const average = student.grades.reduce((sum, curr) => sum + Number(curr), 0) / student.grades.length
              return (
                <>
                  <Student i={i} tags={tagsArr} student={student} average={average}/>
                </>
                )
                })}
          </div>
        )}
      </>
  );
}

export default App;
