import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Mutations from "../../../graphql/mutations";
import Queries from "../../../graphql/queries";
const { FOLLOW_PROJECT, UNFOLLOW_PROJECT } = Mutations;
const { FETCH_FINISHED_PROJECTS, FETCH_CATEGORY } = Queries;

const ProjectIndexLargeTile = props => {
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

  const isFollowing = followedBy.some(u => u._id === localStorage.userId);
  let followed = isFollowing ? 'followed' : '';

  return (
    <div className={props.only ? "project-index-large-tile only" : "project-index-large-tile"}>
      <div className='project-index-large-tile-image-container'>
        <div className='project-index-large-tile-image'>
          <Link to={`/projects/${_id}`}>
            <img src={image || 'https://punchender-dev.s3.us-east-2.amazonaws.com/StockSnap_Q1KHHDXXZT.jpg'} alt={name} />
          </Link>
        </div>
        { localStorage.userId && <div className={`project-index-large-tile-bookmark ${followed}`}>
          <i
            className="material-icons"
            onClick={e => {
              e.preventDefault();
              if (isFollowing) {
                unFollowProject({ variables: {
                  user_id: localStorage.userId,
                  project_id: props.project._id
                }})
              } else {
                followProject({ variables: {
                  user_id: localStorage.userId,
                  project_id: props.project._id
                }})
              }
            }}>
              bookmark_border
          </i>
        </div> }
      </div>
      <div className='project-index-large-tile-info'>
        <Link to={`/projects/${_id}`}>
          <div className='project-index-large-tile-name'>
            {name}
          </div>
        </Link>
        <div className='project-index-large-tile-description'>
          {description}
        </div>
        <div className='project-index-large-tile-project-creator'>
          By {props.project.projectCreator ? props.project.projectCreator.name : ''}
        </div>
      </div>
    </div>
  )
}

export default ProjectIndexLargeTile;