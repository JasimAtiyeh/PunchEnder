import React from 'react';
import { Query } from 'react-apollo';
import * as Queries from '../../graphql/queries';
import ProjectIndexTile from './projects_index_tile';

const ProjectIndex = () => {
  return (
    <Query query={Queries.default.FETCH_PROJECTS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`

        return (
          <ul>
            {data.projects.map(project => (
              <li>
                <ProjectIndexTile project={project} />
              </li>
            ))}
          </ul>
        )
      }}
    </Query>
  )
};

export default ProjectIndex;