import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNav.css';

const MainNav = props => (
    <header className="main-navigation">
        <div className="main-navigation__logo">
            <h1>The Navbar</h1>
        </div>
        <div className="main-navigation__items">
            <ul>
                <li><NavLink to="/events">Events</NavLink></li>
                <li><NavLink to="/auth">Auth</NavLink></li>
                <li><NavLink to="/bookings">Bookings</NavLink></li>
            </ul>
        </div>
    </header>
);

export default MainNav;