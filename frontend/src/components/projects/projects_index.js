import React from 'react';
import { Query, useQuery } from 'react-apollo';
import * as Queries from '../../graphql/queries';
import ProjectIndexTile from './projects_index_tile';

class ProjectIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: undefined
    };
  }

  selectCategory(category) {
    this.setState({ category });
  }

  render() {
    let projectDisplay;

    if (this.state.category) {
      projectDisplay = (
        <Query
          query={ Queries.default.FETCH_CATEGORY }
          variables={{ id: this.state.category }} >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            return (
              data.category.projects.map((project, idx) => (
                <li key={idx}>
                  <ProjectIndexTile project={project} />
                </li>
              ))
            )
          }}
        </Query>
      )
    } else {
      projectDisplay = (
        <Query query={ Queries.default.FETCH_PROJECTS }>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            return (
              <ul>
                {data.projects.map((project, idx) => (
                  <li key={idx}>
                  <ProjectIndexTile project={project} />
                </li>
                ))}
              </ul>
            )
          }}
        </Query>
      )
    }

    return (
      <div>
        <Query query={Queries.default.FETCH_CATEGORIES}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            console.log(data)
            return (
              <ul>
                {data.categories.map((category, idx) => (
                  <li
                    key={idx}
                    onClick={() => this.selectCategory(category.id)}>
                      {category.name}
                  </li>
                ))}
              </ul>
            )
          }}
        </Query>
        <div>
          {projectDisplay}
        </div>
      </div>
    )
  }
};

export default ProjectIndex;