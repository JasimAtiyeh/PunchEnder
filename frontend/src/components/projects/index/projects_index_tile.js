import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Mutations from "../../../graphql/mutations";

const ProjectIndexTile = props => {
  const { FOLLOW_PROJECT } = Mutations;
  const [followProject] = useMutation(FOLLOW_PROJECT);
  if (!props.project) { return null }
  const { amountRaised, goal, _id } = props.project;
  let percentFunded = (amountRaised / goal) * 100;

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
              {`${percentFunded}%`} funded
            </div>
            <div className='project-index-tile-project-creator'>
              By {props.project.projectCreator ? props.project.projectCreator.name : ''}
            </div>
          </div>
        </div>
        <div className='project-index-tile-bookmark'>
          <i
            className="material-icons"
            onClick={e => {
              e.preventDefault();
              followProject({ variables: {
                user_id: localStorage.userId,
                project_id: props.project._id
              }})
            }}>
              bookmark_border
          </i>
        </div>
      </Link>
    </div>
  )
}

export default ProjectIndexTile;