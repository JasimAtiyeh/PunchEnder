import React from 'react';
import ProjectIndexTile from './tile';
import ProjectIndexLargeTile from './large_tile';

const IndexSegment = props => {
  const { first, remainder } = props;
  let only;
  if (remainder.length < 1) { only = true };
  const tileLis = remainder.map(project => {
    return <li key={project._id}><ProjectIndexTile project={project} /></li>;
  });

  return (
    <div className={ only ? "projects-index-segment only" : "projects-index-segment" }>
      <li className={ only ? "projects-index-segment-large-tile only" : "projects-index-segment-large-tile"}>
        <ProjectIndexLargeTile 
          key={first._id} 
          project={first} 
          only={only} />
      </li>
      <div className="projects-index-segment-side">
        {tileLis}
      </div>
    </div>
  )
};

export default IndexSegment