import React from 'react';
import { NavLink } from 'react-router-dom';

const BuildFormTabs = props => {
  const { projectId } = props;
  return (
    <div className="build-form-tabs">
      <div>
        <NavLink to={`/projects/${projectId}/build/basics`} >
          <i className="fas fa-marker" />
          <h3>Basics</h3>
        </NavLink>
        <NavLink to={`/projects/${projectId}/build/rewards`} >
          <i className="fas fa-gift" />
          <h3>Rewards</h3>
        </NavLink>
        <NavLink to={`/projects/${projectId}/build/story`} >
          <i className="fas fa-book" />
          <h3>Story</h3>
        </NavLink>
      </div>
    </div>
  )
};

export default BuildFormTabs;