import React from 'react';

const Logo = () => (
    <div className="flex items-center h-16 px-5">
        <div className="flex items-center space-x-2">
            <img
                src="applogo.png"
                alt="Company Logo"
                className="h-8 w-auto object-contain"
            />
            <img
                src="typo.png"
                alt="Company Name"
                className="h-6 w-auto object-contain"
            />
        </div>
    </div>
);

export default Logo;