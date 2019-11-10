import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const BuildFormLastNav = props => {
  const { projectId } = props.match.params;
  let button =
    <button id="launch-button">
      Launch!
    </button>
  ;

  return (
    <div className="build-form-nav-container">
      <div className="build-form-nav">
        <h1><Link to="/">PunchEnder</Link></h1>
        {button}
      </div>
    </div>
  )
};

export default withRouter(BuildFormLastNav);