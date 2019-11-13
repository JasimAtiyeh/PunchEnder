import React from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import Queries from "../../../graphql/queries";
import Main from "./main_panel";
import Tabs from "./tabs"
import CampaignPage from './campaign';
const { FETCH_FINISHED_PROJECT } = Queries;

const ProjectShowPage = props => {
  const { projectId } = props.match.params;
  const { loading, error, data } = useQuery(FETCH_FINISHED_PROJECT, { variables: { _id: projectId } });
  if (loading) { return <div>Loading...</div>};
  if (error) { return <div>Error!</div> };
  const { project } = data;
  const projectCreatorId = project.projectCreator._id;
  if (!project.launched && localStorage.currentUser === projectCreatorId) { return <Redirect to={`/projects/${project._id}/build`} />};
  if (!project.launched) { return <Redirect to="/" /> }

  return (
    <div className="project-show">
      <Main project={project}/>
      <Tabs projectId={project._id} />
      <Route
        exact path={`/projects/${projectId}`}
        render={props => <CampaignPage {...props} project={project} />} />
    </div>
  ) 
};

export default withRouter(ProjectShowPage);