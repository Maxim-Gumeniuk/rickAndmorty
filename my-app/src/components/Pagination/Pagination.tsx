import React from 'react';
import './Pagination.scss';

type Props = {
  page: number, 
  totalPages: number,
  prevPage: () => void,
  setPage: (param : number) => void,
  nextPage: () => void,
}

export const Pagination: React.FC<Props> = ({ 
  page,
  totalPages,
  prevPage,
  setPage,
  nextPage,
}) => {
  return (
    <div className="pagination">
      <button onClick={prevPage} className="page">
        &larr;
      </button>
      {[...Array(totalPages).keys()].map((number) => (
        <button
          onClick={() => setPage(number + 1)}
          key={number}
          className={`page ${page === number + 1 ? 'active' : ''}`}
        >
          {number + 1}
        </button>
      ))}
      <button onClick={nextPage} className="page">
        &rarr;
      </button>
    </div>
  );
};