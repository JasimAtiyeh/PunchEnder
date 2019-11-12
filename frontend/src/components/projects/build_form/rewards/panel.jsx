import React from 'react';

const RewardPanel = props => {
  const { reward, setEditing, presetFields, deleteReward } = props;
  const { pledgeAmount, name, description, tier, _id } = reward;

  return (
    <li className="reward-panel">
      <div className="reward-panel-info">
        <p>Tier {tier}</p>
        <p>US$ {pledgeAmount}</p>
        <div className="reward-panel-details">
          <h4>{name}</h4>
          <p>{description}</p>
        </div>
      </div>
      <div className="reward-panel-buttons">
        <button onClick={() => { setEditing(true); presetFields(reward) } } >Edit</button>
        <button onClick={() => deleteReward({ variables: { _id } })}>Delete</button>
      </div>
    </li>
  )
};

export default RewardPanel;