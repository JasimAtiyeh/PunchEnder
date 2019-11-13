import React from 'react';
import ProjectIndexTile from './tile';
import ProjectIndexLargeTile from './large_tile';

const IndexSegment = props => {
  const { first, remainder } = props;
  const tileLis = remainder.map(project => {
    return <li key={project._id}><ProjectIndexTile project={project} /></li>;
  });

  return (
    <div className='projects-index-segment'>
      <li className="projects-index-segment-large-tile">
        <ProjectIndexLargeTile key={first._id} project={first} />
      </li>
      <div className="projects-index-segment-side">
        {tileLis}
      </div>
    </div>
  )
};

export default IndexSegment