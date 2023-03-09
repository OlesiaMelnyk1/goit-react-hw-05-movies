import { useState } from 'react';
import { PropTypes } from 'prop-types';
import css from './Searchbar.module.css';

export const MovieSearch = ({ onSubmit }) => {
  const [query, setQuery] = useState([]);

  const handleInputChange = e => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      alert('Please, enter a search word!');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <form className={css.searchForm} onSubmit={handleFormSubmit}>
      <input
        className={css.searchInput}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movie"
        name="query"
        value={query}
        onChange={handleInputChange}
      />
      <button className={css.searchButton} type="submit"></button>
    </form>
  );
};

MovieSearch.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
