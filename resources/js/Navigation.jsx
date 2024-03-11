import '/resources/scss/Navigation.scss'
import React from 'react';

export default function Navigation() {

    const button = document.querySelector('.left-menu__visibility-toggle')
    const navPanel = document.querySelector('.left-menu')

    button.addEventListener('click', () => {
        navPanel.classList.toggle('left-menu_hidden')
        button.textContent = button.textContent == '>' ? '<' : '>'
    })


    return (

        <nav className="left-menu">

            <div className="left-menu__visibility-toggle">&#60;</div>

            <div className="left-menu__content">

                <div className="left-menu__header">
                    <img className="left-menu__seal" src="https://classes.codingbootcamp.cz/assets/classes/1404/mi6-seal.png" alt="MI6 seal" />
                </div>

                <div className="left-menu__links">
                    <a to="/">Home</a>
                    <a to="/people-of-interest">People of interest</a>
                </div>
            </div>

        </nav>

    )

}