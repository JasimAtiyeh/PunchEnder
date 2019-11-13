import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from "react-router-dom";
import BasicsCategoryForm from "./basics_category";
import BasicsDate from "./basics_date";
import autosize from "autosize";
import Tabs from "../tabs";
import Nav from "./nav";
import Mutations from "../../../../graphql/mutations";
import { onSelectFile } from '../../../../util/image_util';
const { UPDATE_PROJECT_BASICS, UPLOAD_PROJECT_IMAGE } = Mutations;

const BuildFormBasics = props => {
  const { project } = props;
  const [needSave, setNeedSave] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [category, setCategory] = useState(project.category._id);
  const [goal, setGoal] = useState(project.goal);
  const [date, setDate] = useState(project.endDate);
  const [image, setImage] = useState(project.image);
  const [tempImage, setTempImage] = useState('');

  const [save, mdata] = useMutation(UPDATE_PROJECT_BASICS);
  const [uploadImage] = useMutation(UPLOAD_PROJECT_IMAGE);

  const variables = { name, description, category, goal: parseInt(goal), endDate: date, _id: project._id };

  let fileInput;
  let textarea; // for the ref
  useEffect(() => {
    // this is the same as componentDidMount
    autosize(textarea);
    return () => {
      // this is the same as componentWillUnmount
      autosize.destroy(textarea);
    };
  }, [textarea]); // empty-array would mean don't watch for any updates

  return (
    <div className="build-form-basics">
      <Nav
        mdata={mdata}
        save={save}
        variables={variables}
        setNeedSave={setNeedSave} 
        needSave={needSave} />
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
              value={name || ''} 
              onChange={e => { setName(e.target.value); setNeedSave(true) }} 
              placeholder="Enter your title here" />
          </div>
        </div>
        <div className="basics-panel">
          <div className="basics-info">
            <h4>Project Description</h4>
            <p>This is a short description that will be displayed alongside your project title.</p>
          </div>
          <div className="basics-form">
            <label>Description</label>
            <textarea
              ref={node => { textarea = node }}
              value={description || ''}
              maxLength={135}
              onChange={e => { setDescription(e.target.value); setNeedSave(true) }}
              placeholder="Project description here" />
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
            <p>Add an image that will represent your project on its page. The image will be cropped to a 16:9 ratio for usage, so upload an appropriate image.</p>
            <p>Pick an image that will appeal to backers. Remember that an image is an import part of your story.</p>
          </div>
          <div className="basics-form">
            <label>Image</label>
            <input 
              onChange={e => { 
                onSelectFile(e, setImage, uploadImage, project._id);
                //uploadImage({ variables: { _id: project._id, image } } ) 
              } } 
              id="image-file-input" 
              type="file" 
              accept="image/*"
              ref={node => { fileInput = node }}
            />
            { !image && 
              <div 
                className="add-image"
                onClick={ () => fileInput.click() }>
                <span>Click to add an image</span>
              </div>
            }
            { image &&
              <img className="change-image" src={image} onClick={ ()=> fileInput.click() } />
            }
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
