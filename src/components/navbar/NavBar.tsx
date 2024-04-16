import React from 'react';
import { Link } from "react-router-dom";
import './NavBar.css';

interface NavBarProps {
    title: string;
    links: {displayName: string, ref: string}[];
}

const NavBar: React.FC<NavBarProps> = ({ title, links }) => {
    return (
        <nav className="navbar">
            <span className="navbar-title">{title}</span>
            <ul className="navbar-links">
                {links.map((link, index) => (
                    <li key={index} className="navbar-link"><Link to={`/${link.ref}`}>{link.displayName}</Link></li>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;
