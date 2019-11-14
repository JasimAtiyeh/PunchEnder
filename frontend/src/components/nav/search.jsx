import React, { useState } from 'react';
import SearchResults from './search_results';


const Search = props => {
  const { setSearching } = props;
  const [filter, setFilter] = useState('');

  return (
    <div className="nav nav-search">
      <input 
        type="text" 
        placeholder="Search for projects and categories"
        value={filter} 
        onChange={e => setFilter(e.target.value)} />
      {
        filter.length > 0 &&
        <SearchResults filter={filter} />
      }
      <button onClick={() => setSearching(false)}>
        <i className="fas fa-times" />
      </button>
    </div>
  )
};

export default Search;