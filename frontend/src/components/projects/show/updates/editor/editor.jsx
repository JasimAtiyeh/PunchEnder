import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import tboptions from './options';

// https://jpuri.github.io/react-draft-wysiwyg
// I was making a custom editor with slatejs, but there was a fatal error

class UpdateEditor extends React.Component {
  constructor(props) {
    super(props);
    const editorState = Boolean(props.body) ?
      EditorState.createWithContent(convertFromRaw(JSON.parse(props.body)))
      : EditorState.createEmpty() 
    this.state = { editorState };
    this.onChange = this.onChange.bind(this);
  }

  onChange(editorState) {
    this.setState({ editorState });
    const content = editorState.getCurrentContent();
    const contentString = JSON.stringify(convertToRaw(content));
    this.props.setBody(contentString);
  }

  render() {
    return (
      <Editor
        placeholder="Write your update here."
        editorState={this.state.editorState}
        toolbarClassName="update-toolbar"
        wrapperClassName="update-wrapper"
        editorClassName="update-editor"
        onEditorStateChange={this.onChange}
        toolbar={tboptions}
      />
    )
  }
};

export default UpdateEditor;