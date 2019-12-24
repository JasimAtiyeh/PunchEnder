import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Mutations from '../../../../graphql/mutations';
import Queries from '../../../../graphql/queries';
import { withApollo } from 'react-apollo';
const { CREATE_COMMENT } = Mutations;
const { FETCH_PROJECT_COMMENTS, FETCH_USER_IMAGE } = Queries;

const CommentForm = props => {
  const [body, setBody] = useState('');
  const [showError, setShowError] = useState(false);
	const currentUser = props.client.cache.data.data.ROOT_QUERY.currentUser;

  const [createComment] = useMutation(CREATE_COMMENT,
    {
      update(cache, { data: { newComment } }) {
        try {
          const rootQuery = cache.readQuery({
            query: FETCH_PROJECT_COMMENTS,
            variables: { project: props.projectId }
          });
          cache.writeQuery({
            query: FETCH_PROJECT_COMMENTS,
            variables: { project: props.projectId },
            data: { projectComments: rootQuery.projectComments.concat([newComment]) },
          });
        } catch {
        }
      }
    });

  const { loading, error, data } = useQuery(FETCH_USER_IMAGE, { variables: { _id: currentUser } });
  if (loading) return null;
  if (error) { return <div>Error!</div> };

  const { user } = data;
  const image = user.image ?
    user.image : "https://ksr-ugc.imgix.net/missing_user_avatar.png?ixlib=rb-2.1.0&w=80&h=80&fit=crop&v=&auto=format&frame=1&q=92&s=d89e3180fafd307918a94a3c9dd79c45";

  return (
    <div className="comment-form-container">
      <div>
        <img
          alt=""
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

export default withApollo(CommentForm);