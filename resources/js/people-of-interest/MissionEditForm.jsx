import axios from "axios";
import { useEffect, useState } from "react";

export default function MissionEditForm({ missionId, setMissionId }) {
    const [loading, setLoading] = useState(false);
    const [people, setPeople] = useState(null);
    const [personId, setPersonId] = useState(null);
    const [assignedPeople, setAssignedPeople] = useState([]);
    const [unassignedPerson, setUnassignedPerson] = useState(null)



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
        setAssignedPeople(data.people);


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
        loadPeople();

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
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        })

        const data = await response.json();
    }

    const loadPeople = async () => {
        let url = `/api/people`;
        const response = await fetch(url);
        const data = await response.json();
        setPeople(data.people);
    }

    const handleAssignmentOfPeople = async (e) => {
        e.preventDefault();


        // with axios
        try {
            // make the AJAX request
            const response = await axios.post('http://www.mi6.test/api/missions/assign-person', {
                'personId': personId,
                'missionId': missionId
            });
            // get the (already JSON-parsed) response data
            // const response_data = await response.data;

            loadMission();

        } catch (error) {
            // if the response code is not 2xx (success)
            switch (error.response.status) {
                case 422:
                    // handle validation errors here
                    console.log('VALIDATION FAILED:', error.response.data.errors);
                    break;
                case 500:
                    console.log('UNKNOWN ERROR', error.response.data);
                    break;
            }
        }


    }

    const handlePersonChange = (e) => {
        setPersonId(e.target.value);
    }


    //unassign person
    const handleUnassignmentOfPerson = async () => {
        // e.preventDefault();
        // with axios
        try {
            // make the AJAX request
            const response = await axios.post('http://www.mi6.test/api/missions/unassign-person', {
                'personId': unassignedPerson,
                'missionId': missionId
            });
            // get the (already JSON-parsed) response data
            const response_data = await response.data;
            // console.log(response_data.status);
            loadMission();

        } catch (error) {
            // if the response code is not 2xx (success)
            switch (error.response.status) {
                case 422:
                    // handle validation errors here
                    console.log('VALIDATION FAILED:', error.response.data.errors);
                    break;
                case 500:
                    console.log('UNKNOWN ERROR', error.response.data);
                    break;
            }
        }


    }

    useEffect(() => {
        handleUnassignmentOfPerson();
    }, [unassignedPerson])


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
                            <button type="submit">Submit</button>
                        </form>
                    </div >
                    : <div> Mission ID missing</div>

            }
            <br />

            <form action="" onSubmit={handleAssignmentOfPeople}>
                <select name="people" id="people" onChange={handlePersonChange}>
                    <option value={null}>Select a person</option>
                    {people ?
                        people.map(person => {
                            return <option key={person.id} value={person.id}>{person.name}</option>
                        })
                        : 'Loading...'
                    }
                </select>
                <button type="submit">Assign Person</button>
            </form >

            <ol>
                {
                    assignedPeople.map((assignedPerson, i) => {
                        return (
                            <div key={i}>
                                <li>{'ID: ' + assignedPerson.id}{' Name: ' + assignedPerson.name}{' Age: ' + assignedPerson.age}</li>
                                <button onClick={() => { setUnassignedPerson(assignedPerson.id) }}>&times;</button>
                            </div>
                        )

                    })
                }

            </ol>


        </>
    )
}