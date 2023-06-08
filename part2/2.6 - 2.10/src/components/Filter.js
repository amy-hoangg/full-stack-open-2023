const Filter = ({filter, handleFilterInputChange}) => {
    return (
        <div>filter shown with 
        <input value={filter} onChange={handleFilterInputChange}/>
        </div>
    )
}

export default Filter
