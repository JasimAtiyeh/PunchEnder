import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Mutations from '../../../../graphql/mutations';
import Queries from '../../../../graphql/queries';
const { CREATE_COMMENT } = Mutations;
const { FETCH_PROJECT_COMMENTS } = Queries;

const CommentForm = props => {
  const [body, setBody] = useState('');
  const [showError, setShowError] = useState(false);

  const [createComment] = useMutation(CREATE_COMMENT,
    {
      update(cache, { data: { newComment } }) {
        const rootQuery = cache.readQuery({
          query: FETCH_PROJECT_COMMENTS,
          variables: { project: props.projectId }
        });
        cache.writeQuery({
          query: FETCH_PROJECT_COMMENTS,
          variables: { project: props.projectId },
          data: { projectComments: rootQuery.projectComments.concat([newComment]) },
        });
      }
    });

  return (
    <div className="comment-form-container">
      <div>
        <div className="comment-form-image-container">
        </div>
      </div>
      <form 
        className="comment-form"
        onSubmit={ e => {
          e.preventDefault();
          if (body.length < 1) { setShowError(true); return };
          setShowError(false);
          createComment({ variables: { body , project: props.projectId }})
            .then(() => setBody(''));
        }}>
        <textarea 
          value={ body }
          onChange={ e => setBody(e.target.value) }/>
        <button>Post Comment</button>
        { showError && <span className="comment-error">Comment can't be blank!</span> }
      </form>
    </div>
  )
};

export default CommentForm;