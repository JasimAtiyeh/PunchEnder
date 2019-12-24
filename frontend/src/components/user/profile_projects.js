import React from 'react';
import ProjectIndexTile from '../projects/index/tile';

const ProfileProjectsSection = props => {
  let projects;
  if (props.projects) {
    projects = props.projects;
  } else {
    projects = props.pledges.map(pledge => pledge.project);
  }

  const projectLis = projects.map(project =>{
    return (
      <li key={project._id}>
        <ProjectIndexTile project={project} />
      </li>
    )
  })

  return (
    <>
      {projectLis}
    </>
  )
};

export default ProfileProjectsSection;