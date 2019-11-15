import React, { useState } from 'react';
import Panel from './panel';
import Form from './form';

const UpdatePage = props => {
  const { projectId, projectCreatorId } = props;
  const currentUser = localStorage.userId;
  const [adding, setAdding] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState('');

  return (
    <div className="update-page-wrapper">
      <div className="update-page">
        { currentUser === projectCreatorId && !adding && !currentlyEditing &&
          <button 
            className="update-add"
            onClick={e => setAdding(true)}>
            Add an Update
          </button>
        }
        { adding && 
          <Form
            cancel={() => setAdding(false)}
            projectId={projectId} /> }
        {currentlyEditing && 
          <Form 
            cancel={() => setCurrentlyEditing(false)}
            projectId={projectId} 
            update={currentlyEditing}/>}
      </div>
    </div>
  )
};

export default UpdatePage