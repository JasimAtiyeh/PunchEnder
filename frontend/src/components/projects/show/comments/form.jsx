import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Mutations from '../../../../graphql/mutations';
import Queries from '../../../../graphql/queries';
const { CREATE_COMMENT } = Mutations;
const { FETCH_PROJECT_COMMENTS, FETCH_USER_IMAGE } = Queries;

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

  const { loading, error, data } = useQuery(FETCH_USER_IMAGE, { variables: { _id: localStorage.userId } });
  if (loading) return <div>Loading...</div>;
  if (error) { return <div>{error}</div> };

  const { user } = data;
  const image = user.image ?
    user.image : "https://ksr-ugc.imgix.net/missing_user_avatar.png?ixlib=rb-2.1.0&w=80&h=80&fit=crop&v=&auto=format&frame=1&q=92&s=d89e3180fafd307918a94a3c9dd79c45";

  return (
    <div className="comment-form-container">
      <div>
        <img
          src={image}
          className="comment-form-image-container" />
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
          placeholder={"Say what's on your mind."}
          value={ body }
          onChange={ e => setBody(e.target.value) }/>
        <button>Post Comment</button>
        { showError && <span className="comment-error">Comment can't be blank!</span> }
      </form>
    </div>
  )
};

export default CommentForm;