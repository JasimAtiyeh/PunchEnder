import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Queries from '../../../../graphql/queries';
import Panel from './panel';
const { FETCH_PROJECT_COMMENTS } = Queries;

const CommentList = props => {
  const { projectId } = props;
  const { loading, error, data } = useQuery(
    FETCH_PROJECT_COMMENTS, 
    { variables: { project: projectId } }
  );
  if (loading) return <p>Loading...</p>;
  if (error) { console.dir(error); return <p>Error</p> }

  const comments = data.projectComments;
  const commentLis = comments.map(comment => {
    return <Panel 
      key={comment._id} 
      comment={comment} 
      projectId={projectId} />
  });

  return (
    <ul className="comment-list">
      {commentLis}
    </ul>
  )
};

export default CommentList;