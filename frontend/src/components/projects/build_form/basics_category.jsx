import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Queries from "../../../graphql/queries";
const { FETCH_CATEGORIES } = Queries;


const BasicsCategoryForm = props => {
  const { loading, error, data } = useQuery(FETCH_CATEGORIES);
  if (loading) return <div className="basics-form" />;
  if (error) return <div className="basics-form" />;

  const options = data.categories.map(category => (
    <option
      key={category._id}
      value={category._id}>
      {category.name}
    </option>
  ));

  return (
    <div className="basics-form">
      <label>Category</label>
      <select
        onChange={e => {props.setCategory(e.target.value); props.setNeedSave(true)}}
        value={props.category || "default"}
        style={{ color: props.category ? "black" : "gray" }}
      >
        <option disabled={true} value="default" id="default-option">Select a category</option>
        {options}
      </select>
    </div>
  )
};

export default BasicsCategoryForm