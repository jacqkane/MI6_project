import { useEffect, useState } from "react";
import '/resources/scss/MissionEditForm.scss';

export default function MissionEditForm({ missionId, setMissionId }) {
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        name: '',
        outcome: '',
        year: '',
    });

    const loadMission = async () => {
        setLoading(true);
        const response = await fetch(`http://www.mi6.test/api/missions/${missionId}`);
        const data = await response.json();

        setValues({
            name: data.name,
            outcome: data.outcome,
            year: data.year,
        });
        setLoading(false);
    }

    useEffect(() => {
        loadMission();
    }, [])

    const handleChange = (e) => {
        setValues(previousValues => ({
            ...previousValues,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `http://www.mi6.test/api/missions/update/${missionId}`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        });

        const data = await response.json();
        console.log(data);
    }

    return (
        <>
            <button className="back-button" onClick={() => { setMissionId(null); }}>&times; back</button>


            {values ? (
                <div className="edit-form">
                    <h3>{`EDIT MISSION ${missionId}`}</h3>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" value={values.name} onChange={handleChange} />
                        <input type="text" name="outcome" value={values.outcome} onChange={handleChange} />
                        <input type="text" name="year" value={values.year} onChange={handleChange} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            ) : (
                <div> Mission ID missing</div>
            )}
        </>
    )
}
