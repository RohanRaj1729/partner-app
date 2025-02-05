import React, { useState } from 'react';

const NavLink = ({ icon, text }) => (
    <a
        href="#"
        className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
    >
        {icon}
        <span>{text}</span>
    </a>
);

export default NavLink;