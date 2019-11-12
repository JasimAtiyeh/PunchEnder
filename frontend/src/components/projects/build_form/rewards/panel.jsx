import React from 'react';

const RewardPanel = props => {
  const { reward, setEditing, presetFields, deleteReward } = props;
  const { pledgeAmount, name, description, tier, _id } = reward;

  return (
    <li>
      <div className="reward-panel-info">
        <p>US$</p>
        <p></p>
      </div>
      <div className="reward-panel-buttons">
        <button>Edit</button>
        <button onClick={() => deleteReward({ variables: { _id } })}>Delete</button>
      </div>
    </li>
  )
};

export default RewardPanel;