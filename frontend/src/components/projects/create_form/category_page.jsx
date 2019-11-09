import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Queries from "../../../graphql/queries";
const { FETCH_CATEGORIES } = Queries;

const CategoryPage = props => {
  const { loading, error, data } = useQuery(FETCH_CATEGORIES);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="create-form-category">
      <select>
        
      </select>
    </div>
  )
};

export default CategoryPage