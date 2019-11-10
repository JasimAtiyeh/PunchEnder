import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const BuildFormNav = props => {
  let button;

  return (
    <div className="build-form-nav">
      <h1><Link to="/">PunchEnder</Link></h1>
      <button>Next: Something</button>
    </div>
  )
}

export default withRouter(BuildFormNav);