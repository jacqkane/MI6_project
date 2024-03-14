import '/resources/scss/MissionsList.scss'
export default function MissionsList({ missions, missionId, setMissionId }) {
    return (
        <div className="missions-list">
            {missions.map((elem) => (
                <div className="mission" key={elem.id} onClick={() => { setMissionId(elem.id) }}>
                    <div className="mission-info">
                        <div>{'ID: ' + elem.id}</div>
                        <div>{'Name: ' + elem.name}</div>
                        <div>{'Outcome: ' + elem.outcome}</div>
                        <div>{'Year: ' + elem.year}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}