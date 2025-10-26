import React from 'react';
import { NavLink } from 'react-router-dom';
const Navigation = () => {
    const navItems = [
        { name: 'New Arrivals', href: '/new-arrivals' },
        { name: 'Best Seller', href: '/best-seller' },
        { name: 'Fine Silver', href: '/fine-silver' },
        { name: 'About Us', href: '#' }
    ];

    return (
        <nav className="main-nav">
            <div className="container">
                <ul className="nav-menu">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <a href={item.href} className={item.badge ? `nav-badge ${item.badge}` : ''}>
                                {item.name}
                                {item.badge && <span className="badge-text">{item.badge}</span>}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
