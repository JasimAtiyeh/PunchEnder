import React from 'react';
import Form from './form';
import List from './list';

const CommentPage = props => {
  const { projectId } = props;
  return (
    <div className="comment-page">
      <div className="comment-page-column-1">
        { localStorage.userId && <Form projectId={projectId} /> } 
        <List projectId={projectId} />
      </div>
      <div className="comment-page-column-2">
        <div className="comment-rules">
          <p>Remember the golden rules of commenting</p>
          <ol>
            <li>Treat others with respect.</li>
            <li>Stay on subject.</li>
            <li>Don't post spam or ads.</li> 
          </ol>
        </div>
      </div>
    </div>
  )
};

export default CommentPage;