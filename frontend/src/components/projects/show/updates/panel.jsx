import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useMutation } from '@apollo/react-hooks';
import Mutations from "../../../../graphql/mutations";
import Queries from "../../../../graphql/queries";
const { DELETE_UPDATE } = Mutations;
const { FETCH_PROJECT_UPDATES } = Queries;

const UpdatePanel = props => {
  const { update, num, setEditing } = props;
  const { projectCreator } = update.project;
  const date = new Date(parseInt(update.date));
  const content = convertFromRaw(JSON.parse(update.body));
  const editorState = EditorState.createWithContent(content);

  const [deleteUpdate] = useMutation(DELETE_UPDATE,
    {
      update(cache, { data: { deleteUpdate } }) {
        const rootQuery = cache.readQuery({
          query: FETCH_PROJECT_UPDATES,
          variables: { project: update.project._id }
        });
        cache.writeQuery({
          query: FETCH_PROJECT_UPDATES,
          variables: { project: update.project._id },
          data: { projectUpdates: rootQuery.projectUpdates.filter(u => u._id !== deleteUpdate._id) },
        });
      }
  });

  let blur;
  let ed;
  useEffect(() => {
    blur = document.createElement('div');
    const blurStyle = "position:absolute;\
      top:100px;left:0;\
      height:120px;width:100%;\
      z-index:2;transition:top 0.6s;\
      background:-webkit-linear-gradient(transparent, white);\
      background:-o-linear-gradient(transparent, white);\
      background:-moz-linear-gradient(transparent, white);\
      background:linear-gradient(transparent, white);"
    blur.style.cssText = blurStyle;
    blur.textContent = "";
    const pane = document.getElementById(`update-panel-${num}`);
    ed = pane.getElementsByClassName("update-editor").item(0);
    ed.appendChild(blur);
  }, []);

  const shrink = () => {
    blur.style.top = "100px";
    ed.style.maxHeight = "220px";
  };

  const expand = () => {
    blur.style.top = "250px";
    ed.style.maxHeight = "370px"
  }

  return (
    <li
      onMouseEnter={() => expand()}
      onMouseLeave={() => shrink()}
      id={`update-panel-${num}`}
      className="update-panel">
      <Link to={`/projects/${update.project._id}/updates/${update._id}`} className="update-panel-link">
        <span className="update-no">Update #{num}</span>
        <h3>{update.title}</h3>
        <div className="update-info">
          <div className="update-creator-image" />
          <div className="update-info-text">
            <div>{projectCreator.name} <span>Creator</span></div>
            <span>{date.toLocaleDateString("en-us", {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}</span>
          </div>
        </div>
        <div className="update-content">
          <Editor
            editorState={editorState}
            wrapperClassName="update-wrapper"
            editorClassName="update-editor"
            readOnly={true}
            textAlignment={"left"}
            toolbarHidden
          />
        </div>
        <div className="update-panel-bottom">
          { projectCreator._id === localStorage.userId && 
            <div className="update-bottom-button-container">
              <button 
                className="update-edit-button"
                onClick={e => {
                  e.preventDefault();
                  setEditing(update)}}>
                <i className="far fa-edit" />
              </button>
              <button
                className="update-delete-button"
                onClick={e => {
                  e.preventDefault();
                  if (window.confirm('Are you sure you wish to delete this post?')) {
                    deleteUpdate({ variables: { _id: update._id } }) 
                  }}}
              ><i className="far fa-trash-alt" />
              </button>
            </div>
          }
          <div className="update-read-more"><p>Read more</p> <i className="fas fa-chevron-right" /></div>
        </div>
      </Link>
    </li>
  )
};

export default UpdatePanel;