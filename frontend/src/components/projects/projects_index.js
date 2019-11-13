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
    };
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

            console.log(data.category);

            while( data.category.projects.length > 0) {
              let projects;
              if (data.category.projects.length >= 4) { 
                projects = data.category.projects.splice(0,4);
              } else {
                projects = data.category.projects.splice(0,data.category.projects.length);
              }
              return (
                projects.map((project, idx) => {
                  if (project.launched) {
                    return (
                      <div key={idx} className='projects-index-segment'>
                        { projects.length >= 1 && <li>
                          <ProjectIndexLargeTile project={project} />
                        </li> }
                        { projects.length >= 2 && <li>
                          <ProjectIndexTile project={projects[idx + 1]} />
                        </li> }
                        { project.length >= 3 && <li>
                          <ProjectIndexTile project={projects[idx + 2]} />
                        </li> }
                        { projects.length >= 4 && <li>
                          <ProjectIndexTile project={projects[idx + 3]} />
                        </li> }
                      </div>
                    )
                  }
                })
              )
            }
          }}
        </Query>
      )
    } else {
      console.log(this.state.category);
      projectDisplay = (
        <Query query={ Queries.default.FETCH_PROJECTS }>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            while(data.projects.length > 0) {
              let projects = data.projects
              if (data.projects.length >= 4) {
                projects = data.projects.splice(0, 4);
              } else {
                projects = data.category.projects.splice(0, data.category.projects.length);
              }
              return (
                projects.map((project, idx) => {
                  if (project.launched) {
                    return (
                      <div key={idx} className='projects-index-segment'>
                        { projects.length >= 1 && <li>
                          <ProjectIndexLargeTile project={project} />
                        </li> }
                        { projects.length >= 2 && <li>
                          <ProjectIndexTile project={projects[idx + 1]} />
                        </li> }
                        { project.length >= 3 && <li>
                          <ProjectIndexTile project={projects[idx + 2]} />
                        </li> }
                        { projects.length >= 4 && <li>
                          <ProjectIndexTile project={projects[idx + 3]} />
                        </li> }
                      </div>
                    )
                  }
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