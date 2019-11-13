import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Mutations from "../../graphql/mutations";

const ProjectIndexLargeTile = props => {
  const { FOLLOW_PROJECT } = Mutations;
  const [followProject] = useMutation(FOLLOW_PROJECT);

  return (
    <div className='project-index-large-tile'>
      <div className='project-index-large-tile-image-container'>
        <div className='project-index-large-tile-image'>
          <img src={props.project.image || 'https://punchender-dev.s3.us-east-2.amazonaws.com/StockSnap_Q1KHHDXXZT.jpg'} alt={props.project.name} />
        </div>
        <div className='project-index-large-tile-bookmark'>
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
      </div>
      <div className='project-index-large-tile-info'>
        <Link to='/'>
          <div className='project-index-large-tile-name'>
            {props.project.name}
          </div>
        </Link>
        <div className='project-index-large-tile-description'>
          {props.project.description}
        </div>
        <div className='project-index-large-tile-project-creator'>
          By {props.project.projectCreator ? props.project.projectCreator.name : ''}
        </div>
      </div>
    </div>
  )
}

export default ProjectIndexLargeTile;