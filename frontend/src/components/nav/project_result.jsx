import React from 'react';
import { getDateNumAndText } from "../../util/num_util";

const ProjectResult = props => {
  const { project: 
    { name, 
      image, 
      projectCreator, 
      goal, 
      amountRaised, 
      endDate }} = props;
  const percentFunded = Math.floor(amountRaised/goal * 100);
  const [dateNum, dateText] = getDateNumAndText(new Date(endDate));
  console.log(dateNum, dateText);
  
  return (
    <li className="project-result-panel">
      <div className="project-result-panel-img">
        <div />
      </div>
      <div className="project-result-panel-info">
        <div>{name}</div>
        <div>by {projectCreator.name}</div>
        <div>{percentFunded}% funded {dateNum} {dateText} to go</div>
      </div>
    </li>
  )
};

export default ProjectResult;