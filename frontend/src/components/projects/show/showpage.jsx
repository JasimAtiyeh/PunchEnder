import React from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import Queries from "../../../graphql/queries";
import Main from "./main_panel";
import Tabs from "./tabs"
import CampaignPage from './campaign';
import CommentPage from './comments/page';
import UpdatePage from './updates/update_page';
import UpdateShow from './updates/update_show';
import { withApollo } from 'react-apollo';
const { FETCH_FINISHED_PROJECT } = Queries;

const ProjectShowPage = props => {
  const { projectId } = props.match.params;
	const currentUser = props.client.cache.data.data.ROOT_QUERY.currentUser;
  const { loading, error, data } = useQuery(FETCH_FINISHED_PROJECT, { variables: { _id: projectId } });
  if (loading) return null;
  if (error) { return <h2 className="not-found">Project not found!</h2> };
  const { project } = data;
  const projectCreatorId = project.projectCreator._id;
  if (!project.launched && currentUser === projectCreatorId) { return <Redirect to={`/projects/${project._id}/build/basics`} />};
  if (!project.launched) { return <Redirect to="/" /> }

  return (
    <div className="project-show">
      <Main project={project}/>
      <Tabs projectId={project._id} />
      <Route
        exact path={`/projects/${projectId}`}
        render={props => <CampaignPage {...props} project={project} />} />
      <Route
        exact path={`/projects/${projectId}/comments`}
        render={props => <CommentPage {...props} projectId={project._id} />} />
      <Route
        exact path={`/projects/${projectId}/updates`}
        render={props => <UpdatePage {...props} projectCreatorId={projectCreatorId} projectId={project._id} />} />
      <Route
        exact path={`/projects/${projectId}/updates/:updateId`}
        component={UpdateShow} />
    </div>
  ) 
};

export default withRouter(withApollo(ProjectShowPage));