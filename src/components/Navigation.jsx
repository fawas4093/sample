import React from 'react';
import { NavLink } from 'react-router-dom';
const Navigation = () => {

    const navItems = [
        { name: 'Contact', href: '#' },
        { name: 'About Us', href: '/about-us' }
    ];

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
