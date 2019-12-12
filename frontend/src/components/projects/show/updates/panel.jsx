import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useMutation } from '@apollo/react-hooks';
import Mutations from "../../../../graphql/mutations";
import Queries from "../../../../graphql/queries";
import { withApollo } from 'react-apollo';
const { DELETE_UPDATE } = Mutations;
const { FETCH_PROJECT_UPDATES } = Queries;

const UpdatePanel = props => {
  const { update, num, setEditing } = props;
  const { projectCreator } = update.project;
	const currentUser = props.client.cache.data.data.ROOT_QUERY.currentUser;
  const date = new Date(parseInt(update.date));
  const content = convertFromRaw(JSON.parse(update.body));
  const editorState = EditorState.createWithContent(content);
  const image = update.project.projectCreator.image ?
    update.project.projectCreator.image : "https://ksr-ugc.imgix.net/missing_user_avatar.png?ixlib=rb-2.1.0&w=80&h=80&fit=crop&v=&auto=format&frame=1&q=92&s=d89e3180fafd307918a94a3c9dd79c45";

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
    if (blur) {
      blur.style.cssText = blurStyle;
      blur.textContent = "";
      const pane = document.getElementById(`update-panel-${num}`);
      ed = pane.getElementsByClassName("update-editor").item(0);
      ed.appendChild(blur);
    }
  }, []);

  const shrink = () => {
    if (blur) blur.style.top = "100px";
    if (ed) ed.style.maxHeight = "220px";
  };

  const expand = () => {
    if (blur) blur.style.top = "250px";
    if (ed) ed.style.maxHeight = "370px"
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
          <img 
            src={image}
            className="update-creator-image" />
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
          { projectCreator._id === currentUser && 
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
          { projectCreator._id !== currentUser
            && <div />
          }
          <div className="update-read-more"><p>Read more</p> <i className="fas fa-chevron-right" /></div>
        </div>
      </Link>
    </li>
  )
};

export default withApollo(UpdatePanel);