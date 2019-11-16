import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Mutations from "../../../graphql/mutations";
import Queries from "../../../graphql/queries";

const ProjectIndexTile = props => {
  const { FOLLOW_PROJECT, UNFOLLOW_PROJECT } = Mutations;
  const [followProject] = useMutation(FOLLOW_PROJECT);
  const [unFollowProject] = useMutation(UNFOLLOW_PROJECT);
  const { FETCH_USER } = Queries;
  const { loading, error, data } = useQuery(FETCH_USER, { variables: { _id: localStorage.userId } });
  if (loading) return null;
  if (error) { return <div>Error!</div> };
  const followedProjects = data.user.followedProjects.map(project => project._id);
  if (!props.project) { return null }
  const { amountRaised, goal, _id } = props.project;
  let percentFunded = (amountRaised / goal) * 100;
  let funded = `${percentFunded}% funded`;
  let followed = followedProjects.includes(_id) ? 'followed' : '';

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
        <div className={`project-index-tile-bookmark ${followed}`}>
          <i
            className='material-icons'
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
      </Link>
    </div>
  )
}

export default ProjectIndexTile;