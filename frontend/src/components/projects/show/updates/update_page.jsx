import React, { useState } from 'react';
import Panel from './panel';
import Form from './form';

const UpdatePage = props => {
  const { projectId, projectCreatorId } = props;
  const currentUser = localStorage.userId;
  const [adding, setAdding] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState('');

  return (
    <div className="update-page">
      { currentUser === projectCreatorId && !adding && !currentlyEditing &&
        <button 
          className="update-add"
          onClick={e => setAdding(true)}>
          Add an Update
        </button>
      }
      { adding && <Form /> }
      { currentlyEditing && <Form update={currentlyEditing}/>}
    </div>
  )
};

export default UpdatePage