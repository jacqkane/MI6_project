import React, {useState, useEffect} from "react";

export default function People()  {

    const [people, setPeople] = useState(null)


    const loadPeople = async () => {
        const response = await fetch('http://www.mi6.test/api/people');
        const data = await response.json();
        setPeople(data);
        console.log(data)
        };

        useEffect(() => {
        loadPeople();
        }, []);

        return(
            <div className="person">
                <ul>
                {
                    people === null
                    ? (
                        <div>Loading</div>
                    )
                    
                    : (
                        people.map((person) => {
                        
                            return (
                              <li>{person.name}</li>
                            ) 
                          }
                          )
                    )


                }   
                </ul>
            </div>

        )

    }