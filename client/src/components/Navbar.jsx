import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-indigo-600 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-xl font-bold tracking-wide">
                        EMP Manager
                    </Link>
                    <div className="flex space-x-4">
                        <Link to="/" className="hover:bg-indigo-700 px-3 py-2 rounded-md font-medium transition">
                            Employees
                        </Link>
                        <Link to="/add" className="bg-white text-indigo-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium transition shadow-sm">
                            Add Employee
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
