import React from 'react';
import { Link } from 'react-router-dom';

const ProjectIndexTile = props => {
  let percentFunded = (props.project.amountRaised / props.project.goal) * 100;

  return (
    <div className='project-index-tile'>
      <Link to='/'>
        <div className='project-index-tile-image'>
          <img src={props.project.image || 'https://punchender-dev.s3.us-east-2.amazonaws.com/StockSnap_Q1KHHDXXZT.jpg'} alt={props.project.name} />
        </div>
        <div>
          <div className='project-index-tile-name'>
            {props.project.name}
          </div>
          <div className='project-index-tile-funded'>
            {`${percentFunded}%`}
          </div>
          <div className='project-index-tile-project-creator'>
            {props.project.projectCreator ? props.project.projectCreator.name : ''}
          </div>
        </div>
        <div>
          <i class="material-icons">bookmark_border</i>
        </div>
      </Link>
    </div>
  )
}

export default ProjectIndexTile;