import { useEffect, useState } from "react";
import MissionsList from "./MissionsList";

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

                missionId ?
                    <MissionsList missions={missions} />
                    : <h3>nothing</h3>

            }
        </>
    )
}