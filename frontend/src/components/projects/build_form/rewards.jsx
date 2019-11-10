import React from 'react';
import { withRouter } from "react-router-dom";
import Tabs from "./tabs";
import Nav from "./nav";

const BuildFormRewards = props => {
  return (
    <div className="build-form-rewards">
      <Nav />
      <Tabs projectId={props.match.params.projectId} />
      <h2>Create the rewards.</h2>
      <p>Create simple rewards to incentivize backers. While donating to charitable causes is fulfilling in itself, getting something back doesn't hurt either.</p>
    </div>
  )
};

export default withRouter(BuildFormRewards);