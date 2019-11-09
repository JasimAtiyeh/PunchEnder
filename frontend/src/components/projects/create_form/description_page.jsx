import React, { useEffect } from 'react';
import autosize from "autosize";

const DescriptionPage = props => {
  useEffect(() => {
    // console.log("componentDidMount");
    const textarea = document.getElementById("create-form-input-textarea");
    autosize(textarea);
    return () => {
      // console.log("componentWillUnmount");
      console.log('bye');
      autosize.destroy(textarea);
    };
  }, []); // empty-array means don't watch for any updates

  return (
    <div className="create-form-description">
      <h2>
        Let's make a description for your project.
      </h2>
      <p>
        Be sure to fully express the importance of your project!
      </p>
      <div className="create-form-input-container">
        <textarea 
          value={props.description || ''}
          id="create-form-input-textarea"
          onChange={e => props.setDescription(e.target.value)} 
          maxLength={135}/>
      </div>
      <div className="create-form-button-container">
        <button
          className="create-form-back-button"
          onClick={() => props.setPage(2)}>
          <i className="fas fa-arrow-left" /> Title
        </button>
        <button
          className="create-form-forward-button"
          onClick={() => props.setPage(3)}
          disabled={!props.description}>
          Continue
        </button>
      </div>
    </div>
  )
};

export default DescriptionPage