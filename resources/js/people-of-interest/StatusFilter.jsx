import React, { useEffect, useState } from "react";
import "/resources/scss/StatusFilter.scss";

export default function StatusFilter({ selectedStatus, setSelectedStatus }) {
    const [statuses, setStatuses] = useState([]);

    const loadStatuses = async () => {
        try {
            const response = await fetch("http://www.mi6.test/api/statuses");
            const data = await response.json();
            console.log("loaded statuses", data);
            setStatuses(data);
        } catch (error) {
            console.error("Not successful loading statuses", error);
        }
    };

    useEffect(() => {
        loadStatuses();
    }, []);

    return (
        <div className="status-filter">
            <p>Search by status</p>
            <div className="status-filter-container">
                {statuses.map((status) => (
                    <div
                        key={status.id}
                        className={`status-filter__status ${
                            selectedStatus === status.name ? "selected" : ""
                        }`}
                        onClick={() => {
                            setSelectedStatus(status.id);
                        }}
                    >
                        {status.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
