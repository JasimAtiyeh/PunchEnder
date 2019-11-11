import React from 'react';
import { Link } from 'react-router-dom';

const BuildFormSecondNav = props => {
  const { mdata, variables, creating, editing, setCreating, setEditing } = props;
  const { project } = variables;

  let cancelButton;
  let saveButton;

  if (creating) {
    cancelButton = <button className="reward-cancel" onClick={() => setCreating(false)}>Cancel</button>;
    saveButton =
      <button
        className="reward-save"
        onClick={() => console.log('creating...')}>
        Save
      </button>
  } else if (editing) {
    cancelButton = <button className="reward-cancel" onClick={() => setEditing(false)}>Cancel</button>;
    saveButton = 
      <button
        className="reward-save"
        onClick={() => console.log('editing...')}>
        Save
      </button>
  } else {

  }


  return (
    <div className="build-form-nav-container">
      <div className="build-form-nav">
        <h1><Link to="/">PunchEnder</Link></h1>
        <div>
          { (creating || editing) && cancelButton }
          {(creating || editing) && saveButton}
        </div>
        {!creating && !editing && 
          <Link to={`/projects/${project}/build/story`}>
            Next: Story
          </Link>
        }
      </div>
    </div>
  )
};

export default BuildFormSecondNav;