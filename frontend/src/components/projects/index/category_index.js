import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { withRouter }  from 'react-router-dom';
import Queries from '../../../graphql/queries';
import IndexSegment from './segment';
import Tabs from './tabs';

const { FETCH_CATEGORY } = Queries;

const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

const CategoryIndex = props => {
  const { loading, error, data } = useQuery(FETCH_CATEGORY, { variables: { _id: props.match.params.categoryId } });
  if (loading) return (
    <div className="project-index-page">
      <Tabs />
    </div>
  );
  if (error) return <p>Error!</p>;

  const { category } = data;
  const launchedProjects = category.projects.filter(project => project.launched);

  const projectChunks = chunkArray(launchedProjects, 4);

  const segments = projectChunks.map((chunk, idx) => {
    return (
      <IndexSegment key={idx} first={chunk[0]} remainder={chunk.slice(1)} />
    )
  });
  
  return (
    <div className="project-index-page">
      <Tabs />
      <div className="project-index-segments-container">
        <h1 className="category-index-header">
          {category.name}
        </h1>
        <h2 className="category-index-description">
          {category.description}
        </h2>
        {segments}
      </div>
    </div>
  )
};

export default withRouter(CategoryIndex);