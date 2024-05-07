import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './NavBar.css';
import { useAuth } from '../../auth/AuthProvider';
import { getUser } from '../../auth/cognitoConfig';

interface NavBarProps {
    title: string;
    links: { displayName: string, ref: string }[];
}

const NavBar: React.FC<NavBarProps> = ({ title, links }) => {
    const auth = useAuth();
    const [username, setUsername] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const user = getUser();
        if (user) {
            setUsername(user.getUsername());
            const session = user.getSignInUserSession();
            if (session) {
                setAccessToken(session.getIdToken().getJwtToken());
            } else {
                user.getSession((err: any, session: any) => {
                    if (err) {
                        console.error('Error getting user session:', err);
                    } else {
                        setAccessToken(session.getIdToken().getJwtToken());
                    }
                });
            }
        } else {
            setUsername(null);
            setAccessToken(null);
        }
    }, [auth.isAuthentificated]);

    const logout = () => {
        auth.logout();
    }

    return ( <div>
        <div className='access-token'>{accessToken}</div>
        <nav className="navbar">
            <span className='left-bar'>
                <span className="navbar-title">{title}</span>
                {accessToken ? <span className='username'>User: {username}</span> : null}
            </span>
            {accessToken ? <ul className="navbar-links">
                {links.map((link, index) => (
                    <li key={index} className="navbar-link"><Link to={`/${link.ref}`}>{link.displayName}</Link></li>
                ))}
                <li className="navbar-link" onClick={logout}>Logout</li>
            </ul> : null}
        </nav>
        </div>
    );
};

export default NavBar;
