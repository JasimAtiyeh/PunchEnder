import React from 'react';

const TitlePage = props => {
  return (
    <div className="create-form-name">
      <h2>
        It's time to give this project a name.
      </h2>
      <p>
        Give your project a name worth remembering!
      </p>
      <div className="create-form-input-container">
        <input value={props.name || ''} onChange={e => props.setName(e.target.value)} />
      </div>
      <div className="create-form-button-container">
        <button 
          className="create-form-back-button"
          onClick={() => props.setPage(1)}>
          <i className="fas fa-arrow-left" /> Category
        </button>
        <button
          className="create-form-forward-button"
          onClick={() => props.setPage(3)}
          disabled={!props.name}>
          Next: Description
        </button>
      </div>
   </div>
  )
};

export default TitlePage