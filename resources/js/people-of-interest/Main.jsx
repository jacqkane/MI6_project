import { useState } from "react";
import People from './People'


import '/resources/scss/Main.scss'
import Missions from "./Missions";

export default function Main({ content, setContent }) {

    let selectedContent = '';
    switch (content) {
        case 'main':
            selectedContent = <h1>Welcome to MI6</h1>
            break;

        case 'people-of-interest':
            selectedContent = <People />
            break;

        case 'missions':
            selectedContent = <Missions />
            break;

    }
    console.log(selectedContent)

    return (
        <div className="main">
            <div className='main_content'>

                {selectedContent}

            </div>
        </div>
    )

}

