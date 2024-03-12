import React, { useState, useEffect } from "react";
import PeopleList from "./PeopleList";
import PersonDetail from "./PersonDetail";
import StatusFilter from "./StatusFilter";

export default function People() {
    const [personId, setPersonId] = useState(null);
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(false);
    const [people, setPeople] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [error, setError] = useState(null);

    const loadData = async () => {
        setLoading(true);
        setError(null);

        try {
            if (personId) {
                let url = `/api/people/${personId}`;
                console.log(`Fetching person with ID: ${personId}`);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch person with ID ${personId}`);
                }
                const data = await response.json();
                setPerson(data.person);
                console.log("Person data:", data.person);
            } else {
                let url = `/api/people` + '?status=' + encodeURIComponent(selectedStatus);
                console.log(`Fetching people with status: ${selectedStatus}`);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch people with status ${selectedStatus}`);
                }
                const data = await response.json();
                setPeople(data.people);
                console.log("People data:", data.people);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error during data fetch:", error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, [personId, selectedStatus]);

    console.log("Rendering People component");

    return (
        <div className="people-of-interest">
            <h1>People of interest</h1>

            <StatusFilter
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
            />

            {loading ? (
                <div className="loading">Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : personId && person ? (
                <PersonDetail
                    setPersonId={setPersonId}
                    person={person}
                    setPerson={setPerson}
                />
            ) : (
                <div className="people-of-interest__list">
                    <PeopleList
                        people={people}
                        setPersonId={setPersonId}
                    />
                </div>
            )}
        </div>
    );
}
