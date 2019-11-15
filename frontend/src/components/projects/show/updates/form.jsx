import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Mutations from "../../../../graphql/mutations";
import Editor from './editor/editor';
const { CREATE_UPDATE, UPDATE_UPDATE } = Mutations;

const UpdateAddForm = props => {
  const { update, cancel } = props;
  const [createUpdate] = useMutation(CREATE_UPDATE);
  const [updateUpdate] = useMutation(UPDATE_UPDATE);
  const [title, setTitle] = useState(update ? update.title : '');
  const [body, setBody] = useState(update ? update.body : '');
  const _id = update ? update._id : '';
  const project = props.projectId;
  const variables = { _id, title, body, project };
  console.log(variables);
  console.log(update);

  const submit = () => {
    return update ? updateUpdate({ variables }) : createUpdate({variables});
  }

  return (
    <div className="update-form-container">
      <form className="update-form">
        <input
          placeholder="Title your post."
          type="text"
          onChange={e => setTitle(e.target.value)}/>
        <Editor 
          setBody={setBody} />
        <div className="update-form-button-container">
          <button
            onClick={() => submit().then(() => cancel())} 
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