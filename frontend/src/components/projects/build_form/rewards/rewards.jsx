import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import Tabs from "../tabs";
import Nav from "./nav";
import AddForm from "./add_form";
import EditForm from "./edit_form";

const BuildFormRewards = props => {
  const { project } = props;
  const { rewards } = project;
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState('');
  const [pledgeAmount, setPledgeAmount] = useState('');
  const [tier, setTier] = useState(rewards ? rewards.length + 1 : 1);

  return (
    <div className="build-form-rewards">
      <Nav
        variables={{ name, description, tier, pledgeAmount, project: project._id }}
        creating={creating} 
        setCreating={setCreating}
        editing={editing}
        setEditing={setEditing}    
      />
      <Tabs projectId={project._id} />
      <h2>Create the rewards.</h2>
      <p>Create simple rewards to incentivize backers. While donating to charitable causes is fulfilling in itself, getting something back doesn't hurt either.</p>
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
        />
      }
    </div>
  )
};

export default BuildFormRewards;