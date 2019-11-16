import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Queries from '../../../graphql/queries';
import IndexSegment from './segment';
import Tabs from './tabs';

const { FETCH_FINISHED_PROJECTS } = Queries;

const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

const ProjectIndex = props => {
  const { loading, error, data } = useQuery(FETCH_FINISHED_PROJECTS);
  if (loading) return null;
  if (error) return <div>Error!</div>;

  const { finishedProjects } = data;
  const projectChunks = chunkArray(finishedProjects, 4);

  const segments = projectChunks.map((chunk, idx) => {
    return (
      <IndexSegment key={idx} first={chunk[0]} remainder={chunk.slice(1)} />
    )
  });

  return (
    <div>
      <Tabs />
      {segments}
    </div>
  )
};

export default ProjectIndex;