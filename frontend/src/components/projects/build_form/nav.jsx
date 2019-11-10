import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const BuildFormNav = props => {
  const { setNeedSave, needSave, nextText, nextLink } = props;
  const { projectId } = props.match.params;
  let button;

  if (needSave) {
    button = 
      <button onClick={() => setNeedSave(false)}>
        Save
      </button>
  } else if (nextText) {
    button = 
      <Link to={`/projects/${projectId}/build/${nextLink}`}>
        {nextText}
      </Link>
  } else {
    button =
      <button id="launch-button">
        Launch!
      </button>
  }

  return (
    <div className="build-form-nav">
      <h1><Link to="/">PunchEnder</Link></h1>
      {button}
    </div>
  )
}

export default withRouter(BuildFormNav);