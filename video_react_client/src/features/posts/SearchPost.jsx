import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { propTypes } from "prop-types";
import { SEARCH_API_URL } from "../../constants.js";
import PropTypes from "prop-types";

SearchPost.propTypes = {
  onResults: PropTypes.func.isRequired,
};

function SearchPost({
  onResults,
  onClear,
  page,
  onPageChange,
  totalPages,
  setTotalPages,
}) {
  const searchInputRef = useRef(null);
  const debounceRef = useRef(null);
  //   const navigate = useNavigate();
  //   const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const query = searchInputRef.current.value;

    try {
      setLoading(true);
      setError(null);
      console.log(`${SEARCH_API_URL}?q=${query}&page=${page}&per_page=10`);
      const response = await fetch(
        `${SEARCH_API_URL}?q=${query}&page=${page}&per_page=10`,
      );
      if (!response.ok) {
        setError(`HTTP error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("data", data);
      onResults(data.posts);

      onPageChange(data.current_page);
      setTotalPages(data.total_pages);

      //   return data;
    } catch (err) {
      setError(err.message);
      throw new Error(`Failed to fetch post details: ${err.message}`);
    } finally {
      setLoading(false);
    }
    // navigate(`/search?q=${query}`);
  };

  const handSeachChange = (e) => {
    e.preventDefault();
    const searchValue = e.target.value;
    // onImediateChange(searchValue);

    // clear the existing timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      //   onSearchChange(searchInput.current.value);
    }

    // Set a new timeout
    debounceRef.current = setTimeout(() => {
      //   onSearchChange(searchValue);
    }, 500);
  };

  return (
    <>
      {loading && (
        <div className="status-panel">
          <span className="loader" aria-hidden="true" />
          <p>Loading posts...</p>
        </div>
      )}
      {error && (
        <div className="status-panel status-panel-error">
          <p>Error: {error}</p>
        </div>
      )}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          ref={searchInputRef}
          //   onChange={handSeachChange}
          placeholder="Search..."
          //   value={value}
        />
        <button type="submit">Search</button>
      </form>
      <button type="button" onClick={onClear}>
        Clear
      </button>
    </>
  );
}

export default SearchPost;
