import Part from './Part'

const Content = ({content}) => {
    console.log(content)
    return (
        <div>{content.parts.map((part) => (
            <Part key={part.id} part={part} />
    ))}
        </div>
    )
}

export default Content