import React, { useState } from 'react';

const MobileNavLink = ({ icon, text }) => (
    <a
        href="#"
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50"
    >
        {icon}
        <span>{text}</span>
    </a>
);

export default MobileNavLink;