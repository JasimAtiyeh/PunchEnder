import React from 'react';

const MainPanel = props => {
  const { name, description, image, endDate, amountRaised, backers, goal, category } = props.project;

  return (
    <div className="project-show-main">
      <h1>{name}</h1>
      <p>{description}</p>
      <div className="project-show-main-content">
        <div>
          <div className="main-content-image" />
        </div>
        <div>

        </div>
      </div>
    </div>
  )
};

export default MainPanel;