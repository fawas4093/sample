import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
const Navigation = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const userId = sessionStorage.getItem('userId');
            const userToken = sessionStorage.getItem('userToken');
            setIsLoggedIn(!!(userId && userToken));
        };

        checkAuth();
        // Check auth status periodically to catch login/logout events
        const interval = setInterval(checkAuth, 500);
        
        // Also listen to storage events for cross-tab updates
        window.addEventListener('storage', checkAuth);

        return () => {
            clearInterval(interval);
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    const allNavItems = [
        { name: 'Contact', href: '#' },
        { name: 'About Us', href: '/about-us' },
        { name: 'Our Collections', href: '/our-collections' }
    ];

    // Filter out 'Our Collections' if user is logged in
    const navItems = isLoggedIn 
        ? allNavItems.filter(item => item.name !== 'Our Collections')
        : allNavItems;

    return (
        <nav className="main-nav">
            <div className="container">
                <ul className="nav-menu">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            {item.href === '#' ? (
                                <a href={item.href} className={item.badge ? `nav-badge ${item.badge}` : ''}>
                                    {item.name}
                                    {item.badge && <span className="badge-text">{item.badge}</span>}
                                </a>
                            ) : (
                                <NavLink to={item.href} className={item.badge ? `nav-badge ${item.badge}` : ''}>
                                    {item.name}
                                    {item.badge && <span className="badge-text">{item.badge}</span>}
                                </NavLink>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
