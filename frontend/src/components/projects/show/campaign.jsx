import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const CampaignPage = props => {
  const { project } = props;
  const { story } = project;
  const content = convertFromRaw(JSON.parse(story));
  const editorState = EditorState.createWithContent(content);

  return (
    <div className="campaign-page">
      <div className="campaign-story">
        <h2>About</h2>
        <div className="campaign-editor-container">
          <Editor
            editorState={editorState}
            toolbarClassName="story-toolbar"
            wrapperClassName="story-wrapper"
            editorClassName="story-editor"
            readOnly={true}
            textAlignment={"left"}
            toolbarHidden
          />
        </div>
      </div>
      <div className="campaign-rewards">
      </div>
    </div>
  )
};

export default CampaignPage;