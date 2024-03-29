import '/resources/scss/PeopleList.scss';

export default function PeopleList({ people, setPersonId, selectedStatus }) {


    return (

        <div className="people-list">

            {
                people.map(person => (
                    <div key={person.id} className="people-list__person" onClick={() => { setPersonId(person.id) }}>
                        {/* picture */}
                        <div className="people-list__person-image">
                            {
                                person.image
                                    ? <img src={`/images/${person.image.path}`} alt={`${person.name} photo`} />
                                    : <img src="/img/mi6-seal.png" alt="no photo available" />
                            }
                        </div>
                        {/* details */}
                        <div className="people-list__person-data">
                            <div className="people-list__person-name">
                                {person.name}
                            </div>

                            {
                                person.aliases.length
                                    ? (
                                        <div className="people-list__person-aliases">
                                            A.K.A
                                            {
                                                person.aliases.map(alias => alias.alias).join(', ')
                                            }
                                        </div>
                                    )
                                    : ''
                            }

                            <div className="people-list__person-status">
                                {person.status_text}
                            </div>

                            <div className="people-list__person-nationality">
                                {person.nationality}
                            </div>

                        </div>

                    </div>
                ))
            }

        </div>

    )
}

