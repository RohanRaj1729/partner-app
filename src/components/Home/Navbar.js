import React, { useState } from 'react';
import Logo from './Logo';
import NavLink from './NavLink';
import MobileNavLink from './MobileNavLink';
import { Menu, X, Home, User, Settings } from 'lucide-react';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Logo />

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink icon={<Home className="w-4 h-4" />} text="Home" />
                        <NavLink icon={<User className="w-4 h-4" />} text="Profile" />
                        <NavLink icon={<Settings className="w-4 h-4" />} text="Settings" />
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <X className="w-6 h-6 text-gray-600" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-600" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <MobileNavLink icon={<Home className="w-4 h-4" />} text="Home" />
                        <MobileNavLink icon={<User className="w-4 h-4" />} text="Profile" />
                        <MobileNavLink icon={<Settings className="w-4 h-4" />} text="Settings" />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;