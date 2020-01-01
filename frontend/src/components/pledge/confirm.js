import React from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';

const PledgeConfirmation = props => {
  console.log(props);
  const initialState = props.location.state;
  if (!initialState) 
    return <Redirect to={`/projects/${props.match.params.projectId}`}/>

  const { project } = initialState.pledgeProject;
  return (
    <div className="pledge-thanks-page">
      <div className="pledge-thanks">
        <h1>Congratulations!</h1>
        <div className="pledge-thanks-top">
          <img src={project.image}/>
          <div>
            You're a backer of <Link to={`/projects/${project._id}`}>{project.name}</Link>
          </div>
        </div>
        <div className="pledge-thanks-summary">
          <h2>Pledge summary</h2>
          <div>
            <em>AMOUNT PLEDGED</em>
            <p>${initialState.pledgeProject.amount.toFixed(2)}</p>
          </div>
          <div>
            <em>REWARD</em>
            <p>{initialState.pledgeProject.reward ? initialState.pledgeProject.reward.name : "n/a"}</p>
          </div>
          <p className="pledge-thanks-note">Thank you for contributing to this project. We appreciate your charity and will use these funds to make the world a better place!</p>
        </div>
        <Link to={`/projects/${project._id}`}>Return to project page</Link>
      </div>
    </div>
  )
};

export default withRouter(PledgeConfirmation);