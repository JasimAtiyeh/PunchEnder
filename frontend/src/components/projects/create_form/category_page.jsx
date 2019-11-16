import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Queries from "../../../graphql/queries";
const { FETCH_CATEGORIES } = Queries;

const CategoryPage = props => {
  const { loading, error, data } = useQuery(FETCH_CATEGORIES);
  if (loading) return null;
  if (error) return <div>Error!</div>;
  const options =  data.categories.map(category => (
    <option 
      key={category._id} 
      value={category._id}>
      {category.name}
    </option> 
  ));

  return (
    <div className="create-form-category">
      <h2>
        Let's get this project going!
      </h2>
      <p>
        Pick a project category to get started. Don't fret, you can always change it later.
      </p>
      <div className="create-form-input-container">
        <select 
          onChange={e => props.setCategory(e.target.value)}
          value={props.category || "default"}
          style={{color: props.category ? "black" : "gray"}}
        >
          <option disabled={true} value="default" id="default-option">Select a category</option>
          {options}
        </select>
      </div>
      <div className="create-form-button-container">
        <span>Another exciting project!</span>
        <button 
          className="create-form-forward-button"
          onClick={() => props.setPage(2)}
          disabled={!props.category}>
            Next: Project Title
        </button>
      </div>

    </div>
  )
};

export default CategoryPage