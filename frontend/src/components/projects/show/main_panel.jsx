import React from 'react';
import { Link } from 'react-router-dom';
import { numWithCommas, getDateNumAndText } from '../../../util/num_util';

const MainPanel = props => {
  const { name, description, image, endDate, amountRaised, backers, goal, category } = props.project;

  const endDateObj = new Date(endDate);
  const [dateNum, dateText] = getDateNumAndText(endDateObj);

  return (
    <div className="project-show-main">
      <h1>{name}</h1>
      <p>{description}</p>
      <div className="project-show-main-content">
        <div className="main-content-column-1">
          <div className="main-content-image" />
        </div>
        <div className="main-content-column-2">
          <div className="main-content-amount">
            <em className="amount-total">${numWithCommas(amountRaised)}</em>
            <span className="amount-goal">pledged of ${numWithCommas(goal)} goal</span>
          </div>
          <div className="main-content-backers">
            <em className="backer-num">{backers.length}</em>
            <span className="backer-text">backers</span>
          </div>
          <div className="main-content-date">
            <em>{dateNum}</em>
            <span>{dateText} left</span>
          </div>
          <div className="main-content-buttons">
            <Link 
              to={`/projects/${props.project._id}/pledge`}
              className="project-back-link">
              Back this project
            </Link>
            <button>Remind me</button>
          </div>

        </div>
      </div>
      <div className="main-content-category">
        <Link 
          to={{
            pathName: "/",
            state: {
              category: category._id
            }
          }}>
          <i className={`${category.icon}`} /> {category.name}
        </Link>
      </div>
    </div>
  )
};

export default MainPanel;