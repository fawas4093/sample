import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "./Hero.css";

import img1 from '../assets/images/hero/01.jpg';
import img2 from '../assets/images/hero/02.jpg';
import img3 from '../assets/images/hero/03.jpg';
import img4 from '../assets/images/hero/04.jpg';
import img5 from '../assets/images/hero/05.jpg';
import img6 from '../assets/images/hero/06.jpg';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const slides = [
        {
            image: img1,
            title: "AMAARA",
            description: "crafted for you",
            bgColor: "linear-gradient(135deg, #8b7355, #a68968)"
        },
        {
            image: img2,
            title: "CHAINS AND EARRINGS",
            description: "Crafted to Shine ",
            buttonText: "Shop Now",
            url: "https://palmonas.com/collections/buy-1-get-1-free",
            bgColor: "linear-gradient(135deg, #8b7355, #a68968)"
        },
        {
            image: img3,
            title: "DISCOVER",
            subtitle: "GANTHAN STYLES",
            // code: "UPTO 50% OFF",
            description: "Traditional designs reimagined",
            buttonText: "Explore Now",
            url: "https://palmonas.com/collections/ganthan",
            bgColor: "linear-gradient(135deg, #2c3e50, #4a6741)"
        },
        {
            image: img4,
            title: "ELEGANT",
            subtitle: "Necklaces",
            code: "NEW ARRIVALS",
            description: "Stunning pieces for every occasion",
            buttonText: "View Collection",
            url: "https://palmonas.com/collections/necklaces",
            bgColor: "linear-gradient(135deg, #27ae60, #2ecc71)"
        },
        {
            image: img5,
            title: "PREMIUM",
            subtitle: "RINGS",
            code: "COUPLE EDITION",
            description: "Handcrafted with precision",
            buttonText: "Shop Premium",
            url: "https://palmonas.com/collections/earrings",
            bgColor: "linear-gradient(135deg, #8e44ad, #9b59b6)"
        },
        {
            image: img6,
            title: "EXCLUSIVE",
            subtitle: "COLLECTION",
            description: "Discover our finest jewelry",
            buttonText: "Explore Collection",
            url: "https://palmonas.com/collections/rings",
            bgColor: "linear-gradient(135deg, #16a085, #27ae60)"
        }
    ];

    const nextSlide = useCallback(() => setCurrentSlide(prev => (prev + 1) % slides.length), [slides.length]);
    const prevSlide = useCallback(() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length), [slides.length]);
    const goToSlide = useCallback((index) => setCurrentSlide(index), []);
    const handleShopNow = useCallback(() => window.open(slides[currentSlide].url, '_blank'), [slides, currentSlide]);

    useEffect(() => {
        const autoSlide = setInterval(nextSlide, 8000);
        return () => clearInterval(autoSlide);
    }, [nextSlide]);

    return (
        <section
            className="hero"
            style={{
                backgroundImage: `url(${slides[currentSlide].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 0.5s ease-in-out'
            }}
        >
            <div className="overlay" style={{ background: slides[currentSlide].bgColor }} />
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="offer-card">
                            <h2 className="offer-title">{slides[currentSlide].title}</h2>
                            {slides[currentSlide].subtitle && <h3 className="offer-subtitle">{slides[currentSlide].subtitle}</h3>}
                            {slides[currentSlide].code && <p className="offer-code">{slides[currentSlide].code}</p>}

                            {/* Render button only if not the first slide */}
                            {currentSlide !== 0 && slides[currentSlide].buttonText && (
                                <button className="shop-now-btn" onClick={handleShopNow}>
                                    {slides[currentSlide].buttonText}
                                </button>
                            )}

                            {slides[currentSlide].description && <p className="offer-terms">{slides[currentSlide].description}</p>}
                        </div>

                    </div>
                </div>
            </div>

            {!isMobile && (
                <>
                    <button className="hero-nav prev" onClick={prevSlide}><FontAwesomeIcon icon={faChevronLeft} /></button>
                    <button className="hero-nav next" onClick={nextSlide}><FontAwesomeIcon icon={faChevronRight} /></button>
                </>
            )}

            <div className="slide-indicators">
                {slides.map((_, index) => (
                    <button key={index} className={`indicator ${index === currentSlide ? 'active' : ''}`} onClick={() => goToSlide(index)} />
                ))}
            </div>
        </section>
    );
};

export default Hero;
