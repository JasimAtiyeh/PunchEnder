import React from 'react';
import { Query, withApollo } from "react-apollo";
import Queries from '../../graphql/queries';
import UserImage from './user_image';
import ProfileProjectsSection from './profile_projects';
import { Link } from 'react-router-dom';
const { CURRENT_USER, FETCH_USER, FETCH_USER_BACKED_PROJECTS, FETCH_USER_FOLLOWED_PROJECTS } = Queries;

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 1,
      loaded: false,
    };
  }

  show(num) {
    return () => {
      const currentUser = this.props.client.readQuery({ query: CURRENT_USER }).currentUser;
      switch (num) {
        case 1:
          this.setState({ show: num });
          break;
        case 2:
          this.props.client.query({
            query: FETCH_USER_BACKED_PROJECTS,
            variables: { _id: currentUser }
          }).then(res => this.setState({ show: num, backedProjects: res.data.user.backedProjects }));
          break;
        case 3:
          this.props.client.query({
            query: FETCH_USER_FOLLOWED_PROJECTS,
            variables: { _id: currentUser }
          }).then(res => this.setState({ show: num, followedProjects: res.data.user.followedProjects }));
          break;
        default:
          break;
      }
    }
  }

  render() {
    const { client } = this.props;
    const currentUser = client.readQuery({ query: CURRENT_USER }).currentUser;
    if (!currentUser) return null;
    return (
      <Query
        query={ FETCH_USER }
        variables={{ _id: currentUser }} >
          {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return <h2 className="not-found">User not found!</h2>;
          const { funBucks } = data.user;
          const date = new Date();
          date.setTime(data.user.date);

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
                    {this.state.show === 1 ?
                      <div>
                        Started {data.user.projects.length} projects
                      </div> : null
                    }
                    {this.state.show === 2 ?
                      <div>
                        Backed {this.state.backedProjects.length} projects
                      </div> : null
                    }
                    {this.state.show === 3 ?
                      <div>
                        Followed {this.state.followedProjects.length} projects
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
                      onClick={this.show(1)}
                      className={this.state.show === 1 ? 'active' : ''}>
                        Projects
                    </button>
                    <button
                      onClick={this.show(2)}
                      className={this.state.show === 2 ? 'active' : ''}>
                        Backed
                    </button>
                    <button
                      onClick={this.show(3)}
                      className={this.state.show === 3 ? 'active' : ''}>
                        Followed
                    </button>
                  </div>
                  <div className='user-profile-projects-display'>
                    {
                      this.state.show === 1 && data.user.projects.length > 0 ?
                        <ProfileProjectsSection projects={data.user.projects}/> : null
                    }
                    {
                      this.state.show === 1 && data.user.projects.length <= 0 ?
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
                      this.state.show === 2 && this.state.backedProjects.length > 0 ?
                        <ProfileProjectsSection projects={this.state.backedProjects} /> : null
                    } 
                    {
                      this.state.show === 2 && this.state.backedProjects.length <= 0 ?
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
                      this.state.show === 3 && this.state.followedProjects.length > 0 ?
                        <ProfileProjectsSection projects={this.state.followedProjects} /> : null
                    } 
                    {
                      this.state.show === 3 && this.state.followedProjects.length <= 0 ?
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