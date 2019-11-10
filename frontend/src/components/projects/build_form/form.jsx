import React from 'react';
import { Route } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Queries from "../../../graphql/queries";
import Mutations from "../../../graphql/mutations";
import BuildFormTabs from "./tabs";
import BuildFormBasics from "./basics";
const { FETCH_UNFINISHED_PROJECT } = Queries;

const BuildForm = props => {
  const { projectId } = props.match.params;
  const { loading, error, data } = useQuery(FETCH_UNFINISHED_PROJECT, { variables: { _id: projectId }});
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="build-form-container">
      <BuildFormTabs projectId={projectId} />
      <Route path="/projects/:projectid/build/basics" component={BuildFormBasics}/>
    </div>
  )
};

export default BuildForm;