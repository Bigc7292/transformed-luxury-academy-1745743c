import React from 'react';
import { FaInstagram } from 'react-icons/fa'; // Import Instagram icon from react-icons

const Header = () => {
    return (
        <header>
            <nav>
                <div className="social-icons">
                    <a
                        href="https://www.instagram.com/aestheticstraininghereford?igsh=MWp1dzlmeHU4cXRmbw=="
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit our Instagram"
                        style={{ color: '#E1306C', fontSize: '24px', margin: '0 10px' }} // Instagram color and styling
                    >
                        <FaInstagram />
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default Header;
