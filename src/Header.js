import React from 'react';
import { FiSearch } from 'react-icons/fi'; 
import Swiggy from './Swiggy.png'

const Header = () => {
  return (
    <header className="bg-white p-4 flex justify-between items-center">
      <div className="flex items-center"> 
        <img src={Swiggy} alt="Swiggy Logo" className="h-8 mr-2" />
        <h1 className="text-xl font-bold text-orange-600">Food Menu App</h1>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded px-2 py-1 pl-8 focus:outline-none"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <FiSearch data-testid="icon" className="h-5 w-5 text-gray-400" /> 
        </div>
      </div>
    </header>
  );
};

export default Header;
