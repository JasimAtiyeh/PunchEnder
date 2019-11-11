import React, { useState } from "react";
import Editor from './editor/editor';
import { withRouter } from "react-router-dom";
import Tabs from "./tabs";
import Nav from "./last_nav";

const BuildFormStory = props => {
  const [story, setStory] = useState(props.story || '');
  const [needSave, setNeedSave] = useState(false);

  return (
    <div className="build-form-story">
      <Nav />
      <Tabs projectId={props.match.params.projectId} />
      <h2>Now introduce your project.</h2>
      <p>Tell backers why they should fund this project. Include important background details and future plans.</p>
      <Editor needSave={needSave} setNeedSave={setNeedSave} story={story} setStory={setStory}/>
    </div>
  )
};

export default withRouter(BuildFormStory);