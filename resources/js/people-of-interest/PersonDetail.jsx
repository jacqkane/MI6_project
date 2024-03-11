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
            <div>
                Status: {person.status_text} <br />
                Aliases: <br />
                {
                    person.aliases.length > 0
                        ?
                        <ul>
                            {
                                person.aliases.map(alias => {
                                    return <li key={alias.id}>{alias.alias}</li>
                                })
                            }
                        </ul>
                        : <> No aliases known <br /></>
                }

                Occupation: {person.occupation} <br />
                Nationality: {person.nationality} <br />
            </div>
        </div>
    </div>

}

export default PersonDetail;