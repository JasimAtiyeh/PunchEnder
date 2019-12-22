import React from 'react';
import { Query, withApollo } from "react-apollo";
import * as Queries from '../../graphql/queries';
import ProjectIndexTile from '../projects/index/tile';
import UserImage from './user_image';
import { Link } from 'react-router-dom';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: true,
      pledges: false,
      followedProjects: false,
      projectsShow: 'active',
      pledgesShow: '',
      followedProjectsShow: '',
      currentUser: props.client.cache.data.data.ROOT_QUERY.currentUser
    };

    this.showProjects = this.showProjects.bind(this);
    this.showPledges = this.showPledges.bind(this);
    this.showFollowedProjects = this.showFollowedProjects.bind(this);
  }

  componentDidMount() {
    this.props.client.query({
      query: Queries.default.FETCH_USER,
      variables: { _id: this.state.currentUser }
    });
  }

  showProjects() {
    this.setState({
      projects: true,
      pledges: false,
      followedProjects: false,
      projectsShow: 'active',
      pledgesShow: '',
      followedProjectsShow: ''
    });
  }

  showPledges() {
    this.setState({
      projects: false,
      pledges: true,
      followedProjects: false,
      projectsShow: '',
      pledgesShow: 'active',
      followedProjectsShow: ''
    });
  }

  showFollowedProjects() {
    this.setState({
      projects: false,
      pledges: false,
      followedProjects: true,
      projectsShow: '',
      pledgesShow: '',
      followedProjectsShow: 'active'
    });
  }

  render() {
    let funBucks;
    if (this.state.currentUser) funBucks = this.props.client.cache.data.data[this.state.currentUser].funBucks;
    return (
      < Query
        query={ Queries.default.FETCH_USER }
        variables={{ _id: this.state.currentUser }} >
          {({ loading, error, data, refetch }) => {
          if (loading) return null;
          if (error) return <h2 className="not-found">User not found!</h2>;
          const date = new Date();
          date.setTime(data.user.date);

          // Getting pledges to not repeat projects on this page.
          const pledges = data.user.pledges;
          const pledgeMap = new Map();
          const uniqPledges = [];
          for (const pledge of pledges) {
            if (!pledgeMap.has(pledge.project._id)) {
              pledgeMap.set(pledge.project._id, true);    // set any value to Map
              uniqPledges.push(pledge);
            }
          };

            return (
              <div className='user-profile'>
                <div className='user-profile-info'>
                  <UserImage
                    userId={data.user._id}
                    image={
                      data.user.image ?
                      data.user.image :
                      "https://ksr-ugc.imgix.net/missing_user_avatar.png?ixlib=rb-2.1.0&w=80&h=80&fit=crop&v=&auto=format&frame=1&q=92&s=d89e3180fafd307918a94a3c9dd79c45"
                    } 
                  />
                  <h2 className='user-profile-info-name'>
                    {data.user.name}
                  </h2>
                  <div className='user-profile-info-sub'>
                    {this.state.projects ?
                      <div>
                        Started {data.user.projects.length} projects
                      </div> : null
                    }
                    {this.state.pledges ?
                      <div>
                        Backed {data.user.pledges.length} projects
                      </div> : null
                    }
                    {this.state.followedProjects ?
                      <div>
                        Follow {data.user.followedProjects.length} projects
                      </div> : null
                    }
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
                  <div className='user-profile-info-funbucks'>
                    FunBucks: ${funBucks}
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
                      onClick={this.showPledges}
                      className={this.state.pledgesShow}>
                        Backed
                    </button>
                    <button
                      onClick={this.showFollowedProjects}
                      className={this.state.followedProjectsShow}>
                        Followed
                    </button>
                  </div>
                  <div className='user-profile-projects-display'>
                    {
                      data.user.projects.length > 0 && this.state.projects ?
                      data.user.projects.map((project, idx) => (
                        <li key={idx}>
                          <ProjectIndexTile project={project} />
                        </li>
                      )) : null
                    }
                    {
                      data.user.projects.length <= 0 && this.state.projects ?
                      <div className='user-profile-projects-display-none'>
                        <div>
                          <strong>You haven't started any projects. </strong>
                            Let's change that!
                        </div>
                          <Link to=''>
                            Start a project
                        </Link>
                      </div> : null
                    }
                    {
                      uniqPledges.length > 0 && this.state.pledges ?
                      uniqPledges.map((pledge, idx) => (
                        <li key={idx}>
                          <ProjectIndexTile project={pledge.project} />
                        </li>
                      )) : null
                    } 
                    {
                      data.user.pledges.length <= 0 && this.state.pledges ?
                      <div className='user-profile-projects-display-none'>
                        <div>
                          <strong>You haven't backed any projects. </strong>
                          Let's change that!
                        </div>
                          <Link to='/'>
                            Discover projects
                        </Link>
                      </div> : null
                    }
                    {
                      data.user.followedProjects.length > 0 && this.state.followedProjects ?
                      data.user.followedProjects.map((followedProject, idx) => (
                        <li key={idx}>
                          <ProjectIndexTile project={followedProject} />
                        </li>
                      )) : null
                    } 
                    {
                      data.user.followedProjects.length <= 0 && this.state.followedProjects ?
                      <div className='user-profile-projects-display-none'>
                        <div>
                          <strong>You haven't followed any projects. </strong>
                          Let's change that!
                        </div>
                        <Link to='/'>
                          Discover projects
                        </Link>
                      </div> : null
                    }
                  </div>
                </div>
              </div>
            )
          }}
      </Query>
    )
  }
}

export default withApollo(UserProfile);