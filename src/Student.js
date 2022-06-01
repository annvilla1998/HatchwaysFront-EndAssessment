import { useState } from 'react'

export const Student = ({student, i, average}) => {
    const [expandGrades, setExpandGrades] = useState(false)
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault()

      const newTag = {
        content: content,
      }

      student.tags.push(newTag)
      setContent('')
      console.log(student)
    }



    return (
        <div className="grades-list-wrapper">
                  <div className="student-expander-wrapper">
                    <div className="student-container" key={i}>
                      <div className="student-image">
                        <img alt="student-pic" src={student.pic} />
                      </div>
                      <div className="student-text">
                        <h1 style={{textTransform: "uppercase"}}>{student.firstName} {student.lastName}</h1>
                        <div className="text">Email: {student.email}</div>
                        <div className="text">Company: {student.company}</div>
                        <div className="text">Skill: {student.skill}</div>
                        <div className="text">Average: {average}%</div>
                      </div>
                    </div>
                    {!expandGrades ? (
                        <button onClick={() => setExpandGrades(true)} className="plus grade-expand">+</button>
                        ):(
                            <button onClick={() => setExpandGrades(false)} className="minus grade-expand">-</button>
                            )}
                    </div>
                    {expandGrades && (
                        <div className="grades-list">
                        {student.grades.map((grade, i) => (
                            <div key={i}>
                                <div className="grade">Test {i + 1}: <div>{grade}%</div></div>
                            </div>
                            ))}
                        </div>
                    )}
                    <div className="tags">
                        <div className="tags-container">
                          {student.tags.length > 0 ? student.tags.map(tag => (
                          <>
                                <div key={tag.id}>
                                  <div className="tag">{tag.content}</div>
                                </div>
                          </>
                          )): null}
                        </div>
                        <form>
                            <input
                            type="text"
                            id="tag"
                            placeholder="Add tag"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            />
                            <button type="submit" onClick={handleSubmit} style={{display:'none'}}></button>
                        </form>
                    </div>
        </div>
    )
}