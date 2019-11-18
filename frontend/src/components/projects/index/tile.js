import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Mutations from "../../../graphql/mutations";
import Queries from "../../../graphql/queries";
const { FOLLOW_PROJECT, UNFOLLOW_PROJECT } = Mutations;
const { FETCH_FINISHED_PROJECTS, FETCH_CATEGORY } = Queries;

const ProjectIndexTile = props => {
  const { amountRaised, goal, _id, followedBy, category } = props.project;

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
      }
    });

  let percentFunded = (amountRaised / goal) * 100;
  let funded = `${percentFunded}% funded`;
  const isFollowing = followedBy.some(u => u._id === localStorage.userId);
  let followed = isFollowing ? 'followed' : '';

  return (
    <div className='project-index-tile'>
      <Link to={`/projects/${_id}`}>
        <div className='project-index-tile-image'>
          <img src={props.project.image || 'https://punchender-dev.s3.us-east-2.amazonaws.com/StockSnap_Q1KHHDXXZT.jpg'} alt={props.project.name} />
        </div>
        <div className='project-index-tile-info'>
          <div className='project-index-tile-name'>
            {props.project.name}
          </div>
          <div className='project-index-tile-info-detail'>
            <div className='project-index-tile-funded'>
              {props.project.launched ? funded : 'Project not launched'}
            </div>
            <div className='project-index-tile-project-creator'>
              By {props.project.projectCreator ? props.project.projectCreator.name : ''}
            </div>
          </div>
        </div>
        
        { localStorage.userId && <div className={`project-index-tile-bookmark ${followed}`}>
          <i
            className='material-icons'
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
      </Link>
    </div>
  )
}

export default ProjectIndexTile;