import { useState } from "react";
import People from './People'


import '/resources/scss/Main.scss'
import Missions from "./Missions";
import Login from "./Login";
import Register from "./Register";

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
        case 'login':
            selectedContent = <Login />
            break;
        case 'register':
            selectedContent = <Register />
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

