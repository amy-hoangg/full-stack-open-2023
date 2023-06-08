const Part = ({part}) => {
    console.log(part)
    return (
        <div>
            {part.name} {part.exercises}
        </div>
    )
}
export default Part