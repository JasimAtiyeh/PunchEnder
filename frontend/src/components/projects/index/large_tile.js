import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Mutations from "../../../graphql/mutations";
import Queries from "../../../graphql/queries";
import { withApollo } from 'react-apollo';
const { FOLLOW_PROJECT, UNFOLLOW_PROJECT } = Mutations;
const { FETCH_FINISHED_PROJECTS, FETCH_CATEGORY } = Queries;

const ProjectIndexLargeTile = props => {
	const currentUser = props.client.cache.data.data.ROOT_QUERY.currentUser;
  const { followedBy, _id, image, description, name, category } = props.project;
  const [followProject] = useMutation(
    FOLLOW_PROJECT,
    {
      update(cache, { data: { followProject } }) {
        try {
          const rootQuery = cache.readQuery({ query: FETCH_FINISHED_PROJECTS });
          const relevantProject = rootQuery.finishedProjects.find(p => p._id === _id);
          // followProject returns a user object, which is why this might be confusing...
          relevantProject.followedBy.push(followProject);
          cache.writeQuery({
            query: FETCH_FINISHED_PROJECTS,
            data: { finishedProjects: rootQuery.finishedProjects },
          });
        } catch {
        }
        try {
          const rootQuery = cache.readQuery({ query: FETCH_CATEGORY, variables: { _id: category._id }, });
          const relevantProject = rootQuery.category.projects.find(p => p._id === _id);
          // followProject returns a user object, which is why this might be confusing...
          relevantProject.followedBy.push(followProject);
          cache.writeQuery({
            query: FETCH_CATEGORY,
            variables: { _id: category._id },
            data: { category: rootQuery.category },
          });
        } catch {
        }
      }
    });
  const [unFollowProject] = useMutation(
    UNFOLLOW_PROJECT,
    {
      update(cache, { data: { unFollowProject } }) {
        try {
          const rootQuery = cache.readQuery({ query: FETCH_FINISHED_PROJECTS });
          const relevantProject = rootQuery.finishedProjects.find(p => p._id === _id);
          // unFollowProject returns a user object, which is why this might be confusing...
          relevantProject.followedBy = relevantProject.followedBy.filter(u => u._id !== unFollowProject._id);
          cache.writeQuery({
            query: FETCH_FINISHED_PROJECTS,
            data: { finishedProjects: rootQuery.finishedProjects },
          });
        } catch {
        }
        try {
          const rootQuery = cache.readQuery({ query: FETCH_CATEGORY, variables: { _id: category._id }, });
          const relevantProject = rootQuery.category.projects.find(p => p._id === _id);
          // followProject returns a user object, which is why this might be confusing...
          relevantProject.followedBy = relevantProject.followedBy.filter(u => u._id !== unFollowProject._id);
          cache.writeQuery({
            query: FETCH_CATEGORY,
            variables: { _id: category._id },
            data: { category: rootQuery.category },
          });
        } catch {
        }
      }
    });

  const isFollowing = followedBy.some(u => u._id === currentUser);
  let followed = isFollowing ? 'followed' : '';

  return (
    <div className={props.only ? "project-index-large-tile only" : "project-index-large-tile"}>
      <Link
        className="large-tile-link" 
        to={`/projects/${_id}`}>
        <div className='project-index-large-tile-image-container'>
          <div className="content">
            <img src={image || 'https://punchender-dev.s3.us-east-2.amazonaws.com/StockSnap_Q1KHHDXXZT.jpg'} alt={name} />
          </div>
          { currentUser && <div className={`project-index-large-tile-bookmark ${followed}`}>
            <i
              className="material-icons"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                if (isFollowing) {
                  unFollowProject({ variables: {
                    user_id: currentUser,
                    project_id: props.project._id
                  }})
                } else {
                  followProject({ variables: {
                    user_id: currentUser,
                    project_id: props.project._id
                  }})
                }
              }}>
                bookmark_border
            </i>
          </div> }
        </div>
        <div className='project-index-large-tile-info'>
          <div>
            <div className='project-index-large-tile-name'>
              {name}
            </div>
          </div>
          <div className='project-index-large-tile-description'>
            {description}
          </div>
          <div className='project-index-large-tile-project-creator'>
            By {props.project.projectCreator ? props.project.projectCreator.name : ''}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default withApollo(ProjectIndexLargeTile);