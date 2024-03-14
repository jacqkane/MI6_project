import { useEffect, useState } from "react";
import "/resources/scss/MissionEditForm.scss";
import axios from "axios";

export default function MissionEditForm({ missionId, setMissionId }) {
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        name: "",
        outcome: "",
        year: "",
    });
    const [people, setPeople] = useState([]);
    const [personId, setPersonId] = useState("");
    const [assignedPeople, setAssignedPeople] = useState([]);

    const loadMission = async () => {
        setLoading(true);
        const response = await fetch(
            `http://www.mi6.test/api/missions/${missionId}`
        );
        const data = await response.json();

        setValues({
            name: data.name,
            outcome: data.outcome,
            year: data.year,
        });
        setLoading(false);
    };

    const loadPeople = async () => {
        try {
            const response = await fetch(`http://www.mi6.test/api/people`);
            const data = await response.json();
            setPeople(data.people);
        } catch (error) {
            console.error("Not successful", error);
        }
    };

    useEffect(() => {
        loadMission();
        loadPeople();
    }, []);

    const handleChange = (e) => {
        setValues((previousValues) => ({
            ...previousValues,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `http://www.mi6.test/api/missions/update/${missionId}`;
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
        });

        const data = await response.json();
    };

    const handleAssigmentOfPeople = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/missions/assign-person", {
                personId: personId,
                missionId: missionId,
            });
            if (personId) {
                setAssignedPeople([...assignedPeople, personId]);
            }

            loadMission();
        } catch (error) {
            switch (error.response.status) {
                case 422:
                    console.log(
                        "VALIDATION FAILED:",
                        error.response.data.errors
                    );
                case 500:
                    console.log("UNKNOWN ERROR:", error.response.data);
                    break;
            }
        }
    };

    const handleRemovePerson = (personIdToRemove) => {
        const stringPersonIdToRemove = String(personIdToRemove);
        const updatedAssignedPeople = assignedPeople.filter(
            (id) => id !== stringPersonIdToRemove
        );
        setAssignedPeople(updatedAssignedPeople);
    };
    

    return (
        <>
            <button
                className="back-button"
                onClick={() => {
                    setMissionId(null);
                }}
            >
                &times; back
            </button>

            {values ? (
                <div className="edit-form">
                    <h3>{`EDIT MISSION ${missionId}`}</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="outcome"
                            value={values.outcome}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="year"
                            value={values.year}
                            onChange={handleChange}
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            ) : (
                <div> Mission ID missing</div>
            )}

            <div className="edit-form">
                <h3>People assignment form</h3>
                <button onClick={handleAssigmentOfPeople}>Assign</button>
                <select
                    name="people"
                    id="people"
                    value={personId || ""}
                    onChange={(e) => setPersonId(e.target.value)}
                >
                    <option value={null}>Select a person</option>
                    {people.map((person) => (
                        <option key={person.id} value={person.id}>
                            {person.name}
                        </option>
                    ))}
                </select>
                <ul>
                    {assignedPeople.map((personId) => {
                        personId = parseInt(personId);
                        const assignedPerson = people.find(
                            (person) => person.id === personId
                        );
                        return (
                            <li key={personId}>
                                {assignedPerson
                                    ? assignedPerson.name
                                    : "Person not found"}
                                <button
                                    onClick={() => handleRemovePerson(personId)}
                                    className="remove-button"
                                >
                                    Remove
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
