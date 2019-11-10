import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import BasicsCategoryForm from "./basics_category";
import BasicsDate from "./basics_date";
import Tabs from "./tabs";
import Nav from "./nav";

const BuildFormBasics = props => {
  const { project } = props;
  const [needSave, setNeedSave] = useState(false);
  const [name, setName] = useState(project.name);
  const [category, setCategory] = useState(project.category._id);
  const [goal, setGoal] = useState(project.goal);
  const [date, setDate] = useState(project.endDate);

  return (
    <div className="build-form-basics">
      <Nav setNeedSave={setNeedSave} needSave={needSave} nextText={"Next: Rewards"} nextLink={"rewards"} />
      <Tabs projectId={props.match.params.projectId}/>
      <h2>Let's start with basic project info</h2>
      <p>Give backers the information they need.</p>
      <form className="build-form-basics-form">
        <div className="basics-panel">
          <div className="basics-info">
            <h4>Project Title</h4>
            <p>Pick a brief, but descriptive title that lets backers quickly identify the purpose of the project.</p>
          </div>
          <div className="basics-form">
            <label>Title</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => { setName(e.target.value); setNeedSave(true) }} 
              placeholder="Enter your title here" />
          </div>
        </div>
        <div className="basics-panel">
          <div className="basics-info">
            <h4>Project Category</h4>
            <p>Think of a category that best fits your project This is important for backers to be able to find your project.</p>
          </div>
          <BasicsCategoryForm setNeedSave={setNeedSave} setCategory={setCategory} category={category} />
        </div>
        <div className="basics-panel">
          <div className="basics-info">
            <h4>Project Image</h4>
            <p>This feature does not currently work, but will be coming soon...</p>
          </div>
          <div className="basics-form">
            <label>Image</label>
          </div>
        </div>
        <div className="basics-panel">
          <div className="basics-info">
            <h4>Funding Goal</h4>
            <p>Set a realistic funding goal for your project.</p>
            <p>Remember that funding is all-or-nothing, and you won't get any money if you don't reach your goal!</p>
          </div>
          <div className="basics-form">
            <label>Goal Amount</label>
            <div className="input-group">
              <div className="input-group-sign">$</div>
              <input 
                type="number" 
                placeholder="Goal amount" 
                onChange={e => {setGoal(e.target.value); setNeedSave(true)}} 
                value={ goal || '' }/>
            </div>
          </div>
        </div>
        <div className="basics-panel">
          <div className="basics-info">
            <h4>End Date</h4>
            <p>Set the end date for your campaign. You can't change the date after launch!</p>
          </div>
          <BasicsDate date={date} setDate={setDate} setNeedSave={setNeedSave} />
        </div>
      </form>    
    </div>
  )
};

export default withRouter(BuildFormBasics);
