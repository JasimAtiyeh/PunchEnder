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
    <div>
      <div>
        <h4>Pledge Amount</h4>
        <h4>Details</h4>
      </div>
      <ul>
        {RewardLis}
      </ul>
    </div>
  )
};

export default RewardListing;