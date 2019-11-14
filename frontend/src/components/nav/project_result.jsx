import React from 'react';
import { Link } from 'react-router-dom';
import { getDateNumAndText } from "../../util/num_util";

const ProjectResult = props => {
  const { project: 
    { _id,
      name, 
      image, 
      projectCreator, 
      goal, 
      amountRaised, 
      endDate }} = props;
  const defaultImage = "https://punchender-dev.s3.us-east-2.amazonaws.com/StockSnap_Q1KHHDXXZT.jpg";
  const percentFunded = Math.floor(amountRaised/goal * 100);
  const [dateNum, dateText] = getDateNumAndText(new Date(endDate));
  
  return (
    <li className="project-result-panel">
      <Link to={`/projects/${_id}`}>
        <div className="project-result-panel-img-container">
          <div 
            className="project-result-panel-img"
            style={ { backgroundImage: `url(${image || defaultImage})` } }
          />
        </div>
        <div className="project-result-panel-info">
          <div className="search-panel-info-title">{name}</div>
          <div className="search-panel-info-creator">by {projectCreator.name}</div>
          <div className="search-panel-info-etc">
            {percentFunded}% funded {dateNum} {dateText} to go
          </div>
        </div>
      </Link>
    </li>
  )
};

export default ProjectResult;