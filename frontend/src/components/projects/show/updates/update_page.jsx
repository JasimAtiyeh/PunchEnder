import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Panel from './panel';
import Form from './form';
import Queries from '../../../../graphql/queries';
const { FETCH_PROJECT_UPDATES } = Queries;

const UpdatePage = props => {
  const { projectId, projectCreatorId } = props;
  const currentUser = localStorage.userId;
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState('');
  const { loading, error, data } = useQuery(FETCH_PROJECT_UPDATES, { variables: { project: projectId } });
  if (loading) { return <div>Loading...</div> };
  if (error) { return <div>Error!</div> };

  const { projectUpdates } = data;
  const updateLis = projectUpdates.map((update, idx) => {
    return <Panel key={update._id} update={update} num={idx + 1} />;
  }).reverse();

  return (
    <div className="update-page-wrapper">
      <div className="update-page">
        { currentUser === projectCreatorId && !adding && !editing &&
          <button 
            className="update-add"
            onClick={e => setAdding(true)}>
            Add an Update
          </button>
        }
        { !adding && !editing &&
          <ul className="update-list">
            {updateLis}
          </ul>
        }
        { adding && 
          <Form
            cancel={() => setAdding(false)}
            projectId={projectId} /> }
        {editing && 
          <Form 
            cancel={() => setEditing(false)}
            projectId={projectId} 
            update={editing}/>}
      </div>
    </div>
  )
};

export default UpdatePage