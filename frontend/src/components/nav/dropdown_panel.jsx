import React from 'react';
import { Link } from 'react-router-dom';

const DropdownPanel = props => {
  const { project, setShow } = props;
  if (!project) return <td className="dropdown-project-cell"></td>;
  const defaultImage = require('../../assets/images/default_article.png');

  return (
    <td className="dropdown-project-cell">
      <Link to={`/projects/${project._id}`}
        onClick={() => setShow(false)}>
        <img src={project.image || defaultImage}/>
        <p>{project.name}</p>
      </Link>
    </td>
  )
};

export default DropdownPanel;