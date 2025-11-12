import React from 'react';
import './Pagination.css';

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="pagination">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="pagination-btn"
        aria-label="Previous"
      >
        &lt; Prev
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i+1}
          className={`pagination-btn${page === i+1 ? ' active' : ''}`}
          onClick={() => onPageChange(i + 1)}
          aria-current={page === i+1}
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="pagination-btn"
        aria-label="Next"
      >
        Next &gt;
      </button>
    </div>
  );
}
