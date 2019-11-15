import React from 'react';

const UpdatePanel = props => {
  const { update } = props;
  console.log(update);
  return (
    <li className="update-panel">
      <span className="update-no">Update #</span>
      <h3></h3>
      <div className="update-info">

      </div>
      <div className="update-content">

      </div>
      <div className="update-bottom">

      </div>
    </li>
  )
};

export default UpdatePanel;