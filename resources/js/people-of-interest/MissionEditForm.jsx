import { useEffect, useState } from "react";

export default function MissionEditForm({ missionId, setMissionId }) {
    const [loading, setLoading] = useState(false);
    // const [mission, setMission] = useState(null);
    // const [name, setName] = useState(null);
    // const [outcome, setOutcome] = useState(null);
    // const [year, setYear] = useState(null);

    const [values, setValues] = useState({
        name: '',
        outcome: '',
        year: '',
    });



    const loadMission = async () => {
        setLoading(true);
        const response = await fetch('http://www.mi6.test/api/missions/' + missionId);
        const data = await response.json();
        // setMission(data);

        setValues(previous_values => {
            return ({
                ...previous_values,
                name: data.name,
                outcome: data.outcome,
                year: data.year,
            });
        });
        setLoading(false);
    }


    useEffect(() => {
        loadMission();

    }, [])

    const handleChange = (e) => {
        setValues(previous_values => {
            return ({
                ...previous_values,
                [e.target.name]: e.target.value
                //it takes all input fields once they change, no need to define it by name!
            });
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let url = `http://www.mi6.test/api/missions/update/${missionId}`;
        // console.log(values)
        // console.log(url)
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        })

        const data = await response.json();
        // console.log(data)


    }




    return (
        <>
            <button onClick={() => { setMissionId(null); }}>&times; back</button>
            {
                values ?
                    <div>
                        <h3>{'EDIT MISSION' + missionId}</h3>
                        <form action="" method="post" onSubmit={handleSubmit}>

                            <input type="text" name="name" value={values.name} onChange={handleChange} />
                            <input type="text" name="outcome" value={values.outcome} onChange={handleChange} />
                            <input type="text" name="year" value={values.year} onChange={handleChange} />
                            {/* <button type="submit" placeholder="Submit" /> */}
                            <button type="submit">Submit</button>

                        </form>
                    </div >




                    : <div> Mission ID missing</div>

            }

        </>
    )
}