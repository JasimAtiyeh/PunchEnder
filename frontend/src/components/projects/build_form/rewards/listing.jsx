import React from 'react';
import RewardPanel from './panel';

const RewardListing = props => {
  const { rewards, setEditing, deleteReward, presetFields } = props;
  const RewardLis = !rewards ? null : rewards.map(reward => {
    return <RewardPanel 
      key={reward._id} 
      reward={reward} 
      setEditing={setEditing}
      presetFields={presetFields} 
      deleteReward={deleteReward} />
  });
  return (
    <div className="reward-list-container">
      <div className="reward-list-header">
        <h3>Tier</h3>
        <h3>Pledge Amount</h3>
        <h3>Details</h3>
      </div>
      <ul className="reward-list">
        {RewardLis}
      </ul>
    </div>
  )
};

export default RewardListing;