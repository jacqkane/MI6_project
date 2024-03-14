import { useEffect, useState } from "react"


export default function StatusFilter(props) {

    const [statuses, setStatuses] = useState([]);

    // console.log(statuses);


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
            This is the status filter
            {

                statuses.map((elem) => {
                    return (
                        <>
                            <br />
                            <button key={elem.id}
                                className={'status-filter__status'}
                                onClick={() => { props.setSelectedStatus(elem.id); }}
                            >{elem.name}</button>
                        </>
                    )

                })


            }

        </div>

    )

}