import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Queries from "../../../graphql/queries";
import Mutations from "../../../graphql/mutations";
const { FETCH_PROJECT } = Queries;

const BuildForm = props => {
  const { loading, error, data } = useQuery(FETCH_PROJECT);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="build-form-container">
      <div className="build-form-tabs">
        <NavLink>
          <i className="fas fa-marker" />
          <h3>Basics</h3>
        </NavLink>
        <NavLink>
          <i className="fas fa-gift" />
          <h3>Rewards</h3>
        </NavLink>
        <NavLink>
          <i className="fas fa-book" />
          <h3>Story</h3>
        </NavLink>
      </div>
    </div>
  )
};

export default BuildForm;