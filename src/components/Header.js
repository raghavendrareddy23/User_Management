import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBars } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    toast.info('This feature is in development.');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 shadow-lg z-50">
      <ToastContainer />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Management System</h1>
        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <FaBars className="text-2xl" />
          </button>
        </div>
        <nav className="hidden lg:flex space-x-4">
          <button 
            onClick={handleClick} 
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            Home
          </button>
          <button 
            onClick={handleClick} 
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            User Activity
          </button>
          <button 
            onClick={handleClick} 
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            Login
          </button>
        </nav>
      </div>
      {isOpen && (
        <div className="flex flex-col mt-4 lg:hidden">
          <button 
            onClick={handleClick} 
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg mb-2 transition duration-300">
            Home
          </button>
          <button 
            onClick={handleClick} 
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg mb-2 transition duration-300">
            User Activity
          </button>
          <button 
            onClick={handleClick} 
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg mb-2 transition duration-300">
            Login
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
