import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type PaginationElement = number | '...';

const Pagination: React.FC<PaginationProps> = ({
                                                 currentPage,
                                                 totalPages,
                                                 onPageChange,
                                               }) => {
  const getPaginationRange = (): PaginationElement[] => {
    if (totalPages <= 1) return [];

    const visiblePages = 2;
    let start = Math.max(1, currentPage - visiblePages);
    let end = Math.min(totalPages, currentPage + visiblePages);

    if (currentPage <= visiblePages) {
      end = Math.min(2 * visiblePages + 1, totalPages);
    }

    if (currentPage > totalPages - visiblePages) {
      start = Math.max(totalPages - 2 * visiblePages, 1);
    }

    const range: PaginationElement[] = [];

    if (start > 1) range.push(1);
    if (start > 2) range.push('...');

    for (let i = start; i <= end; i++) range.push(i);

    if (end < totalPages - 1) range.push('...');
    if (end < totalPages) range.push(totalPages);

    return range;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination" role="navigation" aria-label="Pagination">
      {currentPage > 1 && (
        <button
          className="pagination__icon"
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Предыдущая страница"
        >
          <MdKeyboardArrowLeft className="pagination__arrow" />
        </button>
      )}

      {getPaginationRange().map((element, index) =>
        typeof element === 'number' ? (
          <button
            key={`page-${element}`}
            onClick={() => onPageChange(element)}
            className={`pagination__page ${element === currentPage ? 'pagination__page--active' : ''}`}
            aria-label={`Страница ${element}`}
            aria-current={element === currentPage ? 'page' : undefined}
          >
            {element}
          </button>
        ) : (
          <span
            key={`dots-${index}`}
            className="pagination__dots"
            aria-hidden="true"
          >
            {element}
          </span>
        ),
      )}

      {currentPage < totalPages && (
        <button
          className="pagination__icon"
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Следующая страница"
        >
          <MdKeyboardArrowRight className="pagination__arrow" />
        </button>
      )}

    </div>
  );
};

export default Pagination;