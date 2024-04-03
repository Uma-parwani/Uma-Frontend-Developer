import React from 'react';

const Filters = ({ areas, handleAreaChange, handleSortChange }) => {
  return (
    <div className="bg-gray-100 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold">Filter By Area:</div>
        <div className="relative">
          <select
            onChange={handleAreaChange}
            className="border border-gray-300 rounded px-2 py-1 pr-8 focus:outline-none"
          >
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="font-semibold">Sort By:</div>
        <select
          onChange={handleSortChange}
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
        >
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
