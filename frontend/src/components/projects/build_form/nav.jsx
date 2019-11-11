import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const BuildFormNav = props => {
  const { setNeedSave, needSave, nextText, nextLink, mdata, variables, save } = props;
  const { projectId } = props.match.params;
  let button;

  if (needSave) {
    button = 
      <button 
        onClick={() => {setNeedSave(false); save({ variables }) }}
        disabled={mdata.loading}>
        Save
      </button>
  } else {
    button = 
      <Link to={`/projects/${projectId}/build/${nextLink}`}>
        {nextText}
      </Link>
  }

  return (
    <div className="build-form-nav-container">
      <div className="build-form-nav">
        <h1><Link to="/">PunchEnder</Link></h1>
        {button}
      </div>
    </div>
  )
};

export default withRouter(BuildFormNav);