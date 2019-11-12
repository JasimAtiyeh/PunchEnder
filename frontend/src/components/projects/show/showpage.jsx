import React from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import Queries from "../../../graphql/queries";
import Main from "./main_panel";
const { FETCH_FINISHED_PROJECT } = Queries;

const ProjectShowPage = props => {
  const { projectId } = props.match.params;
  const { loading, error, data } = useQuery(FETCH_FINISHED_PROJECT, { variables: { _id: projectId } });
  if (loading) { return <div>Loading...</div>};
  if (error) { return <div>Error!</div> };
  const { project } = data;

  return (
    <div className="project-show">
      <Main project={project}/>
    </div>
  ) 
};

export default withRouter(ProjectShowPage);