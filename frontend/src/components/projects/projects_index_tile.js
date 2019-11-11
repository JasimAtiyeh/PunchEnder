import React from 'react';
import { Link } from 'react-router-dom';

const ProjectIndexTile = props => {
  let percentFunded = (props.project.amountRaised / props.project.goal) * 100;

  return (
    <div>
      <Link to='/'>
        <div>
          <img src='https://punchender-dev.s3.us-east-2.amazonaws.com/StockSnap_Q1KHHDXXZT.jpg' height='100' width='100'/>
        </div>
        <div>
          {props.project.name}
        </div>
        <div>
          {`${percentFunded}%`}
        </div>
        <div>
          {/* {props.project.projectCreator.name} */}
        </div>
      </Link>
    </div>
  )
}

export default ProjectIndexTile;