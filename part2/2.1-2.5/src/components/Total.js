const Total = ({course}) => {
    console.log({course})
    
    const totalEx = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <b>total of {totalEx} exercises</b>
        </div>
    )
}
export default Total 