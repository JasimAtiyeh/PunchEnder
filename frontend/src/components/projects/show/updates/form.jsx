import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Mutations from "../../../../graphql/mutations";
import Queries from "../../../../graphql/queries";
import Editor from './editor/editor';
const { CREATE_UPDATE, UPDATE_UPDATE } = Mutations;
const { FETCH_PROJECT_UPDATES } = Queries;

const UpdateAddForm = props => {
  const { update, cancel, projectId } = props;
  const [createUpdate] = useMutation(CREATE_UPDATE,
    {
      update(cache, { data: { newUpdate } }) {
        const rootQuery = cache.readQuery({
          query: FETCH_PROJECT_UPDATES,
          variables: { project: projectId }
        });
        cache.writeQuery({
          query: FETCH_PROJECT_UPDATES,
          variables: { project: projectId },
          data: { projectUpdates: rootQuery.projectUpdates.concat([newUpdate]) },
        });
      }
  })
  const [updateUpdate] = useMutation(UPDATE_UPDATE);
  
  const [title, setTitle] = useState(update ? update.title : '');
  const [body, setBody] = useState(update ? update.body : '');
  const _id = update ? update._id : '';
  const project = props.projectId;

  const submit = () => {
    const variables = { _id, title, body, project };
    console.log(variables);
    return update ? updateUpdate({ variables }) : createUpdate({ variables });
  }

  return (
    <div className="update-form-container">
      <form className="update-form">
        <input
          placeholder="Title your post."
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}/>
        <Editor
          body={body}
          setBody={setBody} />
        <div className="update-form-button-container">
          <button
            onClick={() => submit().then((res) => {console.dir(res);cancel()})} 
            className="update-save">
            Save
          </button>
          <button
            onClick={() => cancel()}
            className="update-cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
};

export default UpdateAddForm;