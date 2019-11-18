import React from 'react';
import { Link } from 'react-router-dom';

const DropdownPanel = props => {
  const { project } = props;
  if (!project) return <td className="dropdown-project-cell"></td>;
  const defaultImage = "https://punchender-dev.s3.us-east-2.amazonaws.com/StockSnap_Q1KHHDXXZT.jpg";

  return (
    <td className="dropdown-project-cell">
      <Link to={`/projects/${project._id}`}>
        <img src={project.image || defaultImage}/>
        <p>{project.name}</p>
      </Link>
    </td>
  )
};

export default DropdownPanel;