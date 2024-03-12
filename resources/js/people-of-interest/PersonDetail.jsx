import "/resources/scss/PersonDetails.scss";

const PersonDetail = ({ setPersonId, person, setPerson }) => {

    return <div className="person-detail">
        <button onClick={() => {
            setPersonId(null);
            setPerson(null);
        }
        }>Back to the list</button>
        <div className="person-detail__content">
            <h2>{person.name}</h2>
            <img src={'/images/' + person.image.path} alt="person image" />
            <div className="person-details">
                    <p>Status: {person.status_text}</p>
                    <p>Aliases:</p>
                    {person.aliases.length > 0 ? (
                        <ul className="alias-list">
                            {person.aliases.map(alias => (
                                <li key={alias.id}>{alias.alias}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No aliases known</p>
                    )}
                    <p>Occupation: {person.occupation}</p>
                    <p>Nationality: {person.nationality}</p>
                </div>
        </div>
    </div>

}

export default PersonDetail;