import React, { useState } from "react";
import Editor from '../editor/editor';
import { withRouter } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Mutations from "../../../../graphql/mutations";
import Queries from "../../../../graphql/queries";
import Tabs from "../tabs";
import Nav from "./nav";
const { FETCH_FINISHED_PROJECTS, FETCH_CATEGORY } = Queries;
const { UPDATE_PROJECT_STORY, LAUNCH_PROJECT } = Mutations;

const BuildFormStory = props => {
  const { project } = props;
  const [story, setStory] = useState(props.story || '');
  const [needSave, setNeedSave] = useState(false);
  const [save, mdata] = useMutation(UPDATE_PROJECT_STORY);

  const [launchProject] = useMutation(LAUNCH_PROJECT,
    {
      update(cache, { data: { launchProject } }) {
        try  {
          const rootQuery = cache.readQuery({ query: FETCH_FINISHED_PROJECTS });
          cache.writeQuery({
            query: FETCH_FINISHED_PROJECTS,
            data: { finishedProjects: rootQuery.finishedProjects.concat([launchProject]) },
          });
        } catch {
        }
        try {
          const rootQuery = cache.readQuery({ query: FETCH_CATEGORY, variables: { _id: launchProject.category._id } });
          cache.writeQuery({
            query: FETCH_CATEGORY,
            variables: { _id: launchProject.category._id },
            data: { category: { projects: rootQuery.category.projects.concat([launchProject]) } },
          })
        } catch {

        }
      }
    });

  return (
    <div className="build-form-story">
      <Nav
        project={project}
        mdata={mdata}
        launchProject={launchProject}
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