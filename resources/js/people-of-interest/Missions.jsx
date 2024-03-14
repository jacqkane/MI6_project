import { useEffect, useState } from "react";
import MissionsList from "./MissionsList";
import MissionEditForm from "./MissionEditForm";

export default function Missions() {

    const [missions, setMissions] = useState([]);
    const [missionId, setMissionId] = useState(null);
    const loadMissions = async () => {
        const response = await fetch('http://www.mi6.test/api/missions');
        const data = await response.json();
        setMissions(data.missions);
    }



    useEffect(() => {

        loadMissions();
    }, [missionId])
    return (
        <>
            {

                missionId
                    ? <MissionEditForm missionId={missionId} setMissionId={setMissionId} />
                    : <MissionsList missions={missions} missionId={missionId} setMissionId={setMissionId} />

            }
        </>
    )
}