import { useEffect, useState } from "react"
import '/resources/scss/StatusFilter.scss'


export default function StatusFilter(props) {

    const [statuses, setStatuses] = useState([]);

    const loadStatuses = async () => {
        const response = await fetch('http://www.mi6.test/api/statuses');
        const data = await response.json();
        setStatuses(data.statuses);


    }

    useEffect(() => {
        loadStatuses();

    }, [])



    return (
        <div className="status-filter">
            Filter by status
            <div className="status-buttons">
                {statuses.map((elem) => (
                    <button key={elem.id}
                        className={'status-filter__status'}
                        onClick={() => { props.setSelectedStatus(elem.id); }}
                    >{elem.name}</button>
                ))}
            </div>
        </div>
    )

}