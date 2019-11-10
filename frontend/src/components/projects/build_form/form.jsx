import React from 'react';
import { Route } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Queries from "../../../graphql/queries";
import Mutations from "../../../graphql/mutations";
import Basics from "./basics"
import Rewards from "./rewards"
import Story from "./story"

const { FETCH_UNFINISHED_PROJECT } = Queries;

const BuildForm = props => {
  const { projectId } = props.match.params;
  const { loading, error, data } = useQuery(FETCH_UNFINISHED_PROJECT, { variables: { _id: projectId }});
  if (loading) return <div>Loading...</div>;
  if (error) {
    console.dir(error);
    return <div>{error.responseJSON}</div>
  };

  return (
    <div className="build-form-container">
      <Route 
        path="/projects/:projectId/build/basics" 
        render={ props => <Basics {...props} project={data.project} /> } />
      <Route path="/projects/:projectId/build/rewards" component={Rewards} />
      <Route 
        path="/projects/:projectId/build/story" 
        render={props => <Story {...props} story={data.project.story} />} />
    </div>
  )
};

export default BuildForm;