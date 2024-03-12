import "/resources/scss/Navigation.scss";


import '/resources/scss/Navigation.scss'
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

export default function Navigation({ content, setContent }) {

    const [isMenuVisible, setIsMenuVisible] = useState(true);

    const toggleMenuVisibility = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    return (
        <nav className={`left-menu ${isMenuVisible ? '' : 'left-menu_hidden'}`}>
            <div className="left-menu__visibility-toggle" onClick={toggleMenuVisibility}>
                {isMenuVisible ? '<' : '>'}
            </div>
            <div className="left-menu__content">
                <div className="left-menu__header">
                    <img className="left-menu__seal" src="https://classes.codingbootcamp.cz/assets/classes/1404/mi6-seal.png" alt="MI6 seal" />
                </div>
                <div className="left-menu__links">
                    <a href="#" onClick={() => setContent('main')}>Home</a>
                    <a href="#" onClick={() => setContent('people-of-interest')}>People of interest</a>
                    <a href="#" onClick={() => setContent('missions')}>Missions</a>
                </div>
            </div>
        </nav>
    );
}