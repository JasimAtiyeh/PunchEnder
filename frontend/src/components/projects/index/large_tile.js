import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Mutations from "../../../graphql/mutations";
import Queries from "../../../graphql/queries";

const ProjectIndexLargeTile = props => {
  const { FOLLOW_PROJECT, UNFOLLOW_PROJECT } = Mutations;
  const [followProject] = useMutation(FOLLOW_PROJECT);
  const [unFollowProject] = useMutation(UNFOLLOW_PROJECT);
  const { FETCH_USER } = Queries;
  const { loading, error, data } = useQuery(FETCH_USER, { variables: { id: localStorage.userId } });
  if (loading) { return null};
  if (error) { return <div>Error!</div> };
  if (!props.project) { return null }
  const { _id, image, description, name } = props.project;
  const followedProjects = data.user.followedProjects.map(project => project._id);
  let followed = followedProjects.includes(_id) ? 'followed' : '';

  return (
    <div className='project-index-large-tile'>
      <div className='project-index-large-tile-image-container'>
        <div className='project-index-large-tile-image'>
          <Link to={`/projects/${_id}`}>
            <img src={image || 'https://punchender-dev.s3.us-east-2.amazonaws.com/StockSnap_Q1KHHDXXZT.jpg'} alt={props.project.name} />
          </Link>
        </div>
        <div className={`project-index-large-tile-bookmark ${followed}`}>
          <i
            className="material-icons"
            onClick={e => {
              e.preventDefault();
              if (followedProjects.includes(_id)) {
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
        </div>
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