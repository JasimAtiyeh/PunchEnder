import React from 'react';
import Queries from '../../../graphql/queries';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

const { FETCH_CATEGORIES } = Queries;

const IndexTabs = props => {
  const { loading, error, data } = useQuery(FETCH_CATEGORIES);
  if (loading) return null;
  if (error) return <div>{error}</div>;

  return(
    <div className='projects-index-category-list'>
      <ul>
        <li
          className='projects-index-category-list-item'
          onClick={e => e.currentTarget.childNodes.item(0).click()}>
          <Link to="/">
            Home
          </Link>
        </li>
        {data.categories.map((category, idx) => (
          <li
            onClick={e => e.currentTarget.childNodes.item(0).click()}
            className='projects-index-category-list-item'
            key={idx}>
            <Link to={`/categories/${category._id}`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default IndexTabs;