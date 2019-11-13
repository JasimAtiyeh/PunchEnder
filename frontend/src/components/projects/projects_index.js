import React from 'react';
import { Query } from 'react-apollo';
import * as Queries from '../../graphql/queries';
import ProjectIndexTile from './projects_index_tile';
import ProjectIndexLargeTile from './projects_index_large_tile';

class ProjectIndex extends React.Component {
  constructor(props) {
    super(props);
    if (!props.location.state) {
      props.location.state = { category: undefined };
    }
    this.state = {
      category: props.location.state.category
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
          variables={{ _id: this.state.category }} >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            let projects = data.category.projects.filter(project => project.launched);
            while(projects.length > 0) {
              let projectsSplice;
              if (data.category.projects.length >= 4) {
                projectsSplice = projects.splice(0, 4)
              } else {
                projectsSplice = projects.splice(0, projects.length)
              }
              return (
                projectsSplice.map((project, idx) => {
                  return (
                    <div key={idx} className='projects-index-segment'>
                      {project && <li className='projects-index-segment-large-tile'>
                        <ProjectIndexLargeTile project={project} />
                      </li>}
                      <div className='projects-index-segment-side'>
                        {projectsSplice[idx + 1] && <li>
                          <ProjectIndexTile project={projectsSplice[idx + 1]} />
                        </li>}
                        {projectsSplice[idx + 2] && <li>
                          <ProjectIndexTile project={projectsSplice[idx + 2]} />
                        </li>}
                        {projectsSplice[idx + 3] && <li>
                          <ProjectIndexTile project={projectsSplice[idx + 3]} />
                        </li>}
                      </div>
                    </div>
                  )
                })
              )
            }
          }}
        </Query>
      )
    } else {
      projectDisplay = (
        <Query query={ Queries.default.FETCH_PROJECTS }>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            let projects = data.projects.filter(project => project.launched);
            while(projects.length > 0) {
              let projectsSplice;
              if (data.projects.length >= 4) {
                projectsSplice = projects.splice(0, 4)
              } else {
                projectsSplice = projects.splice(0, projects.length)
              }
              return (
                projectsSplice.map((project, idx) => {
                  return (
                    <div key={idx} className='projects-index-segment'>
                      {project && <li className='projects-index-segment-large-tile'>
                        <ProjectIndexLargeTile project={project} />
                      </li>}
                      <div className='projects-index-segment-side'>
                        {projectsSplice[idx + 1] && <li>
                          <ProjectIndexTile project={projectsSplice[idx + 1]} />
                        </li>}
                        {projectsSplice[idx + 2] && <li>
                          <ProjectIndexTile project={projectsSplice[idx + 2]} />
                        </li>}
                        {projectsSplice[idx + 3] && <li>
                          <ProjectIndexTile project={projectsSplice[idx + 3]} />
                        </li>}
                      </div>
                    </div>
                  )
                })
              )
            }
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
            return (
              <div className='projects-index-category-list'>
                <ul>
                  {data.categories.map((category, idx) => (
                    <li
                      className='projects-index-category-list-item'
                      key={idx}
                      onClick={() => this.selectCategory(category._id)}>
                        {category.name}
                    </li>
                  ))}
                </ul>
              </div>
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