import React, { useState, useEffect } from "react";
import PeopleList from "./PeopleList";
import PersonDetail from "./PersonDetail";
import StatusFilter from './StatusFilter'

export default function People() {

    const [personId, setPersonId] = useState(null);
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(false);
    const [people, setPeople] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');

    console.log(people)

    const loadData = async () => {
        setLoading(true);
        if (personId) {
            let url = `/api/people/${personId}`;
            const response = await fetch(url);
            const data = await response.json();

            setPerson(data.person);
        } else {
            // let url = `/api/people`;
            let url = `/api/people` + '?status=' + encodeURIComponent(selectedStatus);
            const response = await fetch(url);
            const data = await response.json();

            setPeople(data.people);
        }
        setLoading(false);
    }

    useEffect(() => {
        loadData();
    }, [personId, selectedStatus]);


    return (
        <div className="people-of-interest">

            <h1>People of interest</h1>

            <StatusFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />

            {
                loading
                    ? <div className="loading">Loading...</div>
                    : (
                        personId && person
                            ? <PersonDetail setPersonId={setPersonId} person={person} setPerson={setPerson} />
                            :
                            <div className="people-of-interest__list">
                                <PeopleList people={people} setPersonId={setPersonId} selectedStatus={selectedStatus} />
                            </div>
                    )

            }

        </div>
    )
}