import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Queries from "../../graphql/queries";
import PledgeTile from './pledge_tile';
import RewardTile from './reward_tile';

export const Pledge = props => {
  let projectId = props.match.params.projectId;
  const { loading, error, data } = useQuery(
    Queries.FETCH_FINISHED_PROJECT,
    { variables: { _id: projectId } }
  );
  if (loading) { return <div>Loading...</div>};
  if (error) { return <div>Error!</div> };
  const { project } = data;
  const rewards = Array.from(data.project.rewards);

  return (
    <div>
      <div className='pledge-header'>
        <div className='pledge-header-name'>
          {project.name}
        </div>
        <div className='pledge-header-creator'>
          by {project.projectCreator.name}
        </div>
      </div>
      <div className='pledge-note'>
        Creators offer rewards that speak to their project’s vision—select one and complete your pledge to help bring this idea to life.
      </div>
      <div className='pledge-tiles'>
        <div className='pledge-tiles-rewards'>
          <PledgeTile projectId={project._id} />
          {rewards.map((reward, idx) => (
            <RewardTile key={idx} projectId={project._id} reward={reward} />
          ))}
        </div>
        <div className='pledge-tiles-side-note'>
          <div>
            PunchEnder is not a store.
          </div>
          <div>
            It's a way to bring creative projects to life.
          </div>
          <div>
            PunchEnder does not guarantee projects or investigate a creator's ability to complete their project. It is the responsibility of the project creator to complete their project as promised, and the claims of this project are theirs alone.
          </div>
        </div>
      </div>
    </div>
  )
}