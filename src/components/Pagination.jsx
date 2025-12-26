import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Pagination.css';

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 4) {
        pages.push(1, 2, 3, 4, 5, 'ellipsis', totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(1, 'ellipsis');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1, 'ellipsis', page - 1, page, page + 1, 'ellipsis', totalPages);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="pagination-btn"
        aria-label="Previous"
      >
        <FaChevronLeft />
      </button>

      {pageNumbers.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={i} className="pagination-ellipsis">
            &hellip;
          </span>
        ) : (
          <button
            key={p}
            className={`pagination-btn${page === p ? ' active' : ''}`}
            onClick={() => onPageChange(p)}
            aria-current={page === p ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="pagination-btn"
        aria-label="Next"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
