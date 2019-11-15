import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const UpdatePanel = props => {
  const { update, num, setEditing } = props;
  const { projectCreator } = update.project;
  const date = new Date(parseInt(update.date));
  const content = convertFromRaw(JSON.parse(update.body));
  const editorState = EditorState.createWithContent(content);

  return (
    <li className="update-panel">
      <span className="update-no">Update #{num}</span>
      <h3>{update.title}</h3>
      <div className="update-info">
        <div className="update-creator-image" />
        <div className="update-info-text">
          <div>{projectCreator.name} <span>Creator</span></div>
          <span>{date.toLocaleDateString("en-us", {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}</span>
        </div>
      </div>
      <div className="update-content">
        <Editor
          editorState={editorState}
          wrapperClassName="update-wrapper"
          editorClassName="update-editor"
          readOnly={true}
          textAlignment={"left"}
          toolbarHidden
        />
      </div>
      <div className="update-bottom">
        { projectCreator._id === localStorage.userId && 
          <button onClick={() => setEditing(update)}>Edit post</button>
        }
        <button>Read more</button>
      </div>
    </li>
  )
};

export default UpdatePanel;