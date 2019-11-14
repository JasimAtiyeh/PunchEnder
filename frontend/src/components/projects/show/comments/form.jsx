import React, { useState } from 'react';

const CommentForm = props => {
  const [body, setBody] = useState('');

  return (
    <div className="comment-form-container">
      <div>
        
      </div>
      <form 
        className="comment-form"
        onSubmit={ e => {
          e.preventDefault();
        }}>
        <textarea 
          value={ body }
          onChange={ e => setBody(e.target.value) }/>
        <button>Post Comment</button>
      </form>
    </div>
  )
};

export default CommentForm;