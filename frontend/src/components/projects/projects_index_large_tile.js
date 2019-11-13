import React from 'react';
import { Link } from 'react-router-dom';

const ProjectIndexLargeTile = props => {
  return (
    <div className='project-index-large-tile'>
      <div className='project-index-large-tile-image-container'>
        <div className='project-index-large-tile-image'>
          <img src={props.project.image || 'https://punchender-dev.s3.us-east-2.amazonaws.com/StockSnap_Q1KHHDXXZT.jpg'} alt={props.project.name} />
        </div>
        <div className='project-index-large-tile-bookmark'>
          <i className="material-icons">bookmark_border</i>
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