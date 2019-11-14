import React from 'react';

const CommentPanel = props => {
  const { comment } = props;

  return (
    <li className="comment-panel">
      <div className="comment-panel-header">

      </div>
      <p className="comment-panel-body">
        {comment.body}
      </p>
    </li>
  )
};

export default CommentPanel;