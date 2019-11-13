import React from 'react';
import { NavLink } from 'react-router-dom';

const ProjectShowTabs = props => {
  const { projectId } = props;
  return (
    <div className="project-show-tabs">
      <NavLink to={`/projects/${projectId}`}>Campaign</NavLink>
      <NavLink to={`/projects/${projectId}/updates`}>Updates</NavLink>
      <NavLink to={`/projects/${projectId}/comments`}>Comments</NavLink>
    </div>
  )
};

export default ProjectShowTabs;