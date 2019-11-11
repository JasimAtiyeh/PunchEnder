import React from 'react';
import { Link } from 'react-router-dom';
import checkValidProject from "./check_valid_project";

const BuildFormLastNav = props => {
  const { setNeedSave, needSave, variables, save, mdata, project } = props;
  const validProject = checkValidProject(project);
  console.log(project);
  console.dir(validProject);

  let button;
  if (needSave) {
    button =
      <button
        onClick={() => { setNeedSave(false); save({ variables }) }}
        disabled={mdata.loading}>
        Save
      </button>
  } else {
    button =
      <button id="launch-button">
        Launch!
      </button>
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

export default BuildFormLastNav;