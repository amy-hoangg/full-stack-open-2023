const PersonForm = (props) => {
    const { addContact, newName, newNumber, handleNameInputChange, handleNumberInputChange } = props;
    return (
    <form onSubmit={addContact}>
        <div>
        name: <input value={newName} onChange={handleNameInputChange}/>
        </div>

        <div>
        number: <input value={newNumber} onChange={handleNumberInputChange}/>
        </div>

        <div>
        <button type="submit">add</button>
        </div>
    </form>)
}

export default PersonForm 