import React from 'react';
import { Link } from 'react-router-dom';
import checkValidProject from "./check_valid_project";

const BuildFormLastNav = props => {
  const { setNeedSave, needSave, variables, save, launchProject, mdata, project } = props;
  let validProject = checkValidProject(project);

    const saveButton =
      <button
        onClick={() => { 
          save({ variables }).then(() => setNeedSave(false));
        }}
        disabled={mdata.loading}>
        Save
      </button>
    
    const defaultButton =
        <button
        id="nolaunch-button"
        disabled={true}>
          Fill necessary fields
        </button>

    const launchButton =
      <button
        id="launch-button"
        disabled={!validProject}
        onClick={() => launchProject({ variables: {_id: project._id } })}
      >
        Launch!
      </button>

  return (
    <div className="build-form-nav-container">
      <div className="build-form-nav">
        <h1 className="build-nav-logo"><Link to="/">PunchEnder</Link></h1>
        {needSave && saveButton}
        {!needSave && validProject && launchButton}
        {!needSave && !validProject && defaultButton}
      </div>
    </div>
  )
};

export default BuildFormLastNav;