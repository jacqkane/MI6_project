

import '/resources/scss/Navigation.scss'
import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import UserContext from './UserContext';
import { useNavigate } from 'react-router-dom';

export default function Navigation({ content, setContent }) {

    const [isMenuVisible, setIsMenuVisible] = useState(true);
    const navigate = useNavigate();
    const { getUser } = useContext(UserContext)



    const toggleMenuVisibility = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const logout = async () => {

        const response = await fetch('/logout', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        });

        getUser();
        navigate('/main')
    }



    return (
        <nav className={`left-menu ${isMenuVisible ? '' : 'left-menu_hidden'}`}>
            <div className="left-menu__visibility-toggle" onClick={toggleMenuVisibility}>
                {isMenuVisible ? '<' : '>'}
            </div>
            <div className="left-menu__content">
                <div className="left-menu__header">
                    <img className="left-menu__seal" src="https://classes.codingbootcamp.cz/assets/classes/1404/mi6-seal.png" alt="MI6 seal" />
                </div>
                <br />
                <div>
                    <button onClick={logout}>Logout</button>
                    <button onClick={() => setContent('login')}>Login</button>
                    <button onClick={() => setContent('register')}>Register</button>
                </div>
                <div className="left-menu__links">
                    <a onClick={() => setContent('main')}>Home</a>
                    <a onClick={() => setContent('people-of-interest')}>People of interest</a>
                    <a onClick={() => setContent('missions')}>Missions</a>
                </div>

            </div>
        </nav>
    );
}

