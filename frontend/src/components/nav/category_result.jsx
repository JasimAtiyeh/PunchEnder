import React from 'react';
import { Link } from 'react-router-dom';

const CategoryResult = props => {
  const { category: { name, _id, icon } } = props;
  return (
    <li className="category-result-panel">
      <Link
        onClick={() => props.setSearching(false)} 
        to={`/categories/${_id}`}>
        {name}  <i className={icon} />
      </Link>
    </li>
  )
};

export default CategoryResult;