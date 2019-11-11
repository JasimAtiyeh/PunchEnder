import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Query } from "react-apollo";
import * as Queries from '../../graphql/queries';
import ProjectIndexTile from '../projects/projects_index_tile';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: true,
      backedProjects: false
    };

    this.showProjects = this.showProjects.bind(this);
    this.showBackedProjects = this.showBackedProjects.bind(this);
  }

  showProjects() {
    this.setState({
      projects: true,
      backedProjects: false
    });
  }

  showBackedProjects() {
    this.setState({
      projects: false,
      backedProjects: true
    });
  }

  render() {

    return (
      < Query
        query={ Queries.default.FETCH_USER }
        variables={{ id: localStorage.userId }} >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;

            return (
              <div>
                <div>
                  <div>
                    {data.user.name}
                  </div>
                  <div>
                    Backed {data.user.backedProjects.length} projects
                  </div>
                  <div>
                    Joined {Date(data.user.date)}
                  </div>
                </div>
                <div>
                  <div>
                    <button onClick={this.showProjects}>Projects</button>
                    <button onClick={this.showBackedProjects}>Backed Projects</button>
                  </div>
                  <div>
                    { this.state.projects ?
                      data.user.projects.map((project, idx) => (
                        <li key={idx}>
                          <ProjectIndexTile project={project} />
                        </li>
                      )) : null }
                    { this.state.backedProjects ?
                      data.user.backedProjects.map((backedProject, idx) => (
                        <li key={idx}>
                          <ProjectIndexTile project={backedProject} />
                        </li>
                      )) : null }
                  </div>
                </div>
              </div>
            )
          }}
      </Query>
    )
  }
}

export default UserProfile;