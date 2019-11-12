import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import Tabs from "../tabs";
import Nav from "./nav";
import AddForm from "./add_form";
import EditForm from "./edit_form";
import RewardListing from "./listing";
import Mutations from "../../../../graphql/mutations";
import Queries from "../../../../graphql/queries";
const { FETCH_UNFINISHED_PROJECT } = Queries;
const { CREATE_REWARD, DELETE_REWARD, UPDATE_REWARD } = Mutations;

const BuildFormRewards = props => {
  const { project } = props;
  const { rewards } = project;
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);

  const [_id, set_id] = useState("")
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pledgeAmount, setPledgeAmount] = useState("");
  const [tier, setTier] = useState(rewards ? rewards.length + 1 : 1);

  // These mutations don't update the cache, so this was necessary...
  const [createReward] = useMutation(
    CREATE_REWARD,
    {
      update(cache, { data: { newReward } }) {
        const qdata = cache.readQuery({ query: FETCH_UNFINISHED_PROJECT, variables: { _id: project._id } });
        qdata.project.rewards.push(newReward);
        cache.writeQuery({
          query: FETCH_UNFINISHED_PROJECT,
          variables: { _id: project._id },
          data: { project: qdata.project },
        });
      }
  });
  const [deleteReward] = useMutation(
    DELETE_REWARD,
    {
      update(cache, { data: { deleteReward } }) {
        const qdata = cache.readQuery({ query: FETCH_UNFINISHED_PROJECT, variables: { _id: project._id } });
        qdata.project.rewards = qdata.project.rewards.filter(reward => reward._id !== deleteReward._id);
        cache.writeQuery({
          query: FETCH_UNFINISHED_PROJECT,
          variables: { _id: project._id },
          data: { project: qdata.project },
        });
      }
  });
  const [updateReward] = useMutation(UPDATE_REWARD);

  const resetFields = () => {
    set_id(""); setName(""); setDescription(""); setPledgeAmount("");
  }

  const presetFields = reward => {
    console.log(reward);
    set_id(reward._id); setName(reward.name); setDescription(reward.description); setPledgeAmount(reward.pledgeAmount);
  }

  return (
    <div className="build-form-rewards">
      { (creating || editing) && <div className="reward-modal" />}
      <Nav
        variables={{ _id, name, description, tier, pledgeAmount: parseInt(pledgeAmount), project: project._id }}
        creating={creating} 
        setCreating={setCreating}
        editing={editing}
        setEditing={setEditing}
        createReward={createReward}
        updateReward={updateReward}
        resetFields={resetFields}
      />
      <Tabs projectId={project._id} />
      <h2>Create the rewards.</h2>
      <p>Create simple rewards to incentivize backers. While donating to charitable causes is fulfilling in itself, getting something back doesn't hurt either.</p>
      { rewards && rewards.length > 0 && <RewardListing
        rewards={rewards}
        deleteReward={deleteReward}
        setEditing={setEditing}
        presetFields={presetFields} 
      />}
      <button
        onClick={() => setCreating(true)}
        className="add-reward-button">
        + Add New Reward
      </button>
      { creating && 
        <AddForm 
          project={project}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          pledgeAmount={pledgeAmount}
          setPledgeAmount={setPledgeAmount}
          tier={tier}
        /> 
      }
      {editing &&
        <EditForm
          project={project}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          pledgeAmount={pledgeAmount}
          setPledgeAmount={setPledgeAmount}
          tier={tier}
          setTier={setTier}
        />
      }
    </div>
  )
};

export default BuildFormRewards;