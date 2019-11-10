import React, { useState } from "react";
import StoryEditor from './editor/story_editor';
import { withRouter } from "react-router-dom";
import Tabs from "./tabs";
import Nav from "./last_nav";

const BuildFormStory = props => {
  const [story, setStory] = useState(props.story || '');
  return (
    <div className="build-form-story">
      <Nav />
      <Tabs projectId={props.match.params.projectId} />
      <h2>Now introduce your project.</h2>
      <p>Tell backers why they should fund this project. Include important background details and future plans.</p>
      <StoryEditor />
    </div>
  )
};

export default withRouter(BuildFormStory);