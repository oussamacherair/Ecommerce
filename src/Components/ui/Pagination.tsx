import React, { useMemo } from 'react';
import './Pagination.css';

// React Icons (you'll need to install: npm install react-icons)
import {
  MdFirstPage,
  MdLastPage,
  MdChevronLeft,
  MdChevronRight
} from 'react-icons/md';

interface PaginationProps {
  total: number;
  skip: number;
  limit: number;
  loading: boolean;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  skip,
  limit,
  loading,
  onPageChange
}) => {
  const paginationData = useMemo(() => {
    const currentPage = Math.floor(skip / limit) + 1; // Fix: Add 1 to make it 1-based
    const totalPages = Math.ceil(total / limit);

    // Generate page numbers to display
    const generatePageNumbers = () => {
      const delta = 2; // Number of pages to show around current page
      const range = [];
      const rangeWithDots = [];

      for (let i = Math.max(2, currentPage - delta);
        i <= Math.min(totalPages - 1, currentPage + delta); i++) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, '...');
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages);
      } else if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };

    const pageNumbers = totalPages > 1 ? generatePageNumbers() : [1];
    const showDots = pageNumbers.includes('...');

    return {
      currentPage,
      totalPages,
      pageNumbers,
      showDots
    };
  }, [total, skip, limit]);

  const { currentPage, totalPages, pageNumbers } = paginationData;

  // Early return if no pagination needed
  if (total <= limit) {
    return null;
  }

  const handlePageChange = (page: number) => {
    if (loading || page === currentPage || page < 1 || page > totalPages) {
      return;
    }
    onPageChange?.(page);
  };

  const handleFirstPage = () => handlePageChange(1); // Fix: Should be 1, not 0
  const handleLastPage = () => handlePageChange(totalPages);
  const handlePrevPage = () => handlePageChange(currentPage - 1);
  const handleNextPage = () => handlePageChange(currentPage + 1);

  return (
    <div className="pagination-container">
      <div className={`pagination ${loading ? 'loading' : ''}`}>
        {/* First Page */}
        <button
          className="pagination-btn"
          disabled={currentPage === 1 || loading}
          onClick={handleFirstPage}
          aria-label="Go to first page"
        >
          <MdFirstPage size={16} />
        </button>

        {/* Previous Page */}
        <button
          className="pagination-btn"
          disabled={currentPage === 1 || loading}
          onClick={handlePrevPage}
          aria-label="Go to previous page"
        >
          <MdChevronLeft size={16} />
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((pageNum, index) => (
          pageNum === '...' ? (
            <span key={`dots-${index}`} className="pagination-dots">
              ...
            </span>
          ) : (
            <button
              key={pageNum}
              className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
              disabled={loading}
              onClick={() => handlePageChange(pageNum as number)}
              aria-label={`Go to page ${pageNum}`}
              aria-current={currentPage === pageNum ? 'page' : undefined}
            >
              {pageNum}
            </button>
          )
        ))}

        {/* Next Page */}
        <button
          className="pagination-btn"
          disabled={currentPage === totalPages || loading}
          onClick={handleNextPage}
          aria-label="Go to next page"
        >
          <MdChevronRight size={16} />
        </button>

        {/* Last Page */}
        <button
          className="pagination-btn"
          disabled={currentPage === totalPages || loading}
          onClick={handleLastPage}
          aria-label="Go to last page"
        >
          <MdLastPage size={16} />
        </button>
      </div>

     
     
    </div>
  );
};

export default Pagination;