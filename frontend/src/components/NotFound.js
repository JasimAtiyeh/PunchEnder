import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import Queries from '../graphql/queries';
const { FETCH_RANDOM_PROJECT } = Queries;

const NotFound = () => {
  const { loading, error, data } = useQuery(FETCH_RANDOM_PROJECT);
  if (loading) return null;
  if (error) { return <div>Error!</div> };
  const project = data.randomProject;

  return (
    <div className="not-found-page">
      <center className="not-found-return">
        <h2>404 Page not found!</h2>
        <p>While we couldn't find your page, 
          we can help you discover a cool project.
        </p>
        <p>Check Out {project.name} by {project.projectCreator.name}.</p>
        <div className="not-found-button-container">
          <Link className="not-found-checkout" to={`/projects/${project._id}`}>
            Checkout the project
          </Link>
          <Link className="not-found-return" to="/">
            Return to Home Page
          </Link>
        </div>
      </center>
    </div>
  )
};
export default NotFound;