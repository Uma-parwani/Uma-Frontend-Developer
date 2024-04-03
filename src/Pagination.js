import React, { useState } from 'react';

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const totalPages = 7; 

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    pageButtons.push(
      <button
        key="prev"
        className={`text-black rounded-lg px-4 py-2 ${currentPage === 1 ? 'bg-green-500 text-white' : 'hover:bg-gray-300'}`}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>
    );
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`text-black rounded-lg px-4 py-2 ${currentPage === i ? 'bg-green-500 text-white' : 'hover:bg-gray-300'}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
    pageButtons.push(
      <button
        key="next"
        className={`text-black rounded-lg px-4 py-2 ${currentPage === totalPages ? 'bg-green-500 text-white' : 'hover:bg-gray-300'}`}
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    );
    return pageButtons;
  };

  return (
    <div className="pagination">
      {renderPageButtons()}
    </div>
  );
};

export default Pagination;