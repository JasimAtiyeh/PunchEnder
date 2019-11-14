import React from 'react';
import Form from './form';
import List from './list';

const CommentPage = props => {
  const { projectId } = props;
  return (
    <div className="comment-page">
      <div className="comment-page-column-1">
        <Form projectId={projectId} />
        <List projectId={projectId} />
      </div>
      <div className="comment-page-column-2">

      </div>
    </div>
  )
};

export default CommentPage;