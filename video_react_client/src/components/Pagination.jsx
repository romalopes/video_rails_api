function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div>
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </button>

      <span>
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
