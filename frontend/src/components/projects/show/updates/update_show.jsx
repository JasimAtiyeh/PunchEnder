import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import Queries from "../../../../graphql/queries";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const { FETCH_UPDATE } = Queries;

const UpdateShow = props => {
  const { loading, error, data } = useQuery(FETCH_UPDATE, { variables: { _id: props.match.params.updateId } });
  if (loading) { return <div>Loading...</div> };
  if (error) { return <div>Error!</div> };
  const { update } = data;
  const { project } = update;
  const { projectCreator } = project;
  const date = new Date(parseInt(update.date));

  const content = convertFromRaw(JSON.parse(update.body));
  const editorState = EditorState.createWithContent(content);
  return (
    <div className="update-show">
      <div className="update-back-container">
        <Link to={`/projects/${project._id}/updates/`}>
          <i className="fas fa-chevron-left" />
          <p>All Updates</p>
        </Link>
      </div>
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
      <div className="update-show-content">
        <Editor
          editorState={editorState}
          wrapperClassName="update-wrapper"
          editorClassName="update-editor"
          readOnly={true}
          textAlignment={"left"}
          toolbarHidden
        />
      </div>
    </div>
  )
};

export default withRouter(UpdateShow);