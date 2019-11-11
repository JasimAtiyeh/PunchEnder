import React, { useState } from "react";
import Editor from './editor/editor';
import { withRouter } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Mutations from "../../../graphql/mutations";
import Tabs from "./tabs";
import Nav from "./last_nav";
const { UPDATE_PROJECT_STORY } = Mutations;

const BuildFormStory = props => {
  const { project } = props;
  const [story, setStory] = useState(props.story || '');
  const [needSave, setNeedSave] = useState(false);
  const [save, mdata] = useMutation(UPDATE_PROJECT_STORY);

  return (
    <div className="build-form-story">
      <Nav
        project={project}
        mdata={mdata}
        save={save}
        setNeedSave={setNeedSave}
        needSave={needSave}
        variables={{ story, _id: project._id }}/>
      <Tabs projectId={props.match.params.projectId} />
      <h2>Now introduce your project.</h2>
      <p>Tell backers why they should fund this project. Include important background details and future plans.</p>
      <Editor needSave={needSave} setNeedSave={setNeedSave} story={story} setStory={setStory}/>
    </div>
  )
};

export default withRouter(BuildFormStory);