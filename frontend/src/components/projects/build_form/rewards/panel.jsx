import React from 'react';

const RewardPanel = props => {
  const { updateRewardTier, rewards, reward, setEditing, presetFields, deleteReward } = props;
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
        <button 
          onClick={() => { 
            deleteReward({ variables: { _id } })
              .then(({ data }) => { 
                rewards.forEach(rew => { 
                  if (rew.tier > data.deleteReward.tier) {
                    updateRewardTier({ variables: { _id: rew._id, tier: parseInt(rew.tier) - 1 } });
                  } 
                })
              })}}>
          Delete
        </button>
      </div>
    </li>
  )
};

export default RewardPanel;