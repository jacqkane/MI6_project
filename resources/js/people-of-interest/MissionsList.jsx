export default function MissionsList({ missions, missionId, setMissionId }) {


    return (
        <div className="missions-list">
            {
                missions.map((elem) => {
                    return (

                        <div className="mission" key={elem.id} onClick={() => { setMissionId(elem.id) }}>
                            <div>{'ID: ' + elem.id}</div>
                            <div>{'Name: ' + elem.name}</div>
                            <div>{'Outcome: ' + elem.outcome}</div>
                            <div>{'Year: ' + elem.year}</div>
                            <br />
                        </div>



                    )
                })
            }
        </div>
    )
}