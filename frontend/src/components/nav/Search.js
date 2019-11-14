import React from 'react';

const Search = props => {
  const { setSearching } = props;
  return (
    <div className="nav">
      <input type="text" />
      <button onClick={() => setSearching(false)}>
        <i className="fas fa-times" />
      </button>
    </div>
  )
};

export default Search;