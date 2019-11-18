import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PledgeTile from '../../pledge/pledge_tile';
import RewardTile from '../../pledge/reward_tile';

const CampaignPage = props => {
  const { project } = props;
  const { story } = project;
  const content = convertFromRaw(JSON.parse(story));
  const editorState = EditorState.createWithContent(content);
  const [show, setShow] = useState('');
  const rewards = Array.from(project.rewards);

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
        <PledgeTile
          num={0}
          show={show}
          setShow={setShow}
          ownProps={props}
          projectId={project._id} />
        {rewards.map((reward, idx) => (
          <RewardTile
            num={idx + 1}
            onCampaign={true}
            show={show}
            setShow={setShow}
            key={idx}
            projectId={project._id}
            ownProps={props}
            reward={reward} />
        ))}
      </div>
    </div>
  )
};

export default CampaignPage;