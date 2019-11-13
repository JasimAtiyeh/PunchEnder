import React from 'react';
import { Query } from "react-apollo";
import * as Queries from '../../graphql/queries';
import ProjectIndexTile from '../projects/index/tile';
import { Link } from 'react-router-dom';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: true,
      backedProjects: false,
      projectsShow: 'active',
      backedProjectsShow: ''
    };

    this.showProjects = this.showProjects.bind(this);
    this.showBackedProjects = this.showBackedProjects.bind(this);
  }

  showProjects() {
    this.setState({
      projects: true,
      backedProjects: false,
      projectsShow: 'active',
      backedProjectsShow: ''
    });
  }

  showBackedProjects() {
    this.setState({
      projects: false,
      backedProjects: true,
      projectsShow: '',
      backedProjectsShow: 'active'
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
            const date = new Date();
            date.setTime(data.user.date);
            return (
              <div className='user-profile'>
                <div className='user-profile-info'>
                  < img 
                    className='user-profile-info-avatar'
                    src = "https://ksr-ugc.imgix.net/missing_user_avatar.png?ixlib=rb-2.1.0&w=80&h=80&fit=crop&v=&auto=format&frame=1&q=92&s=d89e3180fafd307918a94a3c9dd79c45"
                    alt='user avatar logo' />
                  <h2 className='user-profile-info-name'>
                    {data.user.name}
                  </h2>
                  <div className='user-profile-info-sub'>
                    <div>
                      Backed {data.user.backedProjects.length} projects
                    </div>
                    <div>
                      &nbsp;&nbsp;·&nbsp;&nbsp;
                    </div>
                    <div>
                       Joined {date.toLocaleDateString("en-us", {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
                <div className='user-profile-projects'>
                  <div className='user-profile-projects-button'>
                    <button
                      onClick={this.showProjects}
                      className={this.state.projectsShow}>
                        Projects
                    </button>
                    <button
                      onClick={this.showBackedProjects}
                      className={this.state.backedProjectsShow}>
                        Backed
                    </button>
                  </div>
                  <div className='user-profile-projects-display'>
                    { this.state.projects ?
                      data.user.projects.map((project, idx) => (
                        <li key={idx}>
                          <ProjectIndexTile project={project} />
                        </li>
                      )) : <div
                            className='user-profile-projects-display-none'>
                              <div>
                                <strong>You haven't backed any projects. </strong>
                                Let's change that!
                              </div>
                              <Link to='/'>
                                Discover projects
                              </Link>
                          </div> }
                    { this.state.backedProjects ?
                      data.user.backedProjects.map((backedProject, idx) => (
                        <li key={idx}>
                          <ProjectIndexTile project={backedProject} />
                        </li>
                      )) : <div
                            className='user-profile-projects-display-none'>
                              <div>
                                <strong>You haven't started any projects. </strong>
                                Let's change that!
                              </div>
                              <Link to=''>
                                Start a project
                              </Link>
                          </div> }
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