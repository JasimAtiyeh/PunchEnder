import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import Queries from "../../../graphql/queries";
import Basics from "./basics/basics";
import Rewards from "./rewards/rewards"
import Story from "./story/story"

const { FETCH_UNFINISHED_PROJECT } = Queries;

const BuildForm = props => {
  const { projectId } = props.match.params;
  const { loading, error, data } = useQuery(FETCH_UNFINISHED_PROJECT, { variables: { _id: projectId }});
  if (loading) return <div>Loading...</div>;
  if (error) {
    console.dir(error);
    return <div>{error.responseJSON}</div>
  };

  const { project } = data;
  if (!project) { return <div>Project does not exist</div> }

  const currentUser = localStorage.userId;
  const projectCreatorId = project.projectCreator._id;
  // Only let project creator access their build page.
  // And also only allow user to access the build page if the project is not launched.
  if (!currentUser || currentUser !== projectCreatorId) { return <Redirect to={`/projects/${project._id}`} /> }
  if (project.launched) { return <Redirect to={`/projects/${project._id}`}/> };

  return (
    <div className="build-form-container">
      <Route 
        path="/projects/:projectId/build/basics" 
        render={ props => <Basics {...props} project={project} /> } />
      <Route
        path="/projects/:projectId/build/rewards"
        render={props => <Rewards {...props} project={project} />} />
      <Route 
        path="/projects/:projectId/build/story" 
        render={props => <Story {...props} story={data.project.story} project={project} />} />
    </div>
  )
};

export default BuildForm;