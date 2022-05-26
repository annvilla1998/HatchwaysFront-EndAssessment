import { useState } from 'react'


export const Expand = ({student, i, average}) => {
    const [expandGrades, setExpandGrades] = useState(false)
    

    return (
        <div className="grades-list-wrapper">
                  <div className="student-expander-wrapper">
                    <div className="student-container" key={i}>
                      <div className="student-image">
                        <img src={student.pic} />
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
        </div>
    )
}